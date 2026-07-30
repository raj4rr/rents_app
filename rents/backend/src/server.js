const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const { sequelize, Booking } = require('./models');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

// Strict Custom Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; frame-ancestors 'none';");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

app.get('/health', (_req, res) => res.json({ ok: true }));

cron.schedule('0 10 * * *', async () => {
  const overdue = await Booking.findAll({ where: { status: 'CONFIRMED' } });
  console.log(`[BillingJob] ${overdue.length} active bookings checked for reminders`);
});

// Auto-Confirm Bookings 10 minutes after payment receipt is logged by landlord
cron.schedule('*/1 * * * *', async () => {
  try {
    const { Op } = require('sequelize');
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const bookingsToConfirm = await Booking.findAll({
      where: {
        status: 'PAYMENT_RECEIVED',
        paymentMarkedAt: {
          [Op.lte]: tenMinutesAgo
        }
      }
    });

    if (bookingsToConfirm.length > 0) {
      console.log(`[AutoConfirmJob] Found ${bookingsToConfirm.length} bookings to auto-confirm.`);
      for (const booking of bookingsToConfirm) {
        booking.status = 'CONFIRMED';
        await booking.save();
        console.log(`[AutoConfirmJob] Auto-confirmed Booking ID: ${booking.id}`);
      }
    }
  } catch (err) {
    console.error('[AutoConfirmJob] Error running auto-confirm cron job:', err.message);
  }
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(async () => {
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

  try {
    const { SystemSetting } = require('./models');
    await SystemSetting.findOrCreate({
      where: { key: 'SHORT_TERM_FEE' },
      defaults: { value: '10' }
    });
    await SystemSetting.findOrCreate({
      where: { key: 'LONG_TERM_FEE' },
      defaults: { value: '50' }
    });
    console.log('✓ System default settings verified & loaded.');
  } catch (err) {
    console.error('System settings seeding failed:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB connection failed:', err.message);
});
