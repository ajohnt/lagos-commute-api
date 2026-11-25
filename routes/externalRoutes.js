const express = require('express');
const router = express.Router();
const { geocode, getWeather } = require('../controllers/externalController');

router.get('/geocode', geocode);
router.get('/weather', getWeather);

module.exports = router;