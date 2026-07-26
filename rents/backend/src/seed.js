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
    await sequelize.sync({ force: true });

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
      { fullName: 'Admin One', email: 'admin@rentstackinventory.com', mobileNumber: '+49-170-0000001', passwordHash, role: 'ADMIN' },
      { fullName: 'Owner One', email: 'owner@rentstackinventory.com', mobileNumber: '+49-170-0000002', passwordHash, role: 'OWNER' },
      { fullName: 'Tenant One', email: 'tenant@rentstackinventory.com', mobileNumber: '+49-170-0000003', passwordHash, role: 'TENANT' }
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
      imageUrls: [],
      createdByUserId: ownerUser?.id
    });

    const apt2 = await Apartment.create({
      propertyId: property1.id,
      code: 'A-102',
      amenities: ['Common Kitchen', 'Private Bathrooms'],
      imageUrls: [],
      createdByUserId: ownerUser?.id
    });

    const apt3 = await Apartment.create({
      propertyId: property2.id,
      code: 'B-201',
      amenities: ['Common Kitchen', 'Gym', 'Bike Storage'],
      imageUrls: [],
      createdByUserId: adminUser?.id
    });

    const room1 = await Room.create({ apartmentId: apt1.id, code: 'R1', capacity: 3, inventoryMode: 'SHARED_ONLY', furnishingStatus: 'FURNISHED', hasPrivateBathroom: false, imageUrls: [], createdByUserId: ownerUser?.id });
    const room2 = await Room.create({ apartmentId: apt1.id, code: 'R2', capacity: 2, inventoryMode: 'HYBRID', furnishingStatus: 'SEMI_FURNISHED', hasPrivateBathroom: true, imageUrls: [], createdByUserId: ownerUser?.id });
    const room3 = await Room.create({ apartmentId: apt2.id, code: 'R3', capacity: 1, inventoryMode: 'PRIVATE_ONLY', furnishingStatus: 'FURNISHED', hasPrivateBathroom: true, imageUrls: [], createdByUserId: ownerUser?.id });
    const room4 = await Room.create({ apartmentId: apt3.id, code: 'R4', capacity: 3, inventoryMode: 'HYBRID', furnishingStatus: 'UNFURNISHED', hasPrivateBathroom: false, imageUrls: [], createdByUserId: adminUser?.id });

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

    // ==============================
    // Owner-only property: Sunset Heights (Berlin)
    // ==============================
    const ownerProperty = await Property.create({
      name: 'Sunset Heights',
      city: 'Berlin',
      address: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
      createdByUserId: ownerUser?.id
    });

    const ownerApt1 = await Apartment.create({
      propertyId: ownerProperty.id,
      code: 'SH-101',
      amenities: ['Balcony', 'Common Kitchen', 'Laundry', 'Bike Storage'],
      imageUrls: [],
      createdByUserId: ownerUser?.id
    });
    const ownerApt2 = await Apartment.create({
      propertyId: ownerProperty.id,
      code: 'SH-102',
      amenities: ['Rooftop Terrace', 'Private Bathrooms', 'Co-Working Space'],
      imageUrls: [],
      createdByUserId: ownerUser?.id
    });
    const ownerApt3 = await Apartment.create({
      propertyId: ownerProperty.id,
      code: 'SH-201',
      amenities: ['Garden Access', 'Common Kitchen', 'Storage Room'],
      imageUrls: [],
      createdByUserId: ownerUser?.id
    });

    const ownerRoom1 = await Room.create({ apartmentId: ownerApt1.id, code: 'SH-R1', capacity: 2, inventoryMode: 'SHARED_ONLY', furnishingStatus: 'FURNISHED', hasPrivateBathroom: false, imageUrls: [], createdByUserId: ownerUser?.id });
    const ownerRoom2 = await Room.create({ apartmentId: ownerApt1.id, code: 'SH-R2', capacity: 1, inventoryMode: 'PRIVATE_ONLY', furnishingStatus: 'FURNISHED', hasPrivateBathroom: true, imageUrls: [], createdByUserId: ownerUser?.id });
    const ownerRoom3 = await Room.create({ apartmentId: ownerApt2.id, code: 'SH-R3', capacity: 3, inventoryMode: 'HYBRID', furnishingStatus: 'SEMI_FURNISHED', hasPrivateBathroom: true, imageUrls: [], createdByUserId: ownerUser?.id });
    const ownerRoom4 = await Room.create({ apartmentId: ownerApt2.id, code: 'SH-R4', capacity: 2, inventoryMode: 'HYBRID', furnishingStatus: 'FURNISHED', hasPrivateBathroom: true, imageUrls: [], createdByUserId: ownerUser?.id });
    const ownerRoom5 = await Room.create({ apartmentId: ownerApt3.id, code: 'SH-R5', capacity: 1, inventoryMode: 'PRIVATE_ONLY', furnishingStatus: 'FURNISHED', hasPrivateBathroom: true, imageUrls: [], createdByUserId: ownerUser?.id });
    const ownerRoom6 = await Room.create({ apartmentId: ownerApt3.id, code: 'SH-R6', capacity: 2, inventoryMode: 'SHARED_ONLY', furnishingStatus: 'UNFURNISHED', hasPrivateBathroom: false, imageUrls: [], createdByUserId: ownerUser?.id });

    const [shR1B1, shR1B2] = await Bed.bulkCreate([
      { roomId: ownerRoom1.id, bedCode: 'SH-R1-B1', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: ownerRoom1.id, bedCode: 'SH-R1-B2', status: 'ACTIVE', createdByUserId: ownerUser?.id }
    ], { returning: true });
    const [shR3B1, shR3B2, shR3B3] = await Bed.bulkCreate([
      { roomId: ownerRoom3.id, bedCode: 'SH-R3-B1', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: ownerRoom3.id, bedCode: 'SH-R3-B2', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: ownerRoom3.id, bedCode: 'SH-R3-B3', status: 'ACTIVE', createdByUserId: ownerUser?.id }
    ], { returning: true });
    const [shR4B1, shR4B2] = await Bed.bulkCreate([
      { roomId: ownerRoom4.id, bedCode: 'SH-R4-B1', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: ownerRoom4.id, bedCode: 'SH-R4-B2', status: 'ACTIVE', createdByUserId: ownerUser?.id }
    ], { returning: true });
    const [shR6B1, shR6B2] = await Bed.bulkCreate([
      { roomId: ownerRoom6.id, bedCode: 'SH-R6-B1', status: 'ACTIVE', createdByUserId: ownerUser?.id },
      { roomId: ownerRoom6.id, bedCode: 'SH-R6-B2', status: 'ACTIVE', createdByUserId: ownerUser?.id }
    ], { returning: true });

    const local3DBedrooms = [
      'http://localhost:5000/uploads/3d-bedroom-1.png',
      'http://localhost:5000/uploads/3d-bedroom-2.png',
      'http://localhost:5000/uploads/3d-bedroom-3.png',
      'http://localhost:5000/uploads/3d-bedroom-4.png',
      'http://localhost:5000/uploads/3d-bedroom-5.png',
      'http://localhost:5000/uploads/3d-bedroom-6.png',
      'http://localhost:5000/uploads/3d-bedroom-7.png'
    ];
    
    const local3DLivings = [
      'http://localhost:5000/uploads/3d-living-1.png',
      'http://localhost:5000/uploads/3d-living-2.png',
      'http://localhost:5000/uploads/3d-living-3.png',
      'http://localhost:5000/uploads/3d-living-4.png'
    ];
    
    const local3DKitchen = 'http://localhost:5000/uploads/3d-kitchen.png';
    const local3DBathroom = 'http://localhost:5000/uploads/3d-bathroom.png';

    let bedroomIndex = 0;
    let livingIndex = 0;

    const mapUnsplashTo3D = (item) => {
      let mainUrl = '';
      let secondaryUrls = [];
      const url = item.imageUrl || '';
      
      if (url.includes('1505693416388') || url.includes('1484154218962') || url.includes('1522708323590') || item.title.toLowerCase().includes('bed') || item.title.toLowerCase().includes('room')) {
        mainUrl = local3DBedrooms[bedroomIndex % local3DBedrooms.length];
        bedroomIndex++;
        
        secondaryUrls = [
          local3DBedrooms[(bedroomIndex) % local3DBedrooms.length],
          local3DBedrooms[(bedroomIndex + 1) % local3DBedrooms.length],
          local3DLivings[0],
          local3DKitchen,
          local3DBathroom
        ];
      } else {
        mainUrl = local3DLivings[livingIndex % local3DLivings.length];
        livingIndex++;
        
        secondaryUrls = [
          local3DLivings[(livingIndex) % local3DLivings.length],
          local3DBedrooms[0],
          local3DKitchen,
          local3DBathroom
        ];
      }
      
      return {
        ...item,
        imageUrl: mainUrl,
        imageUrls: secondaryUrls
      };
    };

    // ==============================
    // 10 SHORT-TERM owner listings
    // ==============================
    const ownerShortTermListings = await Listing.bulkCreate([
      {
        roomId: ownerRoom1.id,
        bedId: shR1B1.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Cozy Shared Bed near Mauerpark',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5388,
        longitude: 13.4025,
        rentType: 'WARM',
        stayType: 'SHORT_TERM',
        baseRent: 38.00,
        depositAmount: 100.00,
        cleaningCharge: 25.00,
        anmeldungAvailable: false,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom1.id,
        bedId: shR1B2.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Budget Bed in Furnished Shared Room',
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5390,
        longitude: 13.4027,
        rentType: 'WARM',
        stayType: 'SHORT_TERM',
        baseRent: 35.00,
        depositAmount: 80.00,
        cleaningCharge: 20.00,
        anmeldungAvailable: false,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom2.id,
        listingType: 'PRIVATE_ROOM_IN_SHARED_APT',
        createdByUserId: ownerUser?.id,
        title: 'Private Room with Balcony — Prenzlauer Berg',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5392,
        longitude: 13.4030,
        rentType: 'WARM',
        stayType: 'SHORT_TERM',
        baseRent: 65.00,
        depositAmount: 200.00,
        cleaningCharge: 35.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom3.id,
        bedId: shR3B1.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Rooftop Access Shared Bed — SH-R3',
        imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5385,
        longitude: 13.4022,
        rentType: 'COLD',
        stayType: 'SHORT_TERM',
        baseRent: 32.00,
        depositAmount: 75.00,
        cleaningCharge: 15.00,
        anmeldungAvailable: false,
        internetIncluded: true,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom3.id,
        bedId: shR3B2.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Shared Bed near Co-Working Space',
        imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5386,
        longitude: 13.4023,
        rentType: 'COLD',
        stayType: 'SHORT_TERM',
        baseRent: 30.00,
        depositAmount: 75.00,
        cleaningCharge: 15.00,
        anmeldungAvailable: false,
        internetIncluded: true,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom3.id,
        listingType: 'ENTIRE_ROOM',
        createdByUserId: ownerUser?.id,
        title: 'Entire 3-Bed Room — Rooftop Terrace Apt',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5384,
        longitude: 13.4020,
        rentType: 'WARM',
        stayType: 'SHORT_TERM',
        baseRent: 95.00,
        depositAmount: 300.00,
        cleaningCharge: 45.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom4.id,
        listingType: 'ENTIRE_ROOM',
        createdByUserId: ownerUser?.id,
        title: 'Premium Private 2-Bed Suite',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5391,
        longitude: 13.4029,
        rentType: 'WARM',
        stayType: 'SHORT_TERM',
        baseRent: 85.00,
        depositAmount: 250.00,
        cleaningCharge: 40.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom5.id,
        listingType: 'PRIVATE_ROOM_IN_SHARED_APT',
        createdByUserId: ownerUser?.id,
        title: 'Garden View Private Studio — SH-201',
        imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5382,
        longitude: 13.4018,
        rentType: 'WARM',
        stayType: 'SHORT_TERM',
        baseRent: 72.00,
        depositAmount: 200.00,
        cleaningCharge: 30.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom6.id,
        bedId: shR6B1.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Affordable Bed — Garden Level Room',
        imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5380,
        longitude: 13.4015,
        rentType: 'COLD',
        stayType: 'SHORT_TERM',
        baseRent: 26.00,
        depositAmount: 50.00,
        cleaningCharge: 10.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom6.id,
        bedId: shR6B2.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Budget Bed — Ground Floor Shared Room',
        imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5381,
        longitude: 13.4016,
        rentType: 'COLD',
        stayType: 'SHORT_TERM',
        baseRent: 24.00,
        depositAmount: 50.00,
        cleaningCharge: 10.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      }
    ].map(mapUnsplashTo3D), { returning: true });

    // ==============================
    // 10 LONG-TERM owner listings
    // ==============================
    const ownerLongTermListings = await Listing.bulkCreate([
      {
        roomId: ownerRoom2.id,
        listingType: 'PRIVATE_ROOM_IN_SHARED_APT',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Private Room — 3 month min',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5393,
        longitude: 13.4031,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 3,
        baseRent: 750.00,
        depositAmount: 1500.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom1.id,
        listingType: 'ENTIRE_ROOM',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Furnished Shared Room — 6 month min',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5389,
        longitude: 13.4026,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 6,
        baseRent: 850.00,
        depositAmount: 1700.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom3.id,
        listingType: 'ENTIRE_ROOM',
        createdByUserId: ownerUser?.id,
        title: 'Long-term 3-Bed Rooftop Apt — 12 month min',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5387,
        longitude: 13.4024,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 12,
        baseRent: 1100.00,
        depositAmount: 2200.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom4.id,
        listingType: 'ENTIRE_ROOM',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Premium Suite — 2 month min',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5394,
        longitude: 13.4032,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 2,
        baseRent: 920.00,
        depositAmount: 1840.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom5.id,
        listingType: 'PRIVATE_ROOM_IN_SHARED_APT',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Garden Studio — 1 month min',
        imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5383,
        longitude: 13.4019,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 1,
        baseRent: 680.00,
        depositAmount: 1360.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom6.id,
        listingType: 'ENTIRE_ROOM',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Budget Shared Room — 6 month min',
        imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5379,
        longitude: 13.4014,
        rentType: 'COLD',
        stayType: 'LONG_TERM',
        minStayMonths: 6,
        baseRent: 520.00,
        depositAmount: 1040.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom3.id,
        bedId: shR3B3.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Single Bed — Co-Working — 3 month min',
        imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5388,
        longitude: 13.4026,
        rentType: 'COLD',
        stayType: 'LONG_TERM',
        minStayMonths: 3,
        baseRent: 420.00,
        depositAmount: 840.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom4.id,
        bedId: shR4B1.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Furnished Bed — 2 month min',
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5395,
        longitude: 13.4033,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 2,
        baseRent: 480.00,
        depositAmount: 960.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom4.id,
        bedId: shR4B2.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Premium Bed — 1 month min',
        imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5396,
        longitude: 13.4034,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 1,
        baseRent: 500.00,
        depositAmount: 1000.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: ownerRoom1.id,
        bedId: shR1B1.id,
        listingType: 'SINGLE_BED',
        createdByUserId: ownerUser?.id,
        title: 'Long-term Shared Bed — Mauerpark — 3 month min',
        imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9',
        locationText: 'Kastanienallee 42, Prenzlauer Berg, Berlin',
        latitude: 52.5391,
        longitude: 13.4028,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 3,
        baseRent: 390.00,
        depositAmount: 780.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      }
    ].map(mapUnsplashTo3D), { returning: true });

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
      ,
      {
        roomId: room3.id,
        createdByUserId: adminUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Long-term Studio (A-102) - 3 month minimum',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5069,
        longitude: 13.3898,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 3,
        baseRent: 900.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      }
      ,
      {
        roomId: room3.id,
        createdByUserId: ownerUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Long-term Studio A-102 — 1 month min',
        imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5067,
        longitude: 13.3895,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 1,
        baseRent: 720.00,
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
        createdByUserId: ownerUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Long-term 2-Bed Private — 2 month min',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5072,
        longitude: 13.3903,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 2,
        baseRent: 820.00,
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
        title: 'Long-term Budget 3-Bed — 6 month min',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
        locationText: 'Leopoldstrasse 120, Munich',
        latitude: 48.1607,
        longitude: 11.5861,
        rentType: 'COLD',
        stayType: 'LONG_TERM',
        minStayMonths: 6,
        baseRent: 650.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room1.id,
        createdByUserId: ownerUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Long-term Shared Room R1 — 12 month min',
        imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5074,
        longitude: 13.3909,
        rentType: 'COLD',
        stayType: 'LONG_TERM',
        minStayMonths: 12,
        baseRent: 680.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room2.id,
        createdByUserId: ownerUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Long-term 2-Bed Cozy — 3 month min',
        imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.5070,
        longitude: 13.3901,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 3,
        baseRent: 860.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room3.id,
        createdByUserId: ownerUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Long-term Single Studio — 2 month min',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.50685,
        longitude: 13.3897,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 2,
        baseRent: 780.00,
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
        title: 'Long-term Group Stay — 1 month min',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
        locationText: 'Leopoldstrasse 120, Munich',
        latitude: 48.1609,
        longitude: 11.5863,
        rentType: 'COLD',
        stayType: 'LONG_TERM',
        minStayMonths: 1,
        baseRent: 700.00,
        anmeldungAvailable: false,
        internetIncluded: false,
        electricityIncluded: false,
        maintenanceIncluded: true,
        heatingIncluded: false,
        waterIncluded: true,
        isActive: true
      },
      {
        roomId: room1.id,
        createdByUserId: ownerUser?.id,
        listingType: 'ENTIRE_ROOM',
        title: 'Long-term Spacious R1 — 6 month min',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        locationText: 'Friedrichstrasse 88, Berlin',
        latitude: 52.50755,
        longitude: 13.3910,
        rentType: 'WARM',
        stayType: 'LONG_TERM',
        minStayMonths: 6,
        baseRent: 950.00,
        anmeldungAvailable: true,
        internetIncluded: true,
        electricityIncluded: true,
        maintenanceIncluded: true,
        heatingIncluded: true,
        waterIncluded: true,
        isActive: true
      }
    ].map(mapUnsplashTo3D), { returning: true });

    // Bookings seeding removed as requested.

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
    console.log('Login users: admin@rentstackinventory.com / owner@rentstackinventory.com / tenant@rentstackinventory.com');
    console.log('Password for all sample users: Pass@123');
    await sequelize.close();
  } catch (error) {
    console.error('Seeding failed:', error);
    await sequelize.close();
    process.exit(1);
  }
}

seed();
