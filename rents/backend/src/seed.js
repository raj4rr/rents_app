require('dotenv').config();
const bcrypt = require('bcryptjs');
const {
  sequelize,
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
} = require('./models');

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await Booking.destroy({ where: {}, force: true });
    await Listing.destroy({ where: {}, force: true });
    await Bed.destroy({ where: {}, force: true });
    await Room.destroy({ where: {}, force: true });
    await Apartment.destroy({ where: {}, force: true });
    await Property.destroy({ where: {}, force: true });

    await KycVerification.destroy({ where: {}, force: true });
    await Contract.destroy({ where: {}, force: true });
    await MaintenanceTicket.destroy({ where: {}, force: true });
    await Expense.destroy({ where: {}, force: true });
    await Chore.destroy({ where: {}, force: true });
    await CommunityMessage.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });

    const passwordHash = await bcrypt.hash('Pass@123', 10);
    const users = await User.bulkCreate([
      { fullName: 'Admin One', email: 'admin@rentstack.dev', mobileNumber: '+49-170-0000001', passwordHash, role: 'ADMIN' },
      { fullName: 'Owner One', email: 'owner@rentstack.dev', mobileNumber: '+49-170-0000002', passwordHash, role: 'OWNER' },
      { fullName: 'Tenant One', email: 'tenant@rentstack.dev', mobileNumber: '+49-170-0000003', passwordHash, role: 'TENANT' }
    ], { returning: true });
    const adminUser = users.find((u) => u.role === 'ADMIN');
    const ownerUser = users.find((u) => u.role === 'OWNER');
    const tenantUser = users.find((u) => u.role === 'TENANT');

    const property1 = await Property.create({
      name: 'Maple Residences',
      city: 'Berlin',
      address: 'Friedrichstrasse 88, Berlin',
      createdByUserId: ownerUser?.id
    });

    const property2 = await Property.create({
      name: 'Riverstone Co-Living',
      city: 'Munich',
      address: 'Leopoldstrasse 120, Munich',
      createdByUserId: adminUser?.id
    });

    const apt1 = await Apartment.create({
      propertyId: property1.id,
      code: 'A-101',
      amenities: ['Common Kitchen', 'Shared Washroom', 'Laundry'],
      createdByUserId: ownerUser?.id
    });

    const apt2 = await Apartment.create({
      propertyId: property1.id,
      code: 'A-102',
      amenities: ['Common Kitchen', 'Private Bathrooms'],
      createdByUserId: ownerUser?.id
    });

    const apt3 = await Apartment.create({
      propertyId: property2.id,
      code: 'B-201',
      amenities: ['Common Kitchen', 'Gym', 'Bike Storage'],
      createdByUserId: adminUser?.id
    });

    const room1 = await Room.create({ apartmentId: apt1.id, code: 'R1', capacity: 3, inventoryMode: 'SHARED_ONLY', furnishingStatus: 'FURNISHED', hasPrivateBathroom: false, createdByUserId: ownerUser?.id });
    const room2 = await Room.create({ apartmentId: apt1.id, code: 'R2', capacity: 2, inventoryMode: 'HYBRID', furnishingStatus: 'SEMI_FURNISHED', hasPrivateBathroom: true, createdByUserId: ownerUser?.id });
    const room3 = await Room.create({ apartmentId: apt2.id, code: 'R3', capacity: 1, inventoryMode: 'PRIVATE_ONLY', furnishingStatus: 'FURNISHED', hasPrivateBathroom: true, createdByUserId: ownerUser?.id });
    const room4 = await Room.create({ apartmentId: apt3.id, code: 'R4', capacity: 3, inventoryMode: 'HYBRID', furnishingStatus: 'UNFURNISHED', hasPrivateBathroom: false, createdByUserId: adminUser?.id });

    const [r1b1, r1b2, r1b3] = await Bed.bulkCreate([
      { roomId: room1.id, bedCode: 'R1-B1', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: room1.id, bedCode: 'R1-B2', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: room1.id, bedCode: 'R1-B3', status: 'ACTIVE', createdByUserId: ownerUser?.id }
    ], { returning: true });

    const [r2b1, r2b2] = await Bed.bulkCreate([
      { roomId: room2.id, bedCode: 'R2-B1', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: room2.id, bedCode: 'R2-B2', status: 'ACTIVE', createdByUserId: ownerUser?.id }
    ], { returning: true });

    const [r3b1] = await Bed.bulkCreate([
      { roomId: room3.id, bedCode: 'R3-B1', status: 'ACTIVE', createdByUserId: ownerUser?.id }
    ], { returning: true });

    const [r4b1, r4b2, r4b3] = await Bed.bulkCreate([
      { roomId: room4.id, bedCode: 'R4-B1', status: 'ACTIVE', createdByUserId: adminUser?.id },
      { roomId: room4.id, bedCode: 'R4-B2', status: 'ACTIVE', createdByUserId: adminUser?.id },
      { roomId: room4.id, bedCode: 'R4-B3', status: 'MAINTENANCE', createdByUserId: adminUser?.id }
    ], { returning: true });

    const listings = await Listing.bulkCreate([
      {
        roomId: room2.id,
        listingType: 'ENTIRE_ROOM',
        createdByUserId: ownerUser?.id,
        title: 'Private 2-Bed Room in Shared Apartment',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5073,
        longitude: 13.3904,
        rentType: 'WARM',
        baseRent: 78.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room1.id,
        bedId: r1b1.id,
        createdByUserId: ownerUser?.id,
        listingType: 'SINGLE_BED',
        title: 'Shared Bed R1-B1 (Furnished)',
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5076,
        longitude: 13.3911,
        rentType: 'COLD',
        baseRent: 34.50,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room1.id,
        bedId: r1b2.id,
        createdByUserId: ownerUser?.id,
        listingType: 'SINGLE_BED',
        title: 'Shared Bed R1-B2 (Furnished)',
        imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5075,
        longitude: 13.3909,
        rentType: 'COLD',
        baseRent: 34.50,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room1.id,
        bedId: r1b3.id,
        createdByUserId: ownerUser?.id,
        listingType: 'SINGLE_BED',
        title: 'Shared Bed R1-B3 (Furnished)',
        imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5074,
        longitude: 13.3913,
        rentType: 'COLD',
        baseRent: 36.00,
        anmeldungAvailable: false,
        internetIncluded: true,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room3.id,
        createdByUserId: adminUser?.id,
        listingType: 'PRIVATE_ROOM_IN_SHARED_APT',
        title: 'Studio-Style Private Room (A-102)',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5068,
        longitude: 13.3896,
        rentType: 'WARM',
        baseRent: 92.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room4.id,
        bedId: r4b1.id,
        createdByUserId: adminUser?.id,
        listingType: 'SINGLE_BED',
        title: 'Budget Shared Bed R4-B1 (Unfurnished)',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        locationText: 'Leopoldstrasse 120, Munich',
        latitude: 48.1606,
        longitude: 11.5860,
        rentType: 'COLD',
        baseRent: 29.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room4.id,
        bedId: r4b2.id,
        createdByUserId: adminUser?.id,
        listingType: 'SINGLE_BED',
        title: 'Budget Shared Bed R4-B2 (Unfurnished)',
        imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607',
        locationText: 'Leopoldstrasse 120, Munich',
        latitude: 48.1608,
        longitude: 11.5862,
        rentType: 'COLD',
        baseRent: 29.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room2.id,
        bedId: r2b1.id,
        createdByUserId: ownerUser?.id,
        listingType: 'SINGLE_BED',
        title: 'Shared Bed R2-B1 (Semi-Furnished)',
        imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5071,
        longitude: 13.3902,
        rentType: 'WARM',
        baseRent: 44.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room2.id,
        bedId: r2b2.id,
        createdByUserId: ownerUser?.id,
        listingType: 'SINGLE_BED',
        title: 'Shared Bed R2-B2 (Semi-Furnished)',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5070,
        longitude: 13.3901,
        rentType: 'WARM',
        baseRent: 45.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room4.id,
        createdByUserId: adminUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Entire 3-Bed Room (Budget Group Stay)',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
        locationText: 'Leopoldstrasse 120, Munich',
        latitude: 48.1607,
        longitude: 11.5861,
        rentType: 'COLD',
        baseRent: 84.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      }
    ], { returning: true });

    await Booking.bulkCreate([
      { listingId: listings[1].id, userId: tenantUser?.id, checkIn: '2026-05-20', checkOut: '2026-05-28', status: 'PENDING', totalAmount: 690.00 },
      { listingId: listings[4].id, userId: tenantUser?.id, checkIn: '2026-05-25', checkOut: '2026-06-11', status: 'OWNER_APPROVED', totalAmount: 2760.00 },
      { listingId: listings[6].id, userId: ownerUser?.id, checkIn: '2026-05-18', checkOut: '2026-05-28', status: 'PAYMENT_RECEIVED', totalAmount: 348.00, paymentId: 'PAY-DEMO77', paymentMarkedAt: new Date() }
    ]);

    await KycVerification.bulkCreate([
      { userType: 'TENANT', documentType: 'PASSPORT', documentPath: 'uploads/sample-tenant-passport.pdf', status: 'APPROVED' },
      { userType: 'OWNER', documentType: 'PROPERTY_PROOF', documentPath: 'uploads/sample-owner-proof.pdf', status: 'PENDING' }
    ]);

    await Contract.bulkCreate([
      { leaseType: 'LONG_TERM', startDate: '2026-05-12', endDate: '2027-05-11', signedAt: new Date(), status: 'SIGNED' },
      { leaseType: 'SHORT_TERM', startDate: '2026-06-01', endDate: '2026-08-31', status: 'SENT' }
    ]);

    await MaintenanceTicket.bulkCreate([
      { title: 'Broken stove in common kitchen', description: 'Front-right burner does not ignite in A-101 kitchen.', status: 'IN_PROGRESS', photoPath: null },
      { title: 'Leaking washroom tap', description: 'Steady drip causing water waste in B-201 shared washroom.', status: 'OPEN', photoPath: null }
    ]);

    await Expense.bulkCreate([
      { title: 'Groceries - shared oil and spices', amount: 38.40 },
      { title: 'Bathroom cleaning supplies', amount: 21.75 }
    ]);

    await Chore.bulkCreate([
      { title: 'Kitchen deep clean', assignedTo: 'Lena', dueDate: '2026-05-14', done: false },
      { title: 'Trash disposal', assignedTo: 'Arjun', dueDate: '2026-05-12', done: true }
    ]);

    await CommunityMessage.bulkCreate([
      { authorName: 'Mia', message: 'Quiet hours from 10 PM please. Thanks everyone.' },
      { authorName: 'Arjun', message: 'Shared grocery run at 7 PM today. Add items in chat.' },
      { authorName: 'Lena', message: 'Maintenance team visiting tomorrow morning for the stove.' }
    ]);

    console.log('Sample data created successfully.');
    console.log('Login users: admin@rentstack.dev / owner@rentstack.dev / tenant@rentstack.dev');
    console.log('Password for all sample users: Pass@123');
    await sequelize.close();
  } catch (error) {
    console.error('Seeding failed:', error);
    await sequelize.close();
    process.exit(1);
  }
}

seed();
