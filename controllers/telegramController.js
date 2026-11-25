// POST /api/alerts/telegram - Send test alert
exports.sendTelegramAlert = async (req, res) => {
  try {
    const { message } = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ message: 'Telegram not configured in .env' });
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message || '🚍 Test Alert: Lagos Commute Planner is working!'
      })
    });

    const data = await response.json();
    if (!data.ok) return res.status(500).json({ error: data });

    res.json({ success: true, message: 'Telegram alert sent!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};