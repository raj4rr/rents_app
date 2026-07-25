const express = require('express');
const PDFDocument = require('pdfkit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { Op } = require('sequelize');
const {
  User,
  OwnerBankAccount,
  TenantBankAccount,
  Property,
  Apartment,
  Room,
  Bed,
  Listing,
  Booking,
  Payment,
  KycVerification,
  Contract,
  MaintenanceTicket,
  Expense,
  Chore,
  CommunityMessage,
  DepositDeduction
} = require('../models');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const buildPublicUploadUrl = (req, filePath) => `${req.protocol}://${req.get('host')}/${filePath.replace(/\\/g, '/')}`;

const rateLimitMap = new Map();
const rateLimiter = (limit, windowMs) => {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }
    
    let timestamps = rateLimitMap.get(ip);
    timestamps = timestamps.filter(time => now - time < windowMs);
    
    if (timestamps.length >= limit) {
      return res.status(429).json({ error: 'Too many requests from this IP. Please try again later.' });
    }
    
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    next();
  };
};

const getPlatformFees = async () => {
  try {
    const { SystemSetting } = require('../models');
    const settings = await SystemSetting.findAll();
    const shortTermObj = settings.find(s => s.key === 'SHORT_TERM_FEE');
    const longTermObj = settings.find(s => s.key === 'LONG_TERM_FEE');
    return {
      shortTermFee: shortTermObj ? Number(shortTermObj.value) : 10,
      longTermFee: longTermObj ? Number(longTermObj.value) : 50
    };
  } catch (err) {
    return { shortTermFee: 10, longTermFee: 50 };
  }
};

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
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Only ADMIN can perform this action' });
  }
  next();
};
const DEFAULT_BANK_ACCOUNT = {
  accountHolder: 'Rajesh Kumar',
  iban: 'DE67501208000010752509',
  bic: 'BMPBDEF2',
  bankName: 'Unicredit NV/SA Germany Branch',
  currency: 'EUR'
};
const bankAccountFields = ['accountHolder', 'iban', 'bic'];
const normalizeBankAccountPayload = (body) => ({
  accountHolder: String(body.accountHolder || '').trim(),
  iban: String(body.iban || '').replace(/\s/g, '').toUpperCase(),
  bic: String(body.bic || '').replace(/\s/g, '').toUpperCase()
});
const validateBankAccountPayload = ({ accountHolder, iban, bic }) => {
  if (!accountHolder || !iban || !bic) return 'Account holder, IBAN, and BIC are required';
  if (!/^[A-Z]{2}[0-9A-Z]{13,32}$/.test(iban)) return 'Please enter a valid IBAN';
  if (!/^[A-Z0-9]{8}([A-Z0-9]{3})?$/.test(bic)) return 'Please enter a valid BIC';
  return null;
};

router.post('/auth/register', rateLimiter(15, 60000), async (req, res) => {
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

router.post('/auth/login', rateLimiter(20, 60000), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role, mobileNumber: user.mobileNumber } });
});

router.post('/auth/change-password', requireAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old password and new password are required' });
    }
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const ok = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Current password incorrect' });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ ok: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/auth/reset-password', rateLimiter(10, 60000), async (req, res) => {
  try {
    const { email, dob, fullName, nationality, newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    const where = {};
    if (email && email.trim() !== '') where.email = email.trim();
    if (dob && dob.trim() !== '') where.dob = dob.trim();
    if (fullName && fullName.trim() !== '') where.fullName = fullName.trim();
    if (nationality && nationality.trim() !== '') where.nationality = nationality.trim();

    const providedFieldsCount = Object.keys(where).length;
    if (providedFieldsCount < 2) {
      return res.status(400).json({
        error: 'Please fill in at least two verification fields (Email, Date of Birth, Full Name, or Nationality) to reset password'
      });
    }

    const user = await User.findOne({ where });
    if (!user) {
      return res.status(400).json({ error: 'Security verification failed. Provided details do not match any user' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ ok: true, message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/uploads/images', upload.array('images', 10), async (req, res) => {
  const urls = (req.files || []).map((f) => buildPublicUploadUrl(req, f.path));
  res.json({ urls });
});

router.get('/owner/bank-account', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const account = await OwnerBankAccount.findOne({ where: { userId: req.user.id } });
  const resolvedAccount = account || { ...DEFAULT_BANK_ACCOUNT, userId: req.user.id };
  res.json({ account: resolvedAccount, canEdit: !account || account.editCount < 1 });
});

router.put('/owner/bank-account', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const payload = normalizeBankAccountPayload(req.body);
  const validationError = validateBankAccountPayload(payload);
  if (validationError) return res.status(400).json({ error: validationError });

  const account = await OwnerBankAccount.findOne({ where: { userId: req.user.id } });
  if (!account) {
    const created = await OwnerBankAccount.create({ ...payload, userId: req.user.id });
    return res.json({ account: created, canEdit: true });
  }

  if (account.editCount >= 1) {
    return res.status(400).json({ error: 'Bank account can only be edited one time after it is added' });
  }

  bankAccountFields.forEach((field) => { account[field] = payload[field]; });
  account.editCount += 1;
  await account.save();
  res.json({ account, canEdit: false });
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
  const existingBedCount = await Bed.count({ where: { roomId: room.id } });
  if (existingBedCount >= Number(room.capacity)) {
    return res.status(400).json({ error: 'Selected room is at full capacity and cannot accept another bed' });
  }
  const created = await Bed.create({ ...req.body, createdByUserId: req.user.id });
  res.json(created);
});
router.get('/beds', async (_req, res) => res.json(await Bed.findAll()));

router.post('/listings', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  if (req.body.baseRent !== undefined) {
    const fees = await getPlatformFees();
    const fee = req.body.stayType === 'LONG_TERM' ? fees.longTermFee : fees.shortTermFee;
    req.body.baseRent = Number(req.body.baseRent) + fee;
  }
  const created = await Listing.create({ ...req.body, createdByUserId: req.user.id });
  
  if (req.body.bedSelection && created.roomId) {
    const { Room } = require('../models');
    const room = await Room.findByPk(created.roomId);
    if (room) {
      if (req.body.bedSelection === 'SINGLE') {
        room.singleBeds = 1;
        room.doubleBeds = 0;
      } else if (req.body.bedSelection === 'DOUBLE') {
        room.singleBeds = 0;
        room.doubleBeds = 1;
      }
      await room.save();
    }
  }

  res.json(created);
});

router.get('/listings', async (req, res) => {
  const listings = await Listing.findAll({
    where: { isActive: true },
    include: [
      { model: Room, include: [{ model: Apartment, include: [Property] }] },
      Bed,
      { model: User, attributes: ['id', 'fullName', 'mobileNumber', 'role'] }
    ]
  });
  res.json(listings);
});

router.get('/listings/:id', async (req, res) => {
  const listing = await Listing.findByPk(req.params.id, {
    include: [
      { model: Room, include: [{ model: Apartment, include: [Property] }] },
      Bed,
      { model: User, attributes: ['id', 'fullName', 'mobileNumber', 'role'] }
    ]
  });
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing);
});

router.get('/listings/:id/availability', async (req, res) => {
  const listing = await Listing.findByPk(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  const activeStatuses = ['PENDING', 'OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'];
  const today = new Date();
  const defaultFrom = today.toISOString().slice(0, 10);
  const defaultToDate = new Date(today);
  // Long-term listings need a much bigger availability window (up to 12 months + buffer)
  const defaultDays = listing.stayType === 'LONG_TERM' ? 400 : 90;
  defaultToDate.setDate(defaultToDate.getDate() + defaultDays);
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

const calculateDays = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return 0;
  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
};

const calculateMonths = (days) => Math.max(1, Math.ceil(days / 30));

const calculatePlatformFee = (days, stayType) => {
  if (stayType === 'LONG_TERM') return 100;
  return Math.max(10, 3 * days);
};

const calculateBookingQuote = (listing, days) => {
  const months = calculateMonths(days);
  const rentUnits = listing.stayType === 'LONG_TERM' ? months : days;
  const rentAmount = Number(listing.baseRent) * rentUnits;
  const platformFee = calculatePlatformFee(days, listing.stayType);
  const depositAmount = Number(listing.depositAmount || 0);
  const cleaningCharge = Number(listing.cleaningCharge || 0);
  const totalAmount = Number((rentAmount + platformFee + depositAmount + cleaningCharge).toFixed(2));

  return {
    days,
    months,
    rentAmount,
    platformFee,
    depositAmount,
    cleaningCharge,
    totalAmount,
    durationLabel: listing.stayType === 'LONG_TERM' ? `${months} month(s)` : `${days} night(s)`
  };
};

router.post('/bookings/quote', async (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;
  const listing = await Listing.findByPk(listingId);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  const days = calculateDays(checkIn, checkOut);
  if (days === 0) return res.status(400).json({ error: 'Invalid check-in/check-out range' });

  const months = calculateMonths(days);
  if (listing.stayType === 'LONG_TERM' && months < Number(listing.minStayMonths)) {
    return res.status(400).json({ error: `Long-term bookings require at least ${listing.minStayMonths} month(s)` });
  }

  res.json({ listingId, ...calculateBookingQuote(listing, days) });
});

router.post('/bookings/confirm', requireAuth, async (req, res) => {
  const { listingId, checkIn, checkOut, tenantComment } = req.body;
  
  if (!tenantComment || tenantComment.trim().length < 200) {
    return res.status(400).json({ error: 'Please add a comment explaining your requirements and motivation (minimum 200 characters) for the owner to review.' });
  }

  const listing = await Listing.findByPk(listingId, { include: [Room, Bed] });
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  const days = calculateDays(checkIn, checkOut);
  if (days === 0) return res.status(400).json({ error: 'Invalid check-in/check-out range' });

  const months = calculateMonths(days);
  if (listing.stayType === 'LONG_TERM' && months < Number(listing.minStayMonths)) {
    return res.status(400).json({ error: `Long-term bookings require at least ${listing.minStayMonths} month(s)` });
  }

  const { totalAmount } = calculateBookingQuote(listing, days);

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

  const booking = await Booking.create({
    listingId,
    checkIn,
    checkOut,
    totalAmount,
    status: 'PENDING',
    userId: req.user.id,
    tenantComment: tenantComment.trim()
  });
  res.json(booking);
});

router.get('/me/bookings', requireAuth, async (req, res) => {
  const rows = await Booking.findAll({
    where: { userId: req.user.id },
    include: [{
      model: Listing,
      include: [
        Room,
        Bed,
        {
          model: User,
          attributes: ['id', 'fullName', 'email', 'mobileNumber', 'role'],
          include: [{ model: OwnerBankAccount, attributes: ['accountHolder', 'iban', 'bic'] }]
        }
      ]
    },
    { model: Contract },
    { model: Payment }],
    order: [['createdAt', 'DESC']]
  });
  res.json(rows);
});

router.get('/me/bookings/:id', requireAuth, async (req, res) => {
  const booking = await Booking.findOne({
    where: { id: req.params.id },
    include: [{
      model: Listing,
      include: [
        Room,
        Bed,
        {
          model: User,
          attributes: [
            'id', 'fullName', 'mobileNumber', 'role',
            'fatherName', 'dob', 'nationality', 'residenceCountry',
            'streetAddress', 'zipCode', 'city', 'country',
            'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
            'profileStatus'
          ],
          include: [{ model: OwnerBankAccount, attributes: ['accountHolder', 'iban', 'bic'] }]
        }
      ]
    },
    {
      model: User,
      attributes: [
        'id', 'fullName', 'mobileNumber', 'role',
        'fatherName', 'dob', 'nationality', 'residenceCountry',
        'streetAddress', 'zipCode', 'city', 'country',
        'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
        'profileStatus'
      ],
      include: [{ model: TenantBankAccount }]
    },
    { model: Contract },
    { model: Payment },
    { model: DepositDeduction }]
  });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  const isTenant = booking.userId === req.user.id;
  const isOwner = booking.Listing && booking.Listing.createdByUserId === req.user.id;
  const isAdmin = req.user.role === 'ADMIN';

  if (!isTenant && !isOwner && !isAdmin) {
    return res.status(403).json({ error: 'Unauthorized to view this booking' });
  }

  res.json(booking);
});

router.patch('/me/bookings/:id', requireAuth, async (req, res) => {
  const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (!['PENDING', 'OWNER_APPROVED'].includes(booking.status)) {
    return res.status(400).json({ error: 'Booking cannot be edited after payment is initiated' });
  }

  // Check if any payment reference numbers have been submitted
  const submittedPayments = await Payment.findOne({
    where: {
      bookingId: booking.id,
      paymentReference: { [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: '' }] }
    }
  });
  if (submittedPayments) {
    return res.status(400).json({ error: 'Booking dates cannot be modified after submitting payment references.' });
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
  const newTotal = calculateBookingQuote(listing, nights).totalAmount;
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
    'depositAmount',
    'cleaningCharge',
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
        include: [Room, Bed, {
          model: User,
          attributes: [
            'id', 'fullName', 'mobileNumber', 'role',
            'fatherName', 'dob', 'nationality', 'residenceCountry',
            'streetAddress', 'zipCode', 'city', 'country',
            'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
            'profileStatus'
          ]
        }]
      },
      {
        model: User,
        attributes: [
          'id', 'fullName', 'mobileNumber', 'role',
          'fatherName', 'dob', 'nationality', 'residenceCountry',
          'streetAddress', 'zipCode', 'city', 'country',
          'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
          'profileStatus', 'financialDocPath'
        ],
        include: [{ model: TenantBankAccount }]
      },
      { model: Contract },
      { model: DepositDeduction }
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

  // Verify that tenant profile is 100% complete and documents are uploaded
  const tenant = await User.findByPk(booking.userId);
  const owner = await User.findByPk(booking.Listing.createdByUserId);

  const isProfileComplete = (u) => {
    if (!u) return false;
    if (u.profileStatus !== 'APPROVED') return false;
    const required = [
      'fullName', 'fatherName', 'dob', 'nationality', 'residenceCountry',
      'streetAddress', 'zipCode', 'city', 'country',
      'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath'
    ];
    return required.every(field => u[field] && u[field].trim() !== '');
  };

  if (!isProfileComplete(tenant)) {
    return res.status(400).json({ error: "Tenant profile is incomplete. All text fields and verification documents must be fully uploaded before confirming booking." });
  }

  if (!isProfileComplete(owner)) {
    return res.status(400).json({ error: "Owner profile is incomplete. All text fields and verification documents must be fully uploaded before confirming booking." });
  }

  booking.status = 'PAYMENT_RECEIVED';
  booking.paymentId = `PAY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  booking.paymentMarkedAt = new Date();
  await booking.save();
  // Mark related pending payments as completed
  const related = await Payment.findAll({ where: { bookingId: booking.id, status: 'PENDING' } });
  await Promise.all(related.map(async (p) => { p.status = 'COMPLETED'; p.payeeUserId = req.user.id; await p.save(); }));
  res.json({
    bookingId: booking.id,
    paymentId: booking.paymentId,
    status: booking.status,
    paymentMethod: 'BANK_TRANSFER',
    currency: 'EUR',
    bankAccount: DEFAULT_BANK_ACCOUNT
  });
});

router.patch('/owner/bookings/:bookingId/approve-payment/:paymentType', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId, { include: [Listing] });
  if (!booking || !booking.Listing) return res.status(404).json({ error: 'Booking not found' });
  if (req.user.role !== 'ADMIN' && booking.Listing.createdByUserId !== req.user.id) {
    return res.status(403).json({ error: 'Not allowed to update this booking' });
  }

  const payment = await Payment.findOne({
    where: { bookingId: booking.id, paymentType: req.params.paymentType, status: 'PENDING' }
  });
  if (!payment) return res.status(404).json({ error: 'Pending payment reference not found' });

  payment.status = 'COMPLETED';
  payment.payeeUserId = req.user.id;
  await payment.save();

  res.json({ payment });
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
  res.json({ ...booking.toJSON(), paymentMethod: 'BANK_TRANSFER', currency: 'EUR', bankAccount: DEFAULT_BANK_ACCOUNT });
});

// Profile endpoints
router.get('/me/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        'id', 'fullName', 'email', 'mobileNumber', 'role',
        'fatherName', 'dob', 'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
        'nationality', 'residenceCountry', 'streetAddress', 'zipCode', 'city', 'country',
        'profileStatus', 'profileRejectReason'
      ]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/me/profile', requireAuth, async (req, res) => {
  try {
    const { fullName, fatherName, dob, nationality, residenceCountry, streetAddress, zipCode, city, country } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (fullName) user.fullName = fullName;
    if (fatherName !== undefined) user.fatherName = fatherName;
    if (dob !== undefined) user.dob = dob;
    if (nationality !== undefined) user.nationality = nationality;
    if (residenceCountry !== undefined) user.residenceCountry = residenceCountry;
    if (streetAddress !== undefined) user.streetAddress = streetAddress;
    if (zipCode !== undefined) user.zipCode = zipCode;
    if (city !== undefined) user.city = city;
    if (country !== undefined) user.country = country;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/me/profile/upload', requireAuth, upload.fields([
  { name: 'photoWithPassport', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'residenceProof', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'financialDoc', maxCount: 1 }
]), async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (req.files) {
      if (req.files.photoWithPassport && req.files.photoWithPassport[0]) {
        user.photoWithPassport = `uploads/${req.files.photoWithPassport[0].filename}`;
      }
      if (req.files.passport && req.files.passport[0]) {
        user.passportPath = `uploads/${req.files.passport[0].filename}`;
      }
      if (req.files.residenceProof && req.files.residenceProof[0]) {
        user.residenceProofPath = `uploads/${req.files.residenceProof[0].filename}`;
      }
      if (req.files.signature && req.files.signature[0]) {
        user.signaturePath = `uploads/${req.files.signature[0].filename}`;
      }
      if (req.files.financialDoc && req.files.financialDoc[0]) {
        user.financialDocPath = `uploads/${req.files.financialDoc[0].filename}`;
      }
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin profile verification endpoints
router.get('/admin/profiles', requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id', 'fullName', 'email', 'mobileNumber', 'role',
        'fatherName', 'dob', 'nationality', 'residenceCountry',
        'streetAddress', 'zipCode', 'city', 'country',
        'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
        'profileStatus', 'profileRejectReason'
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/admin/profiles/:id/status', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status, rejectReason } = req.body;
    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid profile status' });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.profileStatus = status;
    user.profileRejectReason = status === 'REJECTED' ? (rejectReason || '') : null;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Tenant bank account endpoints
router.get('/me/bank-account', requireAuth, async (req, res) => {
  const account = await TenantBankAccount.findOne({ where: { userId: req.user.id } });
  const resolved = account || null;
  res.json({ account: resolved });
});

router.put('/me/bank-account', requireAuth, async (req, res) => {
  const payload = normalizeBankAccountPayload(req.body);
  const validationError = validateBankAccountPayload(payload);
  if (validationError) return res.status(400).json({ error: validationError });
  let account = await TenantBankAccount.findOne({ where: { userId: req.user.id } });
  if (!account) account = await TenantBankAccount.create({ ...payload, userId: req.user.id });
  else { account.accountHolder = payload.accountHolder; account.iban = payload.iban; account.bic = payload.bic; await account.save(); }
  res.json({ account });
});

// Provide platform bank account to tenant for platform fee payment
router.get('/bookings/:id/platform-account', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking || booking.userId !== req.user.id) return res.status(404).json({ error: 'Booking not found' });
  if (booking.status !== 'OWNER_APPROVED') return res.status(400).json({ error: 'Booking must be owner-approved first' });
  res.json({ paymentMethod: 'BANK_TRANSFER', currency: 'EUR', bankAccount: DEFAULT_BANK_ACCOUNT });
});

// Tenant submits platform fee payment reference (saved as PENDING)
router.post('/me/bookings/:id/pay-platform', requireAuth, async (req, res) => {
  const { paymentReference, tenantAccountId } = req.body;
  const booking = await Booking.findByPk(req.params.id, { include: [Listing] });
  if (!booking || booking.userId !== req.user.id) return res.status(404).json({ error: 'Booking not found' });
  if (booking.status !== 'OWNER_APPROVED') return res.status(400).json({ error: 'Booking must be owner-approved first' });
  const days = calculateDays(booking.checkIn, booking.checkOut);
  const quote = calculateBookingQuote(booking.Listing, days);
  const platformFee = quote.platformFee;
  const payment = await Payment.create({ bookingId: booking.id, payerUserId: req.user.id, amount: platformFee, paymentReference: String(paymentReference || ''), paymentType: 'PLATFORM_FEE', status: 'PENDING', tenantAccountId: tenantAccountId || null });
  res.json({ payment });
});

// Provide owner bank account details to tenant for rent payout
router.get('/bookings/:id/owner-account', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id, { include: [{ model: Listing, include: [{ model: User, include: [OwnerBankAccount] }] }] });
  if (!booking || booking.userId !== req.user.id) return res.status(404).json({ error: 'Booking not found' });
  const owner = booking.Listing?.User;
  if (!owner) return res.status(404).json({ error: 'Owner not found' });
  const account = owner.OwnerBankAccount || DEFAULT_BANK_ACCOUNT;
  res.json({ owner: { id: owner.id, fullName: owner.fullName }, bankAccount: account });
});

// Tenant submits rent payment reference (saved as PENDING)
router.post('/me/bookings/:id/pay-owner', requireAuth, async (req, res) => {
  const { paymentReference, tenantAccountId, ownerAccountId, amount } = req.body;
  const booking = await Booking.findByPk(req.params.id, { include: [Listing] });
  if (!booking || booking.userId !== req.user.id) return res.status(404).json({ error: 'Booking not found' });
  if (booking.status !== 'OWNER_APPROVED') return res.status(400).json({ error: 'Booking must be owner-approved first' });
  // default amount is booking total minus platform fee
  const days = calculateDays(booking.checkIn, booking.checkOut);
  const quote = calculateBookingQuote(booking.Listing, days);
  const platformFee = quote.platformFee;
  const defaultAmount = Math.max(0, Number(booking.totalAmount) - platformFee);
  const payment = await Payment.create({ bookingId: booking.id, payerUserId: req.user.id, payeeUserId: booking.Listing.createdByUserId || null, amount: amount || defaultAmount, paymentReference: String(paymentReference || ''), paymentType: 'RENT', status: 'PENDING', tenantAccountId: tenantAccountId || null, ownerAccountId: ownerAccountId || null });
  res.json({ payment });
});

// Tenant: list own payments
router.get('/me/payments', requireAuth, async (req, res) => {
  const rows = await Payment.findAll({
    where: { payerUserId: req.user.id },
    include: [
      { model: Booking, include: [{ model: Listing, include: [{ model: User, attributes: ['id', 'fullName'] }, Room, Bed] }] },
      { model: User, as: 'Payer', attributes: ['id', 'fullName', 'email'] },
      { model: User, as: 'Payee', attributes: ['id', 'fullName', 'email'] }
    ],
    order: [['createdAt', 'DESC']]
  });
  res.json(rows);
});

// Booking payments: tenant or owner can view payments for a booking
router.get('/bookings/:id/payments', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id, { include: [Listing] });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  const isTenant = booking.userId === req.user.id;
  const isOwner = req.user.role === 'ADMIN' || (booking.Listing && booking.Listing.createdByUserId === req.user.id);
  if (!isTenant && !isOwner) return res.status(403).json({ error: 'Not authorized to view payments for this booking' });

  const rows = await Payment.findAll({
    where: { bookingId: booking.id },
    include: [
      { model: User, as: 'Payer', attributes: ['id', 'fullName', 'email'] },
      { model: User, as: 'Payee', attributes: ['id', 'fullName', 'email'] }
    ],
    order: [['createdAt', 'DESC']]
  });
  res.json(rows);
});

// Enhanced contract generation: create contract record and write simple file for tenant download
router.post('/contracts/generate', requireAuth, async (req, res) => {
  const { bookingId, leaseType, startDate, endDate } = req.body;
  let tenant = null;
  let owner = null;
  let listing = null;
  let booking = null;
  if (bookingId) {
    booking = await Booking.findByPk(bookingId, {
      include: [
        {
          model: Listing,
          include: [
            User,
            { model: Room, include: [{ model: Apartment, include: [Property] }] }
          ]
        },
        { model: User }
      ]
    });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    tenant = booking.User;
    listing = booking.Listing;
    owner = listing?.User;
  }

  let created = null;
  if (bookingId) {
    created = await Contract.findOne({ where: { bookingId } });
  }

  if (created) {
    if (created.filePath && fs.existsSync(created.filePath)) {
      try { fs.unlinkSync(created.filePath); } catch (_) { }
    }
    created.leaseType = leaseType || created.leaseType;
    created.startDate = startDate || created.startDate;
    created.endDate = endDate || created.endDate;
    created.tenantName = tenant?.fullName || created.tenantName;
    created.tenantAddress = listing?.locationText || created.tenantAddress;
    created.ownerDetails = owner ? { id: owner.id, name: owner.fullName, mobileNumber: owner.mobileNumber } : created.ownerDetails;
    await created.save();
  } else {
    created = await Contract.create({
      bookingId: bookingId || null,
      leaseType: leaseType || 'SHORT_TERM',
      startDate: startDate || (new Date()).toISOString().slice(0, 10),
      endDate: endDate || (new Date()).toISOString().slice(0, 10),
      status: 'SENT',
      tenantId: tenant?.id || null,
      ownerId: owner?.id || null,
      tenantName: tenant?.fullName || null,
      tenantAddress: listing?.locationText || null,
      ownerDetails: owner ? { id: owner.id, name: owner.fullName, mobileNumber: owner.mobileNumber } : null
    });
  }

  // generate a professional PDF contract file using pdfkit
  try {
    const dir = 'uploads/contracts';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const tenantNameSlug = String(created.tenantName || 'tenant').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const fileName = `contract-${tenantNameSlug}-booking-${bookingId || 'none'}.pdf`;
    const filePath = `${dir}/${fileName}`;

    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Title / Header
    doc.fillColor('#0f172a')
      .fontSize(22)
      .text('RESIDENTIAL LEASE AGREEMENT', { align: 'center', bold: true });

    doc.fontSize(10)
      .text('(Wohnungsmietvertrag - RentStack Network)', { align: 'center', italic: true });

    doc.moveDown(1.5);

    // Section 1: Parties
    doc.fontSize(12).fillColor('#0f6df2').text('1. PARTIES TO THE AGREEMENT', { bold: true });
    doc.moveDown(0.4);
    doc.fontSize(10).fillColor('#334155');

    // Landlord
    doc.text('LANDLORD (Vermieter):', { bold: true });
    doc.text(`Name: ${owner?.fullName || 'RentStack Landlord Partner'}`);
    if (owner?.mobileNumber) doc.text(`Mobile: ${owner.mobileNumber}`);
    if (owner?.email) doc.text(`Email: ${owner.email}`);

    doc.moveDown(0.8);

    // Tenant
    doc.text('TENANT (Mieter):', { bold: true });
    doc.text(`Name: ${tenant?.fullName || 'RentStack Tenant Partner'}`);
    if (tenant?.email) doc.text(`Email: ${tenant.email}`);

    doc.moveDown(1.5);

    // Section 2: Leased Premises
    doc.fontSize(12).fillColor('#0f6df2').text('2. LEASED PREMISES (Mietobjekt)', { bold: true });
    doc.moveDown(0.4);
    doc.fontSize(10).fillColor('#334155');
    doc.text(`Property: ${listing?.Room?.Apartment?.Property?.name || 'N/A'}`);
    doc.text(`Address: ${listing?.Room?.Apartment?.Property?.address || listing?.locationText || created.tenantAddress || 'N/A'}`);
    doc.text(`Apartment Code: ${listing?.Room?.Apartment?.code || 'N/A'}`);
    doc.text(`Room Code: ${listing?.Room?.code || 'N/A'}`);
    doc.text(`Stay Type: ${created.leaseType === 'LONG_TERM' ? 'Long-Term Stay' : 'Short-Term Stay'}`);

    doc.moveDown(1.5);

    // Section 3: Rental Term & Costs
    doc.fontSize(12).fillColor('#0f6df2').text('3. RENTAL TERM & COSTS', { bold: true });
    doc.moveDown(0.4);
    doc.fontSize(10).fillColor('#334155');
    doc.text(`Lease Period: ${created.startDate} to ${created.endDate}`);

    const rentVal = listing?.baseRent ? `EUR ${listing.baseRent}` : 'N/A';
    const depositVal = listing?.depositAmount ? `EUR ${listing.depositAmount}` : 'EUR 0.00';
    const cleaningVal = listing?.cleaningCharge ? `EUR ${listing.cleaningCharge}` : 'EUR 0.00';

    doc.text(`Monthly/Nightly Base Rent: ${rentVal}`);
    doc.text(`Security Deposit: ${depositVal}`);
    doc.text(`One-time Cleaning Charge: ${cleaningVal}`);

    if (booking) {
      doc.text(`Total Stay Invoice Cost (including platform fee): EUR ${Number(booking.totalAmount).toFixed(2)}`, { bold: true });
    }

    doc.moveDown(1.5);

    // Section 4: Terms and Conditions
    doc.fontSize(12).fillColor('#0f6df2').text('4. GENERAL LEASE PROVISIONS', { bold: true });
    doc.moveDown(0.4);
    doc.fontSize(9).fillColor('#475569');

    const terms = [
      '1. Care of Property: The Tenant agrees to keep the premises, furnishings, and shared rooms in good repair and clean condition.',
      '2. Subletting: Subletting this room or apartment is strictly prohibited without the express written permission of the Landlord.',
      '3. Utilities: Shared charges like water, heating, electricity, and high-speed internet are included in the base warm rent.',
      '4. House Rules: Quiet hours must be observed from 22:00 to 07:00 daily. Violation may result in immediate termination.',
      '5. Validity: This contract becomes legally binding upon confirmation of the platform fee and rent deposit transfer.'
    ];

    terms.forEach(t => {
      doc.text(t);
      doc.moveDown(0.3);
    });

    doc.moveDown(2.5);

    // Signatures
    doc.fontSize(10).fillColor('#334155');

    const isConfirmed = booking && ['CONFIRMED', 'CHECKED_IN'].includes(booking.status);
    if (isConfirmed && owner?.signaturePath && fs.existsSync(owner.signaturePath)) {
      try { doc.image(owner.signaturePath, 50, 620, { width: 120, height: 50 }); } catch (_) { }
    }
    doc.text('__________________________________', 50, 680);
    doc.text('Landlord Signature (Vermieter)', 50, 695);

    if (tenant?.signaturePath && fs.existsSync(tenant.signaturePath)) {
      try { doc.image(tenant.signaturePath, 350, 620, { width: 120, height: 50 }); } catch (_) { }
    }
    doc.text('__________________________________', 350, 680);
    doc.text('Tenant Signature (Mieter)', 350, 695);

    doc.end();

    await new Promise((resolveResolve, rejectReject) => {
      writeStream.on('finish', resolveResolve);
      writeStream.on('error', rejectReject);
    });

    created.filePath = filePath;
    await created.save();
  } catch (e) {
    // console.log(e);
  }

  res.json(created);
});

router.get('/contracts/:id/download', requireAuth, async (req, res) => {
  const c = await Contract.findByPk(req.params.id);
  if (!c || !c.filePath) return res.status(404).json({ error: 'Contract file not found' });

  const booking = c.bookingId ? await Booking.findByPk(c.bookingId, { include: [Listing] }) : null;
  const isTenant = c.tenantId === req.user.id;
  const isOwner = c.ownerId === req.user.id || (booking && booking.Listing && booking.Listing.createdByUserId === req.user.id);
  const isAdmin = req.user.role === 'ADMIN';
  if (!isTenant && !isOwner && !isAdmin) {
    return res.status(403).json({ error: 'Not authorized to download this contract' });
  }

  res.download(c.filePath);
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
  ['code', 'capacity', 'maxPersons', 'singleBeds', 'doubleBeds', 'inventoryMode', 'furnishingStatus', 'hasPrivateBathroom', 'imageUrls'].forEach((f) => { if (Object.prototype.hasOwnProperty.call(req.body, f)) row[f] = req.body[f]; });
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

  if (req.body.baseRent !== undefined) {
    const stayType = req.body.stayType || row.stayType;
    const fees = await getPlatformFees();
    const fee = stayType === 'LONG_TERM' ? fees.longTermFee : fees.shortTermFee;
    req.body.baseRent = Number(req.body.baseRent) + fee;
  }

  [
    'title', 'listingType', 'imageUrl', 'imageUrls', 'locationText', 'latitude', 'longitude',
    'rentType', 'baseRent', 'depositAmount', 'cleaningCharge', 'anmeldungAvailable', 'internetIncluded', 'electricityIncluded',
    'maintenanceIncluded', 'heatingIncluded', 'waterIncluded', 'isActive'
  ].forEach((f) => { if (Object.prototype.hasOwnProperty.call(req.body, f)) row[f] = req.body[f]; });
  await row.save();

  if (req.body.bedSelection && row.roomId) {
    const { Room } = require('../models');
    const room = await Room.findByPk(row.roomId);
    if (room) {
      if (req.body.bedSelection === 'SINGLE') {
        room.singleBeds = 1;
        room.doubleBeds = 0;
      } else if (req.body.bedSelection === 'DOUBLE') {
        room.singleBeds = 0;
        room.doubleBeds = 1;
      }
      await room.save();
    }
  }

  res.json(row);
});

router.post('/owner/bookings/:id/deduct-deposit', requireAuth, requireOwnerOrAdmin, async (req, res) => {
  try {
    const { amount, reason, evidenceUrl } = req.body;
    const booking = await Booking.findByPk(req.params.id, {
      include: [Listing, DepositDeduction]
    });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const depositAmount = Number(booking.Listing?.depositAmount || 0);
    const newDeductAmount = Number(amount || 0);

    if (isNaN(newDeductAmount) || newDeductAmount <= 0) {
      return res.status(400).json({ error: 'Deduction amount must be a positive number greater than 0' });
    }

    const currentDeductionsSum = (booking.DepositDeductions || []).reduce(
      (sum, d) => sum + Number(d.amount),
      0
    );

    if (currentDeductionsSum + newDeductAmount > depositAmount) {
      return res.status(400).json({
        error: `Total deductions (€${(currentDeductionsSum + newDeductAmount).toFixed(2)}) cannot exceed the security deposit of €${depositAmount.toFixed(2)}`
      });
    }

    // Create a new deduction
    await DepositDeduction.create({
      bookingId: booking.id,
      amount: newDeductAmount,
      reason: reason || 'Damage / Penalty',
      evidenceUrl: evidenceUrl || null
    });

    // Re-fetch booking with full nested includes
    const updatedBooking = await Booking.findOne({
      where: { id: booking.id },
      include: [
        {
          model: Listing,
          include: [
            Room,
            Bed,
            {
              model: User,
              attributes: [
                'id', 'fullName', 'mobileNumber', 'role',
                'fatherName', 'dob', 'nationality', 'residenceCountry',
                'streetAddress', 'zipCode', 'city', 'country',
                'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
                'profileStatus'
              ],
              include: [{ model: OwnerBankAccount, attributes: ['accountHolder', 'iban', 'bic'] }]
            }
          ]
        },
        {
          model: User,
          attributes: [
            'id', 'fullName', 'mobileNumber', 'role',
            'fatherName', 'dob', 'nationality', 'residenceCountry',
            'streetAddress', 'zipCode', 'city', 'country',
            'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath',
            'profileStatus'
          ],
          include: [{ model: TenantBankAccount }]
        },
        { model: Contract },
        { model: Payment },
        { model: DepositDeduction }
      ]
    });

    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// System Settings API Endpoints
router.get('/settings', async (req, res) => {
  const fees = await getPlatformFees();
  res.json(fees);
});

router.get('/admin/settings', requireAuth, requireAdmin, async (req, res) => {
  const { SystemSetting } = require('../models');
  const settings = await SystemSetting.findAll();
  res.json(settings);
});

router.put('/admin/settings', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { settings } = req.body;
    if (!Array.isArray(settings)) {
      return res.status(400).json({ error: 'Settings array required' });
    }
    const { SystemSetting } = require('../models');
    for (const item of settings) {
      await SystemSetting.upsert({ key: item.key, value: String(item.value) });
    }
    res.json({ ok: true, message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contact Message API Endpoint
router.post('/contact', rateLimiter(15, 60000), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const { ContactMessage } = require('../models');
    const saved = await ContactMessage.create({
      name: name ? name.trim() : null,
      email: email.trim(),
      message: message.trim()
    });

    res.json({ ok: true, message: 'Message saved successfully', id: saved.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const parseCSV = (csvText) => {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] !== undefined ? values[idx] : '';
    });
    rows.push(row);
  }
  return rows;
};

router.post('/listings/import', requireAuth, requireOwnerOrAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'CSV file is required' });
    
    const fs = require('fs');
    const fileContent = fs.readFileSync(req.file.path, 'utf8');
    fs.unlinkSync(req.file.path);
    
    const rows = parseCSV(fileContent);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'CSV file is empty or missing headers' });
    }
    
    const { Room, Bed, SystemSetting } = require('../models');
    
    const settings = await SystemSetting.findAll();
    const shortTermObj = settings.find(s => s.key === 'SHORT_TERM_FEE');
    const longTermObj = settings.find(s => s.key === 'LONG_TERM_FEE');
    const fees = {
      shortTermFee: shortTermObj ? Number(shortTermObj.value) : 10,
      longTermFee: longTermObj ? Number(longTermObj.value) : 50
    };
    
    let successCount = 0;
    const errors = [];
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const lineNum = i + 2;
      
      try {
        if (!row.roomCode || row.roomCode.trim() === '') {
          errors.push(`Line ${lineNum}: Missing roomCode`);
          continue;
        }
        
        const room = await Room.findOne({
          where: { code: row.roomCode },
          include: [{ model: Apartment, where: { createdByUserId: req.user.id } }]
        });
        
        if (!room) {
          errors.push(`Line ${lineNum}: Room code '${row.roomCode}' not found or not owned by you`);
          continue;
        }
        
        let bedId = null;
        if (row.bedCode && row.bedCode.trim() !== '') {
          const bed = await Bed.findOne({
            where: { bedCode: row.bedCode, roomId: room.id }
          });
          if (!bed) {
            errors.push(`Line ${lineNum}: Bed code '${row.bedCode}' not found in Room '${row.roomCode}'`);
            continue;
          }
          bedId = bed.id;
        }
        
        const stayType = row.stayType === 'LONG_TERM' ? 'LONG_TERM' : 'SHORT_TERM';
        const inputRent = Number(row.baseRent);
        if (isNaN(inputRent) || inputRent <= 0) {
          errors.push(`Line ${lineNum}: Invalid baseRent '${row.baseRent}'`);
          continue;
        }
        
        const fee = stayType === 'LONG_TERM' ? fees.longTermFee : fees.shortTermFee;
        const totalRent = inputRent + fee;
        
        await Listing.create({
          roomId: room.id,
          bedId: bedId,
          title: row.title || `Listing for ${room.code}`,
          listingType: row.listingType || 'ENTIRE_ROOM',
          stayType: stayType,
          minStayMonths: Number(row.minStayMonths) || 1,
          imageUrl: row.imageUrl || 'http://localhost:5000/uploads/default-room.png',
          imageUrls: row.imageUrls ? row.imageUrls.split(';') : [],
          locationText: row.locationText || 'Berlin',
          latitude: Number(row.latitude) || 52.5200,
          longitude: Number(row.longitude) || 13.4050,
          rentType: row.rentType === 'COLD' ? 'COLD' : 'WARM',
          baseRent: totalRent,
          depositAmount: Number(row.depositAmount) || 0,
          cleaningCharge: Number(row.cleaningCharge) || 0,
          anmeldungAvailable: row.anmeldungAvailable === 'true',
          internetIncluded: row.internetIncluded === 'true',
          electricityIncluded: row.electricityIncluded === 'true',
          maintenanceIncluded: row.maintenanceIncluded === 'true',
          heatingIncluded: row.heatingIncluded === 'true',
          waterIncluded: row.waterIncluded === 'true',
          createdByUserId: req.user.id,
          isActive: true
        });
        
        successCount++;
      } catch (rowErr) {
        errors.push(`Line ${lineNum}: Internal error - ${rowErr.message}`);
      }
    }
    
    res.json({ ok: true, successCount, errors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload Wohnungsgeberbestätigung for Confirmed Long-Term Bookings
router.put('/bookings/:id/wohnungsgeber', requireAuth, requireOwnerOrAdmin, upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: 'Wohnungsgeberbestätigung file is required' });
    }

    const booking = await Booking.findByPk(id, {
      include: [{ model: Listing }]
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (req.user.role !== 'ADMIN' && booking.Listing?.createdByUserId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied: you do not own this listing' });
    }

    if (booking.Listing?.stayType !== 'LONG_TERM') {
      return res.status(400).json({ error: 'Wohnungsgeberbestätigung can only be uploaded for long-term stays' });
    }

    if (booking.status !== 'CONFIRMED' && booking.status !== 'CHECKED_IN' && booking.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Wohnungsgeberbestätigung can only be uploaded after booking confirmation' });
    }

    booking.wohnungsgeberPath = `uploads/${req.file.filename}`;
    await booking.save();

    res.json({ ok: true, message: 'Wohnungsgeberbestätigung uploaded successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
