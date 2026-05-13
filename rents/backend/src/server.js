const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const { sequelize, Booking } = require('./models');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

app.get('/health', (_req, res) => res.json({ ok: true }));

cron.schedule('0 10 * * *', async () => {
  const overdue = await Booking.findAll({ where: { status: 'CONFIRMED' } });
  console.log(`[BillingJob] ${overdue.length} active bookings checked for reminders`);
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB connection failed:', err.message);
});
