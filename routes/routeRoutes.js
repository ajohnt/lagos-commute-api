const express = require('express');
const router = express.Router();
const { createRoute, getRoutes, searchRoutes, getRouteById, updateRoute, deleteRoute, compareRoutes } = require('../controllers/routeController');
const auth = require('../middleware/auth');

router.post('/', auth, createRoute);
router.get('/', getRoutes);
router.get('/search', searchRoutes);
router.get('/compare', compareRoutes);
router.get('/:id', getRouteById);
router.put('/:id', auth, updateRoute);
router.delete('/:id', auth, deleteRoute);

module.exports = router;