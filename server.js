const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// SERVE FRONTEND - This must be before app.get('/')
app.use(express.static('public'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Lagos Commute API is working' });
});

const routeRoutes = require('./routes/routeRoutes');
const { getFares } = require('./controllers/routeController');
app.use('/api/routes', routeRoutes);

// --- PROPOSAL ALIASES ---
// Proposal wants GET /api/fares?from=X&to=Y (not /api/routes/fares)
app.get('/api/fares', getFares);
// Proposal wants /api/admin/routes for POST/PUT/DELETE
app.use('/api/admin/routes', routeRoutes);
// Proposal wants PATCH /api/admin/reports/:id/approve
app.use('/api/admin/reports', require('./routes/reportRoutes'));

app.use('/api/saved-routes', require('./routes/savedRouteRoutes'));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use('/api/reports', require('./routes/reportRoutes'));

app.use('/api', require('./routes/externalRoutes'));

app.use('/api/alerts', require('./routes/telegramRoutes'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));