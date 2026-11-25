const express = require('express');
const router = express.Router();
const { sendTelegramAlert } = require('../controllers/telegramController');
const auth = require('../middleware/auth');

router.post('/telegram', auth, sendTelegramAlert);

module.exports = router;