const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  stops: [String],
  fare: { type: Number, required: true },
  duration: String,
  transportType: { type: String, enum: ['bus', 'keke', 'danfo', 'brt'], default: 'bus' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);