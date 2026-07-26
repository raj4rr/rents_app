# RentStack Inventory (React + Node + MySQL)

**Website:** [https://rentstackinventory.com/](https://rentstackinventory.com/)

Full-stack starter for:
- Property > Apartment > Room > Bed hierarchy
- Private room and shared bed booking modes
- Dynamic inventory mode toggles (PRIVATE_ONLY / SHARED_ONLY / HYBRID)
- Furnishing and utility transparency filters
- Anmeldung, KYC upload, digital contract endpoints
- Occupancy map, maintenance ticketing, expense/chore/chat modules

## Project Structure
- `/Users/rajesh/Documents/rents/backend` - Express + Sequelize + MySQL APIs
- `/Users/rajesh/Documents/rents/frontend` - React (Vite) UI

## Backend Setup
1. Copy env:
   - `cp /Users/rajesh/Documents/rents/backend/.env.example /Users/rajesh/Documents/rents/backend/.env`
2. Create DB and tables:
   - Run `/Users/rajesh/Documents/rents/backend/sql/schema.sql` in MySQL.
3. Start backend:
   - `cd /Users/rajesh/Documents/rents/backend && npm run dev`

4. Load sample data (optional but recommended):
   - `cd /Users/rajesh/Documents/rents/backend && npm run seed`

## Frontend Setup
1. Copy env:
   - `cp /Users/rajesh/Documents/rents/frontend/.env.example /Users/rajesh/Documents/rents/frontend/.env`
2. Start frontend:
   - `cd /Users/rajesh/Documents/rents/frontend && npm run dev`

## Key API Endpoints
- `POST /api/properties`
- `POST /api/apartments`
- `POST /api/rooms`
- `PATCH /api/rooms/:id/inventory-mode`
- `POST /api/beds`
- `POST /api/listings`
- `GET /api/listings`
- `POST /api/bookings/quote`
- `POST /api/bookings/confirm`
- `GET /api/admin/occupancy-map`
- `POST /api/kyc/upload`
- `POST /api/contracts/generate`
- `POST /api/maintenance/tickets`
- `GET/POST /api/expenses`
- `GET/POST /api/chores`
- `GET/POST /api/community/messages`

## Notes
- Booking conflicts are handled for room-level vs bed-level overlaps in `/api/bookings/confirm`.
- Billing reminder job skeleton runs daily via `node-cron`.
- File uploads for KYC and maintenance photos are stored in `/Users/rajesh/Documents/rents/backend/uploads`.
