const express = require('express');
const router = express.Router();
const { createRoute, getRoutes, searchRoutes } = require('../controllers/routeController');
const auth = require('../middleware/auth');

router.post('/', auth, createRoute);
router.get('/', getRoutes);
router.get('/search', searchRoutes);

module.exports = router;