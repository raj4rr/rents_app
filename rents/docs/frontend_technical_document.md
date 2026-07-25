# RentStack Frontend Technical Documentation

This document outlines the frontend page architectures, state hooks, layout integrations, and UI custom components implemented for the RentStack room inventory app.

## 1. System Overview
The frontend is built using **Vite**, **React**, and **React Router**. Styled entirely using vanilla CSS rules, it leverages responsive layouts (flexbox & grid columns) to build dashboards and booking flows for owners and tenants.

---

## 2. Page Components & State Integrations

### A. Profile & Legal Verification (`ProfilePage.jsx`)
Coordinates user identity info, files, and bank details.
* **Basic Information**: Form updating standard fields (Full Name, Father's Name, DOB, etc.) via `PATCH /api/me/profile`.
* **Identity & Legal Verification**: Form uploading files (`photoWithPassport`, `passport`, `residenceProof`, `signature`) via `POST /api/me/profile/upload`.
  * *Interactive Preview Modals*: "View Sample" inline links display standard 3D AI-rendered guidelines inside a custom blur-backdrop lightbox overlay.
* **Payment Account Panel**: Exposes IBAN, BIC, and Account Holder forms.
  * Role-based endpoints:
    * Owners hit `/owner/bank-account` (locked after 1 modification count, warning: *"This payout account has already been modified once and is locked. Contact support for updates."*).
    * Tenants hit `/me/bank-account` (unlimited modifications allowed).

---

### B. Booking Details & Deposit Refunds (`BookingPaymentPage.jsx`)
Manages transactions and deposit returns.
* **Payment Account details display**: Displays the tenant's refund account details and the initial deposit amount.
* **Deposit Deduction list**: Iterates over `bookingInfo.DepositDeductions || []` in real-time, listing each cut amount, description reason, and a link to view uploaded damage evidence images.
* **Log Damage Deduction form (Landlord View)**:
  * Includes quick-selection buttons for suggested reasons (*"Deep Cleaning Fee"*, *"Key Loss Replacement"*, *"Wall Scratch/Painting"*, *"Furniture Repair"*).
  * Auto-uploads evidence photos using the generic `/api/uploads/images` upload handler.
  * Submits values to `/api/owner/bookings/:bookingId/deduct-deposit`.
  * Computes and displays the dynamically recalculated **Net Refund Owed** to the tenant.

---

### C. Booking Walkthrough Slideshow (`HowItWorksPage.jsx`)
An interactive onboarding manual displaying the complete coliving booking process step-by-step:
* **Slides & Subtitles**:
  * Step 1: *Browse & Filter Vetted Rooms*
  * Step 2: *Submit Booking Request*
  * Step 3: *Complete Profile Verification*
  * Step 4: *Pay Rent & Platform Fees*
  * Step 5: *Lease Agreement & Final Confirmation*
* **Playback Controls**:
  * Autoplay timer changing slides every 4.5 seconds.
  * Play / Pause toggle icon button.
  * Manual Next & Previous control buttons.
  * Visual progress bar indicating percentage completion.

---

## 3. General Layout & Styling Rules
* **Header & Navigation**: Exposes **"How It Works"** and **"Entry & Booking Management"** links.
* **Trust Badging**: Listings cards and details display a green shield badge rotating quotes about vetted, trusted listings.
* **Login Form (`LoginPage.jsx`)**: Contains a secondary redirect button labeled **"🏠 Go to Home"** for users to return easily to listings.
