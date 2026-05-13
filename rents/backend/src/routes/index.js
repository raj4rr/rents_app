const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { Op } = require('sequelize');
const {
  User,
  Property,
  Apartment,
  Room,
  Bed,
  Listing,
  Booking,
  KycVerification,
  Contract,
  MaintenanceTicket,
  Expense,
  Chore,
  CommunityMessage
} = require('../models');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const buildPublicUploadUrl = (req, filePath) => `${req.protocol}://${req.get('host')}/${filePath.replace(/\\/g, '/')}`;
const getAuthUser = (req) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};
const requireAuth = (req, res, next) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
};
const requireOwnerOrAdmin = (req, res, next) => {
  if (!req.user || !['OWNER', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Only OWNER or ADMIN can perform this action' });
  }
  next();
};

router.post('/auth/register', async (req, res) => {
  try {
    const { fullName, email, mobileNumber, password, role } = req.body;
    if (role === 'ADMIN') {
      return res.status(400).json({ error: 'Admin role cannot be registered from public signup' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, mobileNumber, passwordHash, role });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role, mobileNumber: user.mobileNumber } });
});

router.post('/uploads/images', upload.array('images', 10), async (req, res) => {
  const urls = (req.files || []).map((f) => buildPublicUploadUrl(req, f.path));
  res.json({ urls });
});

router.post('/properties', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const created = await Property.create({ ...req.body, createdByUserId: req.user.id });
  res.json(created);
});
router.get('/properties', async (_req, res) => res.json(await Property.findAll()));

router.post('/apartments', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const property = await Property.findByPk(req.body.propertyId);
  if (!property) return res.status(404).json({ error: 'Property not found' });
  if (req.user.role !== 'ADMIN' && property.createdByUserId !== req.user.id) {
    return res.status(403).json({ error: 'Owners can only create apartments under their own properties' });
  }
  const created = await Apartment.create({ ...req.body, createdByUserId: req.user.id });
  res.json(created);
});
router.get('/apartments', async (_req, res) => res.json(await Apartment.findAll()));

router.post('/rooms', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const apartment = await Apartment.findByPk(req.body.apartmentId);
  if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
  if (req.user.role !== 'ADMIN' && apartment.createdByUserId !== req.user.id) {
    return res.status(403).json({ error: 'Owners can only create rooms under their own apartments' });
  }
  const created = await Room.create({ ...req.body, createdByUserId: req.user.id });
  res.json(created);
});
router.get('/rooms', async (_req, res) => res.json(await Room.findAll()));

router.patch('/rooms/:id/inventory-mode', async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ error: 'Room not found' });
  room.inventoryMode = req.body.inventoryMode;
  await room.save();
  res.json(room);
});

router.post('/beds', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const room = await Room.findByPk(req.body.roomId);
  if (!room) return res.status(404).json({ error: 'Room not found' });
  if (req.user.role !== 'ADMIN' && room.createdByUserId !== req.user.id) {
    return res.status(403).json({ error: 'Owners can only create beds under their own rooms' });
  }
  const created = await Bed.create({ ...req.body, createdByUserId: req.user.id });
  res.json(created);
});
router.get('/beds', async (_req, res) => res.json(await Bed.findAll()));

router.post('/listings', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const created = await Listing.create({ ...req.body, createdByUserId: req.user.id });
  res.json(created);
});

router.get('/listings', async (req, res) => {
  const listings = await Listing.findAll({
    where: { isActive: true },
    include: [
      { model: Room, include: [Apartment] },
      Bed,
      { model: User, attributes: ['id', 'fullName', 'mobileNumber', 'role'] }
    ]
  });
  res.json(listings);
});

router.get('/listings/:id/availability', async (req, res) => {
  const listing = await Listing.findByPk(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  const activeStatuses = ['PENDING', 'OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'];
  const today = new Date();
  const defaultFrom = today.toISOString().slice(0, 10);
  const defaultToDate = new Date(today);
  defaultToDate.setDate(defaultToDate.getDate() + 60);
  const defaultTo = defaultToDate.toISOString().slice(0, 10);

  const from = req.query.from || defaultFrom;
  const to = req.query.to || defaultTo;
  if (from >= to) return res.status(400).json({ error: 'Invalid date range' });

  const overlapCondition = {
    [Op.and]: [
      { checkIn: { [Op.lt]: to } },
      { checkOut: { [Op.gt]: from } },
      { status: { [Op.in]: activeStatuses } }
    ]
  };

  let conflictWhere = null;
  if (listing.listingType === 'ENTIRE_ROOM') {
    conflictWhere = {
      roomId: listing.roomId,
      listingType: { [Op.in]: ['ENTIRE_ROOM', 'SINGLE_BED', 'PRIVATE_ROOM_IN_SHARED_APT'] }
    };
  } else {
    if (listing.listingType === 'SINGLE_BED') {
      conflictWhere = {
        [Op.or]: [
          { roomId: listing.roomId, listingType: 'ENTIRE_ROOM' },
          { bedId: listing.bedId || null, listingType: 'SINGLE_BED' }
        ]
      };
    } else {
      conflictWhere = {
        roomId: listing.roomId,
        listingType: { [Op.in]: ['ENTIRE_ROOM', 'PRIVATE_ROOM_IN_SHARED_APT'] }
      };
    }
  }

  const conflictingBookings = await Booking.findAll({
    where: overlapCondition,
    include: [{ model: Listing, where: conflictWhere }]
  });

  const bookedDates = new Set();
  conflictingBookings.forEach((b) => {
    const start = new Date(b.checkIn);
    const end = new Date(b.checkOut);
    const cursor = new Date(start);
    while (cursor < end) {
      const d = cursor.toISOString().slice(0, 10);
      if (d >= from && d < to) bookedDates.add(d);
      cursor.setDate(cursor.getDate() + 1);
    }
  });

  const days = [];
  const cursor = new Date(from);
  const rangeEnd = new Date(to);
  while (cursor < rangeEnd) {
    const dateStr = cursor.toISOString().slice(0, 10);
    days.push({ date: dateStr, available: !bookedDates.has(dateStr) });
    cursor.setDate(cursor.getDate() + 1);
  }

  res.json({ listingId: listing.id, from, to, days });
});

router.post('/bookings/quote', async (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;
  const listing = await Listing.findByPk(listingId);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  const nights = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
  const totalAmount = Number(listing.baseRent) * nights;
  res.json({ listingId, nights, totalAmount });
});

router.post('/bookings/confirm', requireAuth, async (req, res) => {
  const { listingId, checkIn, checkOut, totalAmount } = req.body;
  const listing = await Listing.findByPk(listingId, { include: [Room, Bed] });
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  const overlapCondition = {
    [Op.and]: [
      { checkIn: { [Op.lt]: checkOut } },
      { checkOut: { [Op.gt]: checkIn } },
      { status: { [Op.in]: ['PENDING', 'OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'] } }
    ]
  };

  if (listing.listingType === 'ENTIRE_ROOM') {
    const conflicting = await Booking.findOne({
      include: [{
        model: Listing,
        where: {
          roomId: listing.roomId,
          listingType: { [Op.in]: ['ENTIRE_ROOM', 'SINGLE_BED', 'PRIVATE_ROOM_IN_SHARED_APT'] }
        }
      }],
      where: overlapCondition
    });
    if (conflicting) return res.status(409).json({ error: 'Room inventory unavailable for these dates' });
  } else {
    const entireRoomConflict = await Booking.findOne({
      include: [{ model: Listing, where: { roomId: listing.roomId, listingType: 'ENTIRE_ROOM' } }],
      where: overlapCondition
    });
    if (entireRoomConflict) return res.status(409).json({ error: 'Entire room already reserved for dates' });

    const bedConflict = await Booking.findOne({
      include: [{ model: Listing, where: { bedId: listing.bedId || null, listingType: 'SINGLE_BED' } }],
      where: overlapCondition
    });
    if (bedConflict && listing.listingType === 'SINGLE_BED') {
      return res.status(409).json({ error: 'This specific bed is already reserved' });
    }
  }

  const booking = await Booking.create({ listingId, checkIn, checkOut, totalAmount, status: 'PENDING', userId: req.user.id });
  res.json(booking);
});

router.get('/me/bookings', requireAuth, async (req, res) => {
  const rows = await Booking.findAll({
    where: { userId: req.user.id },
    include: [{ model: Listing, include: [Room, Bed, { model: User, attributes: ['id', 'fullName', 'mobileNumber', 'role'] }] }],
    order: [['createdAt', 'DESC']]
  });
  res.json(rows);
});

router.patch('/me/bookings/:id', requireAuth, async (req, res) => {
  const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (!['PENDING', 'OWNER_APPROVED'].includes(booking.status)) {
    return res.status(400).json({ error: 'Booking cannot be edited after payment is initiated' });
  }

  const now = new Date();
  const checkInDate = new Date(booking.checkIn);
  const diffMs = checkInDate.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  if (diffDays < 2) {
    return res.status(400).json({ error: 'Booking cannot be edited within 2 days of check-in' });
  }

  const nextCheckIn = req.body.checkIn || booking.checkIn;
  const nextCheckOut = req.body.checkOut || booking.checkOut;
  if (nextCheckIn >= nextCheckOut) {
    return res.status(400).json({ error: 'Check-out must be after check-in' });
  }

  const overlapCondition = {
    [Op.and]: [
      { id: { [Op.ne]: booking.id } },
      { checkIn: { [Op.lt]: nextCheckOut } },
      { checkOut: { [Op.gt]: nextCheckIn } },
      { status: { [Op.in]: ['PENDING', 'OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'] } }
    ]
  };

  const listing = await Listing.findByPk(booking.listingId);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  if (listing.listingType === 'ENTIRE_ROOM') {
    const conflicting = await Booking.findOne({
      include: [{ model: Listing, where: { roomId: listing.roomId } }],
      where: overlapCondition
    });
    if (conflicting) return res.status(409).json({ error: 'Room inventory unavailable for these dates' });
  } else {
    const conflicting = await Booking.findOne({
      include: [{ model: Listing, where: { bedId: listing.bedId || null, roomId: listing.roomId } }],
      where: overlapCondition
    });
    if (conflicting) return res.status(409).json({ error: 'Inventory unavailable for these dates' });
  }

  booking.checkIn = nextCheckIn;
  booking.checkOut = nextCheckOut;
  const nights = Math.max(1, Math.ceil((new Date(nextCheckOut) - new Date(nextCheckIn)) / (1000 * 60 * 60 * 24)));
  const oldTotal = Number(booking.totalAmount);
  const newTotal = Number(listing.baseRent) * nights;
  booking.totalAmount = newTotal;

  let requiresReapproval = false;
  if (booking.status === 'OWNER_APPROVED') {
    booking.status = 'PENDING';
    booking.paymentId = null;
    booking.paymentMarkedAt = null;
    requiresReapproval = true;
  }

  await booking.save();
  res.json({
    ...booking.toJSON(),
    oldTotalAmount: oldTotal,
    newTotalAmount: newTotal,
    additionalPaymentAmount: Math.max(0, newTotal - oldTotal),
    requiresReapproval
  });
});

router.get('/me/entries', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const rows = await Listing.findAll({
    where: { createdByUserId: req.user.id },
    include: [Room, Bed],
    order: [['createdAt', 'DESC']]
  });
  res.json(rows);
});

router.patch('/me/entries/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const listing = await Listing.findOne({ where: { id: req.params.id, createdByUserId: req.user.id } });
  if (!listing) return res.status(404).json({ error: 'Entry not found' });

  const editable = [
    'title',
    'baseRent',
    'rentType',
    'locationText',
    'latitude',
    'longitude',
    'imageUrl',
    'imageUrls',
    'anmeldungAvailable',
    'internetIncluded',
    'electricityIncluded',
    'maintenanceIncluded',
    'heatingIncluded',
    'waterIncluded',
    'isActive'
  ];

  editable.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      listing[field] = req.body[field];
    }
  });
  await listing.save();
  res.json(listing);
});

router.get('/owner/bookings', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const listingWhere = req.user.role === 'ADMIN' ? {} : { createdByUserId: req.user.id };
  const rows = await Booking.findAll({
    include: [
      {
        model: Listing,
        where: listingWhere,
        include: [Room, Bed, { model: User, attributes: ['id', 'fullName', 'mobileNumber', 'role'] }]
      },
      { model: User, attributes: ['id', 'fullName', 'mobileNumber', 'role'] }
    ],
    order: [['createdAt', 'DESC']]
  });
  res.json(rows);
});

router.patch('/owner/bookings/:id/approve', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id, { include: [{ model: Listing }] });
  if (!booking || !booking.Listing) return res.status(404).json({ error: 'Booking not found' });
  if (req.user.role !== 'ADMIN' && booking.Listing.createdByUserId !== req.user.id) {
    return res.status(403).json({ error: 'Not allowed to approve this booking' });
  }

  if (booking.status !== 'PENDING') {
    return res.status(400).json({ error: 'Only pending bookings can be approved' });
  }

  // Re-check inventory conflicts right before approval to avoid approving overlaps.
  const overlapCondition = {
    [Op.and]: [
      { id: { [Op.ne]: booking.id } },
      { checkIn: { [Op.lt]: booking.checkOut } },
      { checkOut: { [Op.gt]: booking.checkIn } },
      { status: { [Op.in]: ['OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'] } }
    ]
  };

  let conflicting = null;
  if (booking.Listing.listingType === 'ENTIRE_ROOM') {
    conflicting = await Booking.findOne({
      include: [{
        model: Listing,
        where: {
          roomId: booking.Listing.roomId,
          listingType: { [Op.in]: ['ENTIRE_ROOM', 'SINGLE_BED', 'PRIVATE_ROOM_IN_SHARED_APT'] }
        }
      }],
      where: overlapCondition
    });
  } else {
    const entireRoomConflict = await Booking.findOne({
      include: [{ model: Listing, where: { roomId: booking.Listing.roomId, listingType: 'ENTIRE_ROOM' } }],
      where: overlapCondition
    });

    if (entireRoomConflict) {
      conflicting = entireRoomConflict;
    } else if (booking.Listing.listingType === 'SINGLE_BED') {
      conflicting = await Booking.findOne({
        include: [{ model: Listing, where: { bedId: booking.Listing.bedId || null, listingType: 'SINGLE_BED' } }],
        where: overlapCondition
      });
    } else {
      conflicting = await Booking.findOne({
        include: [{ model: Listing, where: { roomId: booking.Listing.roomId, listingType: 'PRIVATE_ROOM_IN_SHARED_APT' } }],
        where: overlapCondition
      });
    }
  }

  if (conflicting) {
    return res.status(409).json({ error: 'Cannot approve: selected dates are no longer available' });
  }

  booking.status = 'OWNER_APPROVED';
  await booking.save();
  res.json(booking);
});

router.patch('/owner/bookings/:id/payment-received', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id, { include: [{ model: Listing }] });
  if (!booking || !booking.Listing) return res.status(404).json({ error: 'Booking not found' });
  if (req.user.role !== 'ADMIN' && booking.Listing.createdByUserId !== req.user.id) {
    return res.status(403).json({ error: 'Not allowed to update this booking' });
  }
  if (booking.status !== 'OWNER_APPROVED') {
    return res.status(400).json({ error: 'Booking must be owner-approved first' });
  }

  booking.status = 'PAYMENT_RECEIVED';
  booking.paymentId = `PAY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  booking.paymentMarkedAt = new Date();
  await booking.save();
  res.json({ bookingId: booking.id, paymentId: booking.paymentId, status: booking.status });
});

router.patch('/me/bookings/:id/confirm-payment', requireAuth, async (req, res) => {
  const { paymentId } = req.body;
  const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (booking.status !== 'PAYMENT_RECEIVED') {
    return res.status(400).json({ error: 'Owner has not marked payment as received yet' });
  }
  if (!paymentId || paymentId !== booking.paymentId) {
    return res.status(400).json({ error: 'Payment ID mismatch' });
  }
  booking.status = 'CONFIRMED';
  await booking.save();
  res.json(booking);
});

router.get('/admin/occupancy-map', async (_req, res) => {
  const beds = await Bed.findAll({
    include: [{
      model: Room,
      include: [{ model: Apartment, include: [Property] }]
    }]
  });

  const activeBookings = await Booking.findAll({
    where: { status: { [Op.in]: ['PENDING', 'CONFIRMED', 'CHECKED_IN'] } },
    include: [Listing]
  });

  const today = new Date().toISOString().slice(0, 10);
  const occupiedBedIds = new Set(
    activeBookings
      .filter((b) => b.checkIn <= today && b.checkOut > today)
      .map((b) => b.Listing?.bedId)
      .filter(Boolean)
  );

  const rows = beds.map((bed) => ({
    property: bed.Room.Apartment.Property.name,
    apartment: bed.Room.Apartment.code,
    room: bed.Room.code,
    bed: bed.bedCode,
    occupied: occupiedBedIds.has(bed.id)
  }));

  res.json(rows);
});

router.post('/kyc/upload', upload.single('document'), async (req, res) => {
  const { userType, documentType } = req.body;
  const created = await KycVerification.create({
    userType,
    documentType,
    documentPath: req.file?.path || '',
    status: 'PENDING'
  });
  res.json(created);
});

router.post('/contracts/generate', async (req, res) => {
  const created = await Contract.create(req.body);
  res.json(created);
});

router.post('/maintenance/tickets', upload.single('photo'), async (req, res) => {
  const { title, description } = req.body;
  const created = await MaintenanceTicket.create({
    title,
    description,
    photoPath: req.file?.path || null
  });
  res.json(created);
});

router.post('/expenses', async (req, res) => res.json(await Expense.create(req.body)));
router.get('/expenses', async (_req, res) => res.json(await Expense.findAll()));

router.post('/chores', async (req, res) => res.json(await Chore.create(req.body)));
router.get('/chores', async (_req, res) => res.json(await Chore.findAll()));

router.post('/community/messages', async (req, res) => res.json(await CommunityMessage.create(req.body)));
router.get('/community/messages', async (_req, res) => res.json(await CommunityMessage.findAll({ order: [['createdAt', 'DESC']] })));

const ownerScope = (user) => (user.role === 'ADMIN' ? {} : { createdByUserId: user.id });

router.get('/manage/properties', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  res.json(await Property.findAll({ where: ownerScope(req.user), order: [['id', 'DESC']] }));
});
router.get('/manage/apartments', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  res.json(await Apartment.findAll({ where: ownerScope(req.user), include: [Property], order: [['id', 'DESC']] }));
});
router.get('/manage/rooms', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  res.json(await Room.findAll({ where: ownerScope(req.user), include: [Apartment], order: [['id', 'DESC']] }));
});
router.get('/manage/beds', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  res.json(await Bed.findAll({ where: ownerScope(req.user), include: [Room], order: [['id', 'DESC']] }));
});
router.get('/manage/listings', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  res.json(await Listing.findAll({ where: ownerScope(req.user), include: [Room, Bed], order: [['id', 'DESC']] }));
});

const findScopedRecord = async (Model, id, user) => {
  const where = user.role === 'ADMIN' ? { id } : { id, createdByUserId: user.id };
  return Model.findOne({ where });
};

router.get('/manage/properties/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Property, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Property not found' });
  res.json(row);
});
router.get('/manage/apartments/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Apartment, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Apartment not found' });
  res.json(row);
});
router.get('/manage/rooms/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Room, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Room not found' });
  res.json(row);
});
router.get('/manage/beds/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Bed, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Bed not found' });
  res.json(row);
});
router.get('/manage/listings/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Listing, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Listing not found' });
  res.json(row);
});

router.patch('/manage/properties/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Property, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Property not found' });
  ['name', 'city', 'address'].forEach((f) => { if (Object.prototype.hasOwnProperty.call(req.body, f)) row[f] = req.body[f]; });
  await row.save();
  res.json(row);
});
router.patch('/manage/apartments/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Apartment, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Apartment not found' });
  ['code', 'amenities', 'imageUrls'].forEach((f) => { if (Object.prototype.hasOwnProperty.call(req.body, f)) row[f] = req.body[f]; });
  await row.save();
  res.json(row);
});
router.patch('/manage/rooms/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Room, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Room not found' });
  ['code', 'capacity', 'inventoryMode', 'furnishingStatus', 'hasPrivateBathroom', 'imageUrls'].forEach((f) => { if (Object.prototype.hasOwnProperty.call(req.body, f)) row[f] = req.body[f]; });
  await row.save();
  res.json(row);
});
router.patch('/manage/beds/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Bed, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Bed not found' });
  ['bedCode', 'status', 'imageUrl'].forEach((f) => { if (Object.prototype.hasOwnProperty.call(req.body, f)) row[f] = req.body[f]; });
  await row.save();
  res.json(row);
});
router.patch('/manage/listings/:id', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const row = await findScopedRecord(Listing, req.params.id, req.user);
  if (!row) return res.status(404).json({ error: 'Listing not found' });
  [
    'title', 'listingType', 'imageUrl', 'imageUrls', 'locationText', 'latitude', 'longitude',
    'rentType', 'baseRent', 'anmeldungAvailable', 'internetIncluded', 'electricityIncluded',
    'maintenanceIncluded', 'heatingIncluded', 'waterIncluded', 'isActive'
  ].forEach((f) => { if (Object.prototype.hasOwnProperty.call(req.body, f)) row[f] = req.body[f]; });
  await row.save();
  res.json(row);
});

module.exports = router;
