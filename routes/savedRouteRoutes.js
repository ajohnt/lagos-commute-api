const express = require('express');
const router = express.Router();
const { saveRoute, getMySavedRoutes, unsaveRoute } = require('../controllers/savedRouteController');
const auth = require('../middleware/auth');

router.post('/', auth, saveRoute);
router.get('/', auth, getMySavedRoutes);
router.delete('/:id', auth, unsaveRoute);

module.exports = router;