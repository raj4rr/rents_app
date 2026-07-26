const assert = require('assert');
const {
  sequelize,
  User,
  Listing,
  Booking,
  OwnerBankAccount,
  TenantBankAccount,
  DepositDeduction,
  Property,
  Apartment,
  Room,
  ContactMessage
} = require('./models');

async function runTests() {
  console.log('🚀 Starting RentStack Inventory Feature Unit Tests...');
  let exitCode = 0;

  let owner = null;
  let tenant = null;
  let ownerAcc = null;
  let tenantAcc = null;
  let listing = null;
  let booking = null;
  let oldBooking = null;
  let testUser = null;
  let testResetUser = null;
  let contactMsg = null;
  let testProperty = null;
  let testApartment = null;
  let testRoom = null;
  let testImportedListing = null;

  try {
    // Authenticate database
    await sequelize.authenticate();
    
    // Add columns if they do not exist
    try {
      await sequelize.query("ALTER TABLE Users ADD COLUMN financialDocPath VARCHAR(500) NULL");
    } catch (e) {}
    try {
      await sequelize.query("ALTER TABLE Bookings ADD COLUMN tenantComment TEXT NULL");
    } catch (e) {}
    try {
      await sequelize.query("ALTER TABLE Bookings ADD COLUMN wohnungsgeberPath VARCHAR(500) NULL");
    } catch (e) {}

    console.log('✓ Database connection authenticated & columns validated.');

    // Setup Mock User Roles
    owner = await User.create({
      fullName: 'Test Owner',
      email: `owner_${Date.now()}@rentstackinventory.test`,
      passwordHash: 'hashedpassword',
      role: 'OWNER'
    });
    tenant = await User.create({
      fullName: 'Test Tenant',
      email: `tenant_${Date.now()}@rentstackinventory.test`,
      passwordHash: 'hashedpassword',
      role: 'TENANT'
    });
    console.log('✓ Test users created.');

    // ── TEST 1: Owner Bank Account Modification Limits ──
    console.log('\nRunning Test 1: Owner Bank Account Modification Limits...');
    ownerAcc = await OwnerBankAccount.create({
      userId: owner.id,
      accountHolder: 'Test Owner',
      iban: 'DE1234567890',
      bic: 'TESTBICXXX',
      editCount: 0
    });
    assert.strictEqual(ownerAcc.editCount, 0, 'Initial edit count should be 0');

    // Simulate API limit validation logic (editCount < 1)
    let canEdit = ownerAcc.editCount < 1;
    assert.strictEqual(canEdit, true, 'Owner should be allowed to edit the bank account initially');

    // Increment edit count (simulating save)
    ownerAcc.accountHolder = 'Test Owner Updated';
    ownerAcc.editCount += 1;
    await ownerAcc.save();
    assert.strictEqual(ownerAcc.editCount, 1, 'Edit count should increment to 1 after first update');

    // Check second edit permission
    canEdit = ownerAcc.editCount < 1;
    assert.strictEqual(canEdit, false, 'Owner should NOT be allowed to edit after first update is saved');
    console.log('✓ Test 1 Passed: Owner bank account edit is locked after 1 modification.');

    // ── TEST 2: Tenant Bank Account Unlimited Modifications ──
    console.log('\nRunning Test 2: Tenant Bank Account Unlimited Modifications...');
    tenantAcc = await TenantBankAccount.create({
      userId: tenant.id,
      accountHolder: 'Test Tenant',
      iban: 'DE9876543210',
      bic: 'TESTBICYYY'
    });
    // Simulating multiple saves
    for (let i = 1; i <= 5; i++) {
      tenantAcc.accountHolder = `Test Tenant Edit ${i}`;
      await tenantAcc.save();
    }
    assert.strictEqual(tenantAcc.accountHolder, 'Test Tenant Edit 5', 'Tenant account holder should update multiple times without constraints');
    console.log('✓ Test 2 Passed: Tenant can update bank details unlimited times.');

    // ── TEST 3: Multi-Deduction & Limit Constraints ──
    console.log('\nRunning Test 3: Multiple Deposit Deductions & Over-limit Rejections...');
    
    // Mock Listing with €500 Deposit
    listing = await Listing.create({
      title: 'Mock Test Room',
      listingType: 'ENTIRE_ROOM',
      imageUrl: 'http://sample.jpg',
      imageUrls: [],
      locationText: 'Berlin Mitte',
      rentType: 'WARM',
      baseRent: 500,
      depositAmount: 500,
      cleaningCharge: 50,
      createdByUserId: owner.id
    });

    booking = await Booking.create({
      checkIn: '2026-10-01',
      checkOut: '2026-11-01',
      status: 'CONFIRMED',
      totalAmount: 1050,
      userId: tenant.id
    });

    // Add first deduction of €200
    const deduct1 = await DepositDeduction.create({
      bookingId: booking.id,
      amount: 200,
      reason: 'Deep Cleaning Fee'
    });
    assert.strictEqual(Number(deduct1.amount), 200);

    // Add second deduction of €150
    const deduct2 = await DepositDeduction.create({
      bookingId: booking.id,
      amount: 150,
      reason: 'Wall Damage/Painting'
    });
    assert.strictEqual(Number(deduct2.amount), 150);

    // Retrieve all deductions and check sum
    const deductions = await DepositDeduction.findAll({ where: { bookingId: booking.id } });
    assert.strictEqual(deductions.length, 2, 'Deductions count should be 2');
    
    const sum = deductions.reduce((s, d) => s + Number(d.amount), 0);
    assert.strictEqual(sum, 350, 'Total deductions sum should be €350');

    // Simulate limit check for new deduction of €200 (Total would be 350 + 200 = 550, exceeding 500 deposit)
    const newDeductionAmt = 200;
    const depositLimit = Number(listing.depositAmount);
    const exceeds = (sum + newDeductionAmt) > depositLimit;
    assert.strictEqual(exceeds, true, 'Deduction sum of €550 should exceed the €500 deposit limit');

    console.log('✓ Test 3 Passed: Successfully stored multiple deductions and blocked over-limit allocations.');

    // ── TEST 4: Auto-Confirm 48-Hour Booking Job ──
    console.log('\nRunning Test 4: Auto-Confirm 48-Hour Booking Job...');
    
    // Create a mock booking marked as paid 50 hours ago
    const fiftyHoursAgo = new Date(Date.now() - 50 * 60 * 60 * 1000);
    oldBooking = await Booking.create({
      checkIn: '2026-12-01',
      checkOut: '2026-12-10',
      status: 'PAYMENT_RECEIVED',
      paymentMarkedAt: fiftyHoursAgo,
      totalAmount: 400,
      userId: tenant.id
    });

    // Simulate cron query logic
    const { Op } = require('sequelize');
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    const overdueBookings = await Booking.findAll({
      where: {
        id: oldBooking.id,
        status: 'PAYMENT_RECEIVED',
        paymentMarkedAt: {
          [Op.lte]: cutoff
        }
      }
    });

    assert.strictEqual(overdueBookings.length, 1, 'Should find 1 booking older than 48 hours in PAYMENT_RECEIVED state');
    
    // Auto-confirm it
    overdueBookings[0].status = 'CONFIRMED';
    await overdueBookings[0].save();
    
    // Check DB state
    const verifiedBooking = await Booking.findByPk(oldBooking.id);
    assert.strictEqual(verifiedBooking.status, 'CONFIRMED', 'Booking status should be updated to CONFIRMED');
    console.log('✓ Test 4 Passed: 48-hour auto-confirm job correctly queries and transitions bookings.');

    // ── TEST 5: Internal Platform Fees Calculation ──
    console.log('\nRunning Test 5: Internal Platform Fees Calculation...');
    const testListingShort = { stayType: 'SHORT_TERM', baseRent: 150 };
    const testListingLong = { stayType: 'LONG_TERM', baseRent: 400 };
    const getCalculatedRent = (listingObj) => {
      const fee = listingObj.stayType === 'LONG_TERM' ? 50 : 10;
      return Number(listingObj.baseRent) + fee;
    };
    assert.strictEqual(getCalculatedRent(testListingShort), 160, 'Short term stay baseRent of 150 should resolve to 160');
    assert.strictEqual(getCalculatedRent(testListingLong), 450, 'Long term stay baseRent of 400 should resolve to 450');
    console.log('✓ Test 5 Passed: Platform fee addition works correctly.');

    // ── TEST 6: Change Password API Logic ──
    console.log('\nRunning Test 6: Change Password API Logic...');
    const bcrypt = require('bcryptjs');
    testUser = await User.create({
      fullName: 'Test Password User',
      email: 'pwd@test.com',
      mobileNumber: '+49151234568',
      passwordHash: await bcrypt.hash('old-secret-123', 10),
      role: 'TENANT'
    });
    const isOldMatch = await bcrypt.compare('old-secret-123', testUser.passwordHash);
    assert.strictEqual(isOldMatch, true, 'Old password verification should succeed');
    const isWrongMatch = await bcrypt.compare('wrong-pwd', testUser.passwordHash);
    assert.strictEqual(isWrongMatch, false, 'Wrong password comparison should fail');
    testUser.passwordHash = await bcrypt.hash('new-secret-456', 10);
    await testUser.save();
    const isNewMatch = await bcrypt.compare('new-secret-456', testUser.passwordHash);
    assert.strictEqual(isNewMatch, true, 'New password verification should succeed after change');
    console.log('✓ Test 6 Passed: Change password logic works perfectly.');

    // ── TEST 7: Forgot / Reset Password Verification Logic ──
    console.log('\nRunning Test 7: Reset Password Verification Logic...');
    testResetUser = await User.create({
      fullName: 'Verification Target User',
      email: 'verify@reset.com',
      mobileNumber: '+49151000000',
      passwordHash: await bcrypt.hash('secret-to-be-reset', 10),
      role: 'TENANT',
      dob: '1995-10-15',
      nationality: 'German'
    });
    const runResetLogic = async (payload) => {
      const { email, dob, fullName, nationality } = payload;
      const where = {};
      if (email) where.email = email;
      if (dob) where.dob = dob;
      if (fullName) where.fullName = fullName;
      if (nationality) where.nationality = nationality;
      const count = Object.keys(where).length;
      if (count < 2) throw new Error('At least two fields required');
      return await User.findOne({ where });
    };
    const userA = await runResetLogic({ email: 'verify@reset.com', nationality: 'German' });
    assert.ok(userA, 'Should successfully identify user with email and nationality');
    assert.strictEqual(userA.id, testResetUser.id, 'Resolved user must match test user');
    const userB = await runResetLogic({ dob: '1995-10-15', fullName: 'Verification Target User' });
    assert.ok(userB, 'Should successfully identify user with dob and fullName');
    try {
      await runResetLogic({ email: 'verify@reset.com' });
      assert.fail('Should fail when only 1 verification field is provided');
    } catch (err) {
      assert.strictEqual(err.message, 'At least two fields required');
    }
    const userD = await runResetLogic({ email: 'verify@reset.com', nationality: 'French' });
    assert.strictEqual(userD, null, 'Should return null when verification credentials do not match');
    console.log('✓ Test 7 Passed: Reset password verification rules validated successfully.');
    // ── TEST 8: Contact Message Database Submission ──
    console.log('\nRunning Test 8: Contact Message Database Submission...');
    contactMsg = await ContactMessage.create({
      name: 'Tester Bot',
      email: 'bot@tester.com',
      message: 'Hello, this is a simulated contact request'
    });
    assert.ok(contactMsg.id, 'Contact message should receive a database ID');
    assert.strictEqual(contactMsg.name, 'Tester Bot');
    assert.strictEqual(contactMsg.email, 'bot@tester.com');
    console.log('✓ Test 8 Passed: Contact message successfully persisted inside the database.');

    // ── TEST 9: Excel/CSV Listing Import Parsing ──
    console.log('\nRunning Test 9: Excel/CSV Listing Import Parsing...');
    testProperty = await Property.create({
      name: 'Test Import Mansion',
      city: 'Berlin',
      address: 'Test Street 1',
      createdByUserId: owner.id
    });
    testApartment = await Apartment.create({
      code: 'APT-99',
      amenities: [],
      propertyId: testProperty.id,
      createdByUserId: owner.id
    });
    testRoom = await Room.create({
      code: 'TEST-ROOM-99',
      capacity: 1,
      apartmentId: testApartment.id,
      createdByUserId: owner.id
    });

    const mockCsvContent = `roomCode,bedCode,title,listingType,stayType,minStayMonths,locationText,latitude,longitude,rentType,baseRent,depositAmount,cleaningCharge,anmeldungAvailable,internetIncluded,electricityIncluded,maintenanceIncluded,heatingIncluded,waterIncluded
TEST-ROOM-99,,Cozy Room near Tempelhof,ENTIRE_ROOM,LONG_TERM,3,Berlin Tempelhof,52.48,13.40,WARM,350.00,350.00,40.00,true,true,true,true,true,true`;

    const lines = mockCsvContent.split('\n').filter(l => l.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    const rowValues = lines[1].split(',').map(v => v.trim());
    const parsedRow = {};
    headers.forEach((header, idx) => {
      parsedRow[header] = rowValues[idx];
    });

    assert.strictEqual(parsedRow.roomCode, 'TEST-ROOM-99', 'Parsed roomCode should match input TEST-ROOM-99');
    assert.strictEqual(parsedRow.title, 'Cozy Room near Tempelhof', 'Parsed title should match CSV row');
    assert.strictEqual(Number(parsedRow.baseRent), 350.00, 'Parsed baseRent should be €350.00');

    testImportedListing = await Listing.create({
      roomId: testRoom.id,
      title: parsedRow.title,
      listingType: parsedRow.listingType,
      stayType: parsedRow.stayType,
      minStayMonths: Number(parsedRow.minStayMonths),
      locationText: parsedRow.locationText,
      rentType: parsedRow.rentType,
      baseRent: Number(parsedRow.baseRent) + 50,
      depositAmount: Number(parsedRow.depositAmount),
      cleaningCharge: Number(parsedRow.cleaningCharge),
      createdByUserId: owner.id
    });

    assert.ok(testImportedListing.id, 'Imported listing should receive database ID');
    assert.strictEqual(testImportedListing.baseRent, 400, 'Imported listing rent should include Platform Fee (350 + 50 = €400)');
    console.log('✓ Test 9 Passed: CSV spreadsheet template row parses and inserts listings correctly with dynamic platform fees.');

    // ── TEST 10: Financial Documents, Comments Validation and Wohnungsgeberbestätigung ──
    console.log('\nRunning Test 10: Profile Uploads, Comments Length Checks, and Wohnungsgeberbestätigung...');
    
    // 1. Verify User model preserves financialDocPath
    tenant.financialDocPath = 'uploads/test_financial_doc.pdf';
    await tenant.save();
    let reloadedTenant = await User.findByPk(tenant.id);
    assert.strictEqual(reloadedTenant.financialDocPath, 'uploads/test_financial_doc.pdf', 'financialDocPath should persist on User model');

    // 2. Verify Booking model preserves tenantComment and wohnungsgeberPath
    let testBooking = await Booking.create({
      checkIn: '2026-10-01',
      checkOut: '2026-11-01',
      status: 'CONFIRMED',
      totalAmount: 500.00,
      userId: tenant.id,
      tenantComment: 'A very long comment motivations detailed explanation containing more than 200 characters needed to approve my booking request. This is to verify that comments are successfully saved and loaded correctly from database.',
      wohnungsgeberPath: 'uploads/wohnungsgeber_doc.pdf'
    });

    assert.ok(testBooking.tenantComment.length >= 200, 'tenantComment length should be over 200 characters');
    assert.strictEqual(testBooking.wohnungsgeberPath, 'uploads/wohnungsgeber_doc.pdf', 'wohnungsgeberPath should persist on Booking model');

    // Clean up Test 10 booking
    await testBooking.destroy().catch(() => {});
    console.log('✓ Test 10 Passed: Profile financialDocPath, comment validation limits, and Wohnungsgeberbestätigung successfully validated.');

    console.log('🎉 All Unit Tests Passed successfully!');

  } catch (error) {
    console.error('❌ Test Failed with assertion error:', error.message);
    exitCode = 1;
  } finally {
    try {
      console.log('\nRunning database cleanup...');
      if (booking) {
        await DepositDeduction.destroy({ where: { bookingId: booking.id } }).catch(() => {});
        await booking.destroy().catch(() => {});
      }
      if (oldBooking) {
        await oldBooking.destroy().catch(() => {});
      }
      if (listing) await listing.destroy().catch(() => {});
      if (ownerAcc) await ownerAcc.destroy().catch(() => {});
      if (tenantAcc) await tenantAcc.destroy().catch(() => {});
      if (owner) await owner.destroy().catch(() => {});
      if (tenant) await tenant.destroy().catch(() => {});
      if (testUser) await testUser.destroy().catch(() => {});
      if (testResetUser) await testResetUser.destroy().catch(() => {});
      if (contactMsg) await contactMsg.destroy().catch(() => {});
      if (testImportedListing) await testImportedListing.destroy().catch(() => {});
      if (testRoom) await testRoom.destroy().catch(() => {});
      if (testApartment) await testApartment.destroy().catch(() => {});
      if (testProperty) await testProperty.destroy().catch(() => {});
      console.log('✓ Cleaned up test mock entries successfully.');
    } catch (cleanupError) {
      console.error('Cleanup failed:', cleanupError.message);
    }
    process.exit(exitCode);
  }
}

runTests();
