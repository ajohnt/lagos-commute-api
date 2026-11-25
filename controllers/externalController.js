// GET /api/geocode?address=Ikeja
exports.geocode = async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) return res.status(400).json({ message: 'address query is required' });

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address + ', Lagos, Nigeria')}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'LagosCommutePlanner/1.0' }
    });
    const data = await response.json();

    if (!data.length) return res.status(404).json({ message: 'Location not found' });

    res.json({
      address: data[0].display_name,
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/weather?area=Ikeja
exports.getWeather = async (req, res) => {
  try {
    const { area } = req.query;
    if (!area) return res.status(400).json({ message: 'area query is required' });

    // Step 1: Get coordinates from Nominatim
    const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(area + ', Lagos, Nigeria')}&format=json&limit=1`;
    const geoRes = await fetch(geoUrl, {
      headers: { 'User-Agent': 'LagosCommutePlanner/1.0' }
    });
    const geoData = await geoRes.json();
    if (!geoData.length) return res.status(404).json({ message: 'Area not found' });

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // Step 2: Get weather from Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code,wind_speed_10m`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const temp = weatherData.current.temperature_2m;
    const rain = weatherData.current.precipitation;
    const code = weatherData.current.weather_code;

    let advice = 'Clear weather, good for travel';
    if (rain > 0) advice = `Rain in ${area}, expect delay`;
    else if (code >= 51 && code <= 67) advice = `Rain in ${area}, expect delay`;
    else if (code >= 95) advice = `Thunderstorm in ${area}, avoid travel if possible`;

    res.json({
      area,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      temperature: temp,
      precipitation: rain,
      weather_code: code,
      advice
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};