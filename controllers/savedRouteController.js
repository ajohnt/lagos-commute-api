const SavedRoute = require('../models/SavedRoute');

// POST /api/saved-routes - Save a route
exports.saveRoute = async (req, res) => {
  try {
    const { routeId } = req.body;
    if (!routeId) return res.status(400).json({ message: 'routeId is required' });

    const saved = await SavedRoute.create({
      user: req.user.id,
      route: routeId
    });

    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Route already saved' });
    res.status(500).json({ error: err.message });
  }
};

// GET /api/saved-routes - Get my saved routes
exports.getMySavedRoutes = async (req, res) => {
  try {
    const saved = await SavedRoute.find({ user: req.user.id })
      .populate('route')
      .sort({ savedAt: -1 });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/saved-routes/:id - Unsave a route
exports.unsaveRoute = async (req, res) => {
  try {
    const deleted = await SavedRoute.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!deleted) return res.status(404).json({ message: 'Saved route not found' });
    res.json({ message: 'Route unsaved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};