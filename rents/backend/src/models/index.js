const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  mobileNumber: { type: DataTypes.STRING(30), allowNull: true },
  passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('TENANT', 'OWNER', 'ADMIN'), allowNull: false, defaultValue: 'TENANT' }
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
  amenities: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  imageUrls: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  createdByUserId: { type: DataTypes.INTEGER, allowNull: true }
});

const Room = sequelize.define('Room', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(50), allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 3 } },
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
  baseRent: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
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
  paymentMarkedAt: { type: DataTypes.DATE, allowNull: true }
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
  leaseType: { type: DataTypes.ENUM('SHORT_TERM', 'LONG_TERM'), allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  signedAt: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.ENUM('DRAFT', 'SENT', 'SIGNED'), allowNull: false, defaultValue: 'DRAFT' }
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

Property.hasMany(Apartment, { foreignKey: 'propertyId' });
Apartment.belongsTo(Property, { foreignKey: 'propertyId' });

Apartment.hasMany(Room, { foreignKey: 'apartmentId' });
Room.belongsTo(Apartment, { foreignKey: 'apartmentId' });

Room.hasMany(Bed, { foreignKey: 'roomId' });
Bed.belongsTo(Room, { foreignKey: 'roomId' });

Room.hasMany(Listing, { foreignKey: 'roomId' });
Listing.belongsTo(Room, { foreignKey: 'roomId' });

Bed.hasMany(Listing, { foreignKey: 'bedId' });
Listing.belongsTo(Bed, { foreignKey: 'bedId' });

Listing.hasMany(Booking, { foreignKey: 'listingId' });
Booking.belongsTo(Listing, { foreignKey: 'listingId' });
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Listing, { foreignKey: 'createdByUserId' });
Listing.belongsTo(User, { foreignKey: 'createdByUserId' });
User.hasMany(Property, { foreignKey: 'createdByUserId' });
Property.belongsTo(User, { foreignKey: 'createdByUserId' });
User.hasMany(Apartment, { foreignKey: 'createdByUserId' });
Apartment.belongsTo(User, { foreignKey: 'createdByUserId' });
User.hasMany(Room, { foreignKey: 'createdByUserId' });
Room.belongsTo(User, { foreignKey: 'createdByUserId' });
User.hasMany(Bed, { foreignKey: 'createdByUserId' });
Bed.belongsTo(User, { foreignKey: 'createdByUserId' });

module.exports = {
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
};
