export async function getWeatherByCity(city) {
  if (!city || typeof city !== "string") {
    throw new Error("Por favor, digite o nome de uma cidade.");
  }

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
  );
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Cidade não encontrada.");
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
  );
  const weatherData = await weatherRes.json();

  return {
    city: `${name}, ${country}`,
    current: weatherData.current,
    daily: weatherData.daily,
  };
}



