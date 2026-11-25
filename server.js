const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Lagos Commute API is working' });
});

const routeRoutes = require('./routes/routeRoutes');
app.use('/api/routes', routeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Lagos Commute Planner API is running' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));

  const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);