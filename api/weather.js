export default async function handler(req, res) {
  const { q, lat, lon, units = 'metric' } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}`;

  if (q) url += `&q=${q}`;
  else if (lat && lon) url += `&lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // DEBUG: Log the API response in your Vercel logs/terminal
    console.log('OWM Response:', JSON.stringify(data));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
}
