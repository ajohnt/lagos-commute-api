const mongoose = require('mongoose');

const savedRouteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  savedAt: { type: Date, default: Date.now }
});

// Prevent saving same route twice
savedRouteSchema.index({ user: 1, route: 1 }, { unique: true });

module.exports = mongoose.model('SavedRoute', savedRouteSchema);