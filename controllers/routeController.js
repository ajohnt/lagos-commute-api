const Route = require('../models/Route');
const sendTelegram = require('../utils/telegram');

exports.createRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);

    // AUTO ALERT: New route created
    await sendTelegram(
      `🆕 New Route Added: ${route.from} to ${route.to} - ₦${route.fare} (${route.transportMode || 'BRT'}) - ${route.duration || ''}`
    );

    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRoutes = async (req, res) => {
  try {
    const { from, to } = req.query;
    let filter = {};
    if (from) filter.from = new RegExp(from, 'i');
    if (to) filter.to = new RegExp(to, 'i');
    const routes = await Route.find(filter);
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchRoutes = async (req, res) => {
  try {
    const { from, to } = req.query;
    const routes = await Route.find({
      from: new RegExp(from, 'i'),
      to: new RegExp(to, 'i')
    });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE ROUTE BY ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ROUTE - WITH AUTO TELEGRAM ALERT
exports.updateRoute = async (req, res) => {
  try {
    // Get old fare before update so we can compare
    const oldRoute = await Route.findById(req.params.id);
    if (!oldRoute) return res.status(404).json({ message: 'Route not found' });

    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // AUTO ALERT: Only send if fare changed
    if (req.body.fare && req.body.fare !== oldRoute.fare) {
      await sendTelegram(
        `🚍 Fare Alert: ${route.from} to ${route.to} fare changed from ₦${oldRoute.fare} to ₦${route.fare} (${route.transportMode || 'BRT'})`
      );
    }

    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ROUTE - WITH AUTO TELEGRAM ALERT
exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    // AUTO ALERT: Route deleted
    await sendTelegram(
      `❌ Route Removed: ${route.from} to ${route.to} - ₦${route.fare} (${route.transportMode || 'BRT'}) is no longer available`
    );

    res.json({ message: 'Route deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// COMPARE ROUTES - Cheapest vs Fastest
exports.compareRoutes = async (req, res) => {
  try {
    const { from, to } = req.query;
    const routes = await Route.find({
      from: new RegExp(from, 'i'),
      to: new RegExp(to, 'i')
    });

    if (routes.length === 0) return res.json({ message: 'No routes found' });

    const cheapest = [...routes].sort((a, b) => a.fare - b.fare)[0];
    const fastest = [...routes].sort((a, b) => parseInt(a.duration) - parseInt(b.duration))[0];

    res.json({ total: routes.length, cheapest, fastest, all: routes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/fares?from=Ikeja&to=Yaba - Proposal requirement
exports.getFares = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ message: 'from and to query are required, e.g. ?from=Ikeja&to=Yaba' });

    const routes = await Route.find({
      from: new RegExp(from, 'i'),
      to: new RegExp(to, 'i')
    });

    if (routes.length === 0) return res.status(404).json({ message: 'No routes found for this journey' });

    // Return clean fare list as proposal expects
    const fares = routes.map(r => ({
      routeId: r._id,
      from: r.from,
      to: r.to,
      transportMode: r.transportMode,
      fare: r.fare,
      duration: r.duration,
      stops: r.stops || []
    }));

    const cheapest = fares.reduce((min, r) => r.fare < min.fare ? r : min, fares[0]);

    res.json({ from, to, total: fares.length, cheapest, fares });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};