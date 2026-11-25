const Report = require('../models/Report');

// POST /api/reports - User creates report
exports.createReport = async (req, res) => {
  try {
    const { routeId, type, message, location } = req.body;
    const report = await Report.create({
      user: req.user.id,
      route: routeId,
      type,
      message,
      location
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/reports - Get approved reports (public)
exports.getApprovedReports = async (req, res) => {
  try {
    const reports = await Report.find({ status: 'approved' })
      .populate('route', 'name from to fare')
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/reports/all - Admin gets all reports (pending + approved + rejected)
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('route', 'name from to')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/reports/:id/approve - Admin approves
exports.approveReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/reports/:id/reject - Admin rejects
exports.rejectReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};