# RentStack Backend Technical Documentation

This document outlines the backend architecture, database schemas, and REST API endpoints implemented for the RentStack room inventory and lease management system.

## 1. System Overview
The backend is built using **Node.js**, **Express**, and **Sequelize ORM** with SQLite/Postgres. It manages the property hierarchy (Property → Apartment → Room → Bed), user credentials, KYC audits, bank routing, booking states, contract generation, and security deposit deductions.

---

## 2. Database Models & Schema Updates

### A. Bank Account Routing Models
We separate landlord payout credentials from tenant refund bank details to support distinct permission structures.

#### `OwnerBankAccount`
Stores bank accounts for **OWNERS** to receive direct rent and deposit transfers.
* `id` (INTEGER, Primary Key, Auto-increment)
* `userId` (INTEGER, Foreign Key referencing `User.id`)
* `accountHolder` (STRING, Required)
* `iban` (STRING, Required)
* `bic` (STRING, Required)
* `editCount` (INTEGER, Default: 0) — Tracks modifications. Limited to at most 1 update in the API controller.

#### `TenantBankAccount`
Stores bank details for **TENANTS** to receive security deposit refunds or utilities returns.
* `id` (INTEGER, Primary Key, Auto-increment)
* `userId` (INTEGER, Foreign Key referencing `User.id`)
* `accountHolder` (STRING, Required)
* `iban` (STRING, Required)
* `bic` (STRING, Required)
* (Edits are unlimited for Tenants to ensure they can adjust details prior to stay completion).

---

### B. Booking & Deposit Deductions Models

#### `Booking`
Tracks reservations and stay configurations.
* `id` (INTEGER, Primary Key)
* `status` (ENUM: `'PENDING'`, `'OWNER_APPROVED'`, `'PAYMENT_RECEIVED'`, `'CONFIRMED'`, `'CHECKED_IN'`, `'COMPLETED'`, `'CANCELLED'`)
* `totalAmount` (DECIMAL)
* `paymentId` (STRING) — Shared code generated upon payment verification.

#### `DepositDeduction`
Tracks individual damages or cleaning charges deducted from a tenant's security deposit. Supports multiple concurrent deductions.
* `id` (INTEGER, Primary Key, Auto-increment)
* `bookingId` (INTEGER, Foreign Key referencing `Booking.id`)
* `amount` (DECIMAL, Required)
* `reason` (STRING, Required) — e.g. "Key Loss Replacement", "Deep Cleaning"
* `evidenceUrl` (STRING) — Absolute path to uploaded damage photo

---

## 3. Database Associations
Defined inside `/backend/src/models/index.js`:
```javascript
User.hasOne(OwnerBankAccount, { foreignKey: 'userId', onDelete: 'CASCADE' });
OwnerBankAccount.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(TenantBankAccount, { foreignKey: 'userId', onDelete: 'CASCADE' });
TenantBankAccount.belongsTo(User, { foreignKey: 'userId' });

Booking.hasMany(DepositDeduction, { foreignKey: 'bookingId', onDelete: 'CASCADE' });
DepositDeduction.belongsTo(Booking, { foreignKey: 'bookingId' });
```

---

## 4. REST API Endpoints Reference

### A. Bank Account Management
* **`GET /api/owner/bank-account`** (Requires Owner/Admin)
  * Returns: `{ account, canEdit }` where `canEdit` is false if the owner already updated their account once (`editCount >= 1`).
* **`PUT /api/owner/bank-account`** (Requires Owner/Admin)
  * Updates account. Increments `editCount` by 1. Rejects with `400` if edit limit is exceeded.
* **`GET /api/me/bank-account`** (Requires Authenticated User)
  * Returns the logged-in tenant's bank details.
* **`PUT /api/me/bank-account`** (Requires Authenticated User)
  * Creates or updates the tenant's bank refund account (unlimited edits allowed).

### B. Booking & Damage Deductions
* **`GET /api/owner/bookings`** (Requires Owner/Admin)
  * Returns list of bookings for the owner's listings. Includes the tenant's `TenantBankAccount` and `DepositDeductions` array.
* **`GET /api/me/bookings/:id`** (Requires Authenticated User)
  * Returns booking details. Includes Listing, Room, Bed, Owner details (with `OwnerBankAccount`), Tenant details (with `TenantBankAccount`), and the `DepositDeductions` array.
* **`POST /api/owner/bookings/:id/deduct-deposit`** (Requires Owner/Admin)
  * Logs a new damage deduction.
  * Body: `{ amount, reason, evidenceUrl }`
  * Validates that the sum of existing deductions + the new deduction amount does not exceed the total security deposit.
  * Returns the updated booking object.
