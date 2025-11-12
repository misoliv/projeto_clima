// Função principal para buscar e exibir o clima
document.getElementById("weather-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const city = document.getElementById("city-input").value.trim();
  const resultDiv = document.getElementById("weather-result");
  
  if (!city) {
    resultDiv.textContent = "Por favor, digite o nome de uma cidade.";
    return;
  }

  resultDiv.textContent = "Buscando dados...";

  try {
    // 1️⃣ Obter coordenadas da cidade usando API Open-Meteo Geocoding
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.textContent = "Cidade não encontrada. Tente novamente.";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Consultar clima atual
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    // 3️⃣ Exibir resultado formatado
    resultDiv.innerHTML = `
      <strong>${name}, ${country}</strong><br>
      🌡️ Temperatura: ${temp}°C<br>
      💨 Vento: ${wind} km/h
    `;

  } catch (error) {
    console.error(error);
    resultDiv.textContent = "Erro ao obter os dados. Verifique sua conexão.";
  }
});




























