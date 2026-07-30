CREATE DATABASE IF NOT EXISTS rents_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rents_app;

-- =========================
-- Core auth/users
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  mobileNumber VARCHAR(30) NULL,
  passwordHash VARCHAR(255) NOT NULL,
  role ENUM('TENANT', 'OWNER', 'ADMIN') NOT NULL DEFAULT 'TENANT',
  shortTermFee DECIMAL(10,2) NULL,
  longTermFee DECIMAL(10,2) NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ownerBankAccounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL UNIQUE,
  accountHolder VARCHAR(120) NOT NULL,
  iban VARCHAR(34) NOT NULL,
  bic VARCHAR(11) NOT NULL,
  editCount INT NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_owner_bank_accounts_user
    FOREIGN KEY (userId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- Property hierarchy
-- =========================
CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  createdByUserId INT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_properties_user
    FOREIGN KEY (createdByUserId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;
CREATE INDEX idx_properties_createdByUserId ON properties(createdByUserId);

CREATE TABLE IF NOT EXISTS apartments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  propertyId INT NOT NULL,
  code VARCHAR(50) NOT NULL,
  amenities JSON NOT NULL,
  imageUrls JSON NOT NULL,
  createdByUserId INT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_apartments_property
    FOREIGN KEY (propertyId) REFERENCES properties(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_apartments_user
    FOREIGN KEY (createdByUserId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_apartments_propertyId ON apartments(propertyId);
CREATE INDEX idx_apartments_createdByUserId ON apartments(createdByUserId);

CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  apartmentId INT NOT NULL,
  code VARCHAR(50) NOT NULL,
  capacity INT NOT NULL,
  inventoryMode ENUM('PRIVATE_ONLY', 'SHARED_ONLY', 'HYBRID') NOT NULL,
  furnishingStatus ENUM('FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED') NOT NULL,
  hasPrivateBathroom BOOLEAN DEFAULT FALSE,
  imageUrls JSON NOT NULL,
  createdByUserId INT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_rooms_apartment
    FOREIGN KEY (apartmentId) REFERENCES apartments(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_rooms_user
    FOREIGN KEY (createdByUserId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_rooms_apartmentId ON rooms(apartmentId);
CREATE INDEX idx_rooms_createdByUserId ON rooms(createdByUserId);

CREATE TABLE IF NOT EXISTS beds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomId INT NOT NULL,
  bedCode VARCHAR(50) NOT NULL,
  status ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE') NOT NULL,
  imageUrl VARCHAR(500) NULL,
  createdByUserId INT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_beds_room
    FOREIGN KEY (roomId) REFERENCES rooms(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_beds_user
    FOREIGN KEY (createdByUserId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_beds_roomId ON beds(roomId);
CREATE INDEX idx_beds_createdByUserId ON beds(createdByUserId);

-- =========================
-- Listings + bookings
-- =========================
CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomId INT NOT NULL,
  bedId INT NULL,
  listingType ENUM('ENTIRE_ROOM', 'SINGLE_BED', 'PRIVATE_ROOM_IN_SHARED_APT') NOT NULL,
  title VARCHAR(180) NOT NULL,
  imageUrl VARCHAR(500) NULL,
  imageUrls JSON NOT NULL,
  locationText VARCHAR(255) NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  rentType ENUM('WARM', 'COLD') NOT NULL,
  baseRent DECIMAL(10,2) NOT NULL,
  depositAmount DECIMAL(10,2) NOT NULL DEFAULT 0,
  cleaningCharge DECIMAL(10,2) NOT NULL DEFAULT 0,
  anmeldungAvailable BOOLEAN DEFAULT FALSE,
  internetIncluded BOOLEAN DEFAULT FALSE,
  electricityIncluded BOOLEAN DEFAULT FALSE,
  maintenanceIncluded BOOLEAN DEFAULT FALSE,
  heatingIncluded BOOLEAN DEFAULT FALSE,
  waterIncluded BOOLEAN DEFAULT FALSE,
  isActive BOOLEAN DEFAULT TRUE,
  createdByUserId INT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_listings_room
    FOREIGN KEY (roomId) REFERENCES rooms(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_listings_bed
    FOREIGN KEY (bedId) REFERENCES beds(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_listings_user
    FOREIGN KEY (createdByUserId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_listings_roomId ON listings(roomId);
CREATE INDEX idx_listings_bedId ON listings(bedId);
CREATE INDEX idx_listings_isActive ON listings(isActive);
CREATE INDEX idx_listings_createdByUserId ON listings(createdByUserId);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listingId INT NOT NULL,
  checkIn DATE NOT NULL,
  checkOut DATE NOT NULL,
  userId INT NULL,
  status ENUM('PENDING', 'OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  totalAmount DECIMAL(10,2) NOT NULL,
  paymentId VARCHAR(50) NULL,
  paymentMarkedAt DATETIME NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_bookings_listing
    FOREIGN KEY (listingId) REFERENCES listings(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_bookings_user
    FOREIGN KEY (userId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_bookings_listingId ON bookings(listingId);
CREATE INDEX idx_bookings_dates ON bookings(checkIn, checkOut);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_userId ON bookings(userId);

-- =========================
-- Compliance & operations
-- =========================
CREATE TABLE IF NOT EXISTS kycVerifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userType ENUM('TENANT', 'OWNER') NOT NULL,
  documentType ENUM('PASSPORT', 'NATIONAL_ID', 'PROPERTY_PROOF') NOT NULL,
  documentPath VARCHAR(255) NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bookingId INT NULL,
  leaseType ENUM('SHORT_TERM', 'LONG_TERM') NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  signedAt DATETIME NULL,
  status ENUM('DRAFT', 'SENT', 'SIGNED') NOT NULL DEFAULT 'DRAFT',
  tenantId INT NULL,
  ownerId INT NULL,
  tenantName VARCHAR(200) NULL,
  tenantAddress VARCHAR(500) NULL,
  ownerDetails JSON NULL,
  filePath VARCHAR(500) NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_contracts_booking
    FOREIGN KEY (bookingId) REFERENCES bookings(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_contracts_tenant
    FOREIGN KEY (tenantId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_contracts_owner
    FOREIGN KEY (ownerId) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS maintenanceTickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  photoPath VARCHAR(255) NULL,
  status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED') NOT NULL DEFAULT 'OPEN',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

-- =========================
-- Community tools
-- =========================
CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS chores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  assignedTo VARCHAR(120) NOT NULL,
  dueDate DATE NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS communityMessages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  authorName VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;
