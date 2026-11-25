const express = require('express');
const router = express.Router();
const { createReport, getApprovedReports, getAllReports, approveReport, rejectReport } = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.post('/', auth, createReport);
router.get('/', getApprovedReports);
router.get('/all', auth, getAllReports);
router.patch('/:id/approve', auth, approveReport);
router.patch('/:id/reject', auth, rejectReport);

module.exports = router;