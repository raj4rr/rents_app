const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  mobileNumber: { type: DataTypes.STRING(30), allowNull: true },
  passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('TENANT', 'OWNER', 'ADMIN'), allowNull: false, defaultValue: 'TENANT' },
  fatherName: { type: DataTypes.STRING(120), allowNull: true },
  dob: { type: DataTypes.STRING(30), allowNull: true },
  photoWithPassport: { type: DataTypes.STRING(500), allowNull: true },
  passportPath: { type: DataTypes.STRING(500), allowNull: true },
  residenceProofPath: { type: DataTypes.STRING(500), allowNull: true },
  signaturePath: { type: DataTypes.STRING(500), allowNull: true },
  nationality: { type: DataTypes.STRING(80), allowNull: true },
  residenceCountry: { type: DataTypes.STRING(80), allowNull: true },
  streetAddress: { type: DataTypes.STRING(255), allowNull: true },
  zipCode: { type: DataTypes.STRING(20), allowNull: true },
  city: { type: DataTypes.STRING(80), allowNull: true },
  country: { type: DataTypes.STRING(80), allowNull: true },
  profileStatus: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'), allowNull: false, defaultValue: 'PENDING' },
  profileRejectReason: { type: DataTypes.STRING(255), allowNull: true },
  financialDocPath: { type: DataTypes.STRING(500), allowNull: true },
  shortTermFee: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  longTermFee: { type: DataTypes.DECIMAL(10, 2), allowNull: true }
});

const OwnerBankAccount = sequelize.define('OwnerBankAccount', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  accountHolder: { type: DataTypes.STRING(120), allowNull: false },
  iban: { type: DataTypes.STRING(34), allowNull: false },
  bic: { type: DataTypes.STRING(11), allowNull: false },
  editCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0, max: 1 } }
}, {
  tableName: 'ownerBankAccounts'
});

const Property = sequelize.define('Property', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  city: { type: DataTypes.STRING(100), allowNull: false },
  address: { type: DataTypes.STRING(255), allowNull: false },
  createdByUserId: { type: DataTypes.INTEGER, allowNull: true }
});

const Apartment = sequelize.define('Apartment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(50), allowNull: false },
  amenities: { type: DataTypes.JSON, allowNull: false },
  imageUrls: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  createdByUserId: { type: DataTypes.INTEGER, allowNull: true }
});

const Room = sequelize.define('Room', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(50), allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 3 } },
  maxPersons: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, validate: { min: 1, max: 10 } },
  singleBeds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0, max: 10 } },
  doubleBeds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0, max: 10 } },
  inventoryMode: { type: DataTypes.ENUM('PRIVATE_ONLY', 'SHARED_ONLY', 'HYBRID'), allowNull: false, defaultValue: 'HYBRID' },
  furnishingStatus: { type: DataTypes.ENUM('FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED'), allowNull: false, defaultValue: 'SEMI_FURNISHED' },
  hasPrivateBathroom: { type: DataTypes.BOOLEAN, defaultValue: false },
  imageUrls: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  createdByUserId: { type: DataTypes.INTEGER, allowNull: true }
});

const Bed = sequelize.define('Bed', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bedCode: { type: DataTypes.STRING(50), allowNull: false },
  status: { type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE'), allowNull: false, defaultValue: 'ACTIVE' },
  imageUrl: { type: DataTypes.STRING(500), allowNull: true },
  createdByUserId: { type: DataTypes.INTEGER, allowNull: true }
});

const Listing = sequelize.define('Listing', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  listingType: { type: DataTypes.ENUM('ENTIRE_ROOM', 'SINGLE_BED', 'PRIVATE_ROOM_IN_SHARED_APT'), allowNull: false },
  title: { type: DataTypes.STRING(180), allowNull: false },
  imageUrl: { type: DataTypes.STRING(500), allowNull: true },
  imageUrls: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  locationText: { type: DataTypes.STRING(255), allowNull: true },
  latitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  longitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  rentType: { type: DataTypes.ENUM('WARM', 'COLD'), allowNull: false },
  stayType: { type: DataTypes.ENUM('SHORT_TERM', 'LONG_TERM'), allowNull: false, defaultValue: 'SHORT_TERM' },
  minStayMonths: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, validate: { min: 1, max: 12 } },
  baseRent: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  depositAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0, validate: { min: 0 } },
  cleaningCharge: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0, validate: { min: 0 } },
  anmeldungAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
  internetIncluded: { type: DataTypes.BOOLEAN, defaultValue: false },
  electricityIncluded: { type: DataTypes.BOOLEAN, defaultValue: false },
  maintenanceIncluded: { type: DataTypes.BOOLEAN, defaultValue: false },
  heatingIncluded: { type: DataTypes.BOOLEAN, defaultValue: false },
  waterIncluded: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  createdByUserId: { type: DataTypes.INTEGER, allowNull: true }
});

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  checkIn: { type: DataTypes.DATEONLY, allowNull: false },
  checkOut: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED'), allowNull: false, defaultValue: 'PENDING' },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  paymentId: { type: DataTypes.STRING(50), allowNull: true },
  paymentMarkedAt: { type: DataTypes.DATE, allowNull: true },
  depositDeductedAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  depositDeductionReason: { type: DataTypes.STRING(500), allowNull: true },
  depositDeductionEvidence: { type: DataTypes.STRING(500), allowNull: true },
  tenantComment: { type: DataTypes.TEXT, allowNull: true },
  wohnungsgeberPath: { type: DataTypes.STRING(500), allowNull: true }
});

const KycVerification = sequelize.define('KycVerification', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userType: { type: DataTypes.ENUM('TENANT', 'OWNER'), allowNull: false },
  documentType: { type: DataTypes.ENUM('PASSPORT', 'NATIONAL_ID', 'PROPERTY_PROOF'), allowNull: false },
  documentPath: { type: DataTypes.STRING(255), allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'), allowNull: false, defaultValue: 'PENDING' }
});

const Contract = sequelize.define('Contract', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: true },
  leaseType: { type: DataTypes.ENUM('SHORT_TERM', 'LONG_TERM'), allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  signedAt: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.ENUM('DRAFT', 'SENT', 'SIGNED'), allowNull: false, defaultValue: 'DRAFT' },
  tenantId: { type: DataTypes.INTEGER, allowNull: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: true },
  tenantName: { type: DataTypes.STRING(200), allowNull: true },
  tenantAddress: { type: DataTypes.STRING(500), allowNull: true },
  ownerDetails: { type: DataTypes.JSON, allowNull: true },
  filePath: { type: DataTypes.STRING(500), allowNull: true }
});

const TenantBankAccount = sequelize.define('TenantBankAccount', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  accountHolder: { type: DataTypes.STRING(120), allowNull: false },
  iban: { type: DataTypes.STRING(34), allowNull: false },
  bic: { type: DataTypes.STRING(11), allowNull: false }
}, {
  tableName: 'tenantBankAccounts'
});

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: false },
  payerUserId: { type: DataTypes.INTEGER, allowNull: false },
  payeeUserId: { type: DataTypes.INTEGER, allowNull: true },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  paymentReference: { type: DataTypes.STRING(120), allowNull: false },
  paymentType: { type: DataTypes.ENUM('PLATFORM_FEE','RENT','DEPOSIT'), allowNull: false },
  status: { type: DataTypes.ENUM('PENDING','COMPLETED','REJECTED'), allowNull: false, defaultValue: 'PENDING' },
  tenantAccountId: { type: DataTypes.INTEGER, allowNull: true },
  ownerAccountId: { type: DataTypes.INTEGER, allowNull: true }
});

const MaintenanceTicket = sequelize.define('MaintenanceTicket', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(180), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  photoPath: { type: DataTypes.STRING(255), allowNull: true },
  status: { type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED'), allowNull: false, defaultValue: 'OPEN' }
});

const Expense = sequelize.define('Expense', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(120), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

const Chore = sequelize.define('Chore', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(120), allowNull: false },
  assignedTo: { type: DataTypes.STRING(120), allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  done: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const CommunityMessage = sequelize.define('CommunityMessage', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  authorName: { type: DataTypes.STRING(120), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false }
});

const DepositDeduction = sequelize.define('DepositDeduction', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  reason: { type: DataTypes.STRING(255), allowNull: false },
  evidenceUrl: { type: DataTypes.STRING(500), allowNull: true }
}, {
  tableName: 'depositDeductions'
});

Property.hasMany(Apartment, { foreignKey: 'propertyId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Apartment.belongsTo(Property, { foreignKey: 'propertyId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Apartment.hasMany(Room, { foreignKey: 'apartmentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Room.belongsTo(Apartment, { foreignKey: 'apartmentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Room.hasMany(Bed, { foreignKey: 'roomId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Bed.belongsTo(Room, { foreignKey: 'roomId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Room.hasMany(Listing, { foreignKey: 'roomId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Listing.belongsTo(Room, { foreignKey: 'roomId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Bed.hasMany(Listing, { foreignKey: 'bedId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Listing.belongsTo(Bed, { foreignKey: 'bedId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Listing.hasMany(Booking, { foreignKey: 'listingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Booking.belongsTo(Listing, { foreignKey: 'listingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasOne(OwnerBankAccount, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OwnerBankAccount.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasOne(TenantBankAccount, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
TenantBankAccount.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Booking.hasMany(Payment, { foreignKey: 'bookingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Booking.hasMany(Contract, { foreignKey: 'bookingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Contract.belongsTo(Booking, { foreignKey: 'bookingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Booking.hasMany(DepositDeduction, { foreignKey: 'bookingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DepositDeduction.belongsTo(Booking, { foreignKey: 'bookingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Payment, { foreignKey: 'payerUserId', as: 'PaymentsMade' });
Payment.belongsTo(User, { foreignKey: 'payerUserId', as: 'Payer' });
User.hasMany(Payment, { foreignKey: 'payeeUserId', as: 'PaymentsReceived' });
Payment.belongsTo(User, { foreignKey: 'payeeUserId', as: 'Payee' });

User.hasMany(Listing, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Listing.belongsTo(User, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Property, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Property.belongsTo(User, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Apartment, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Apartment.belongsTo(User, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Room, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Room.belongsTo(User, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Bed, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Bed.belongsTo(User, { foreignKey: 'createdByUserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

const SystemSetting = sequelize.define('SystemSetting', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  key: { type: DataTypes.STRING(80), allowNull: false, unique: true },
  value: { type: DataTypes.STRING(255), allowNull: false }
});

const ContactMessage = sequelize.define('ContactMessage', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150), allowNull: true },
  email: { type: DataTypes.STRING(150), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false }
});

module.exports = {
  sequelize,
  User,
  OwnerBankAccount,
  Property,
  Apartment,
  Room,
  Bed,
  Listing,
  Booking,
  KycVerification,
  Contract,
  TenantBankAccount,
  Payment,
  MaintenanceTicket,
  Expense,
  Chore,
  CommunityMessage,
  DepositDeduction,
  SystemSetting,
  ContactMessage
};
