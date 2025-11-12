const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cardRoot = document.getElementById("card-root");
const messageEl = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    messageEl.textContent = "Por favor, digite o nome de uma cidade.";
    return;
  }

  messageEl.style.color = "#1b4b91";
  messageEl.textContent = "Buscando dados...";

  try {
    // 1️⃣ Buscar coordenadas da cidade
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=pt&format=json`;

    const geoResp = await fetch(geoUrl);
    const geoData = await geoResp.json();

    if (!geoData.results || geoData.results.length === 0) {
      messageEl.style.color = "red";
      messageEl.textContent = "Cidade não encontrada. Tente novamente.";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Buscar clima atual
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResp = await fetch(weatherUrl);
    const weatherData = await weatherResp.json();

    if (!weatherData.current_weather) {
      messageEl.style.color = "red";
      messageEl.textContent = "Não foi possível obter o clima atual.";
      return;
    }

    const temp = Math.round(weatherData.current_weather.temperature);

    // 3️⃣ Exibir card de resultado sem quebrar o layout
    cardRoot.innerHTML = `
      <div class="weather-card">
        <div class="weather-temp-box">
          <div class="weather-temp">${temp}°</div>
        </div>
        <div class="weather-city">${name}, ${country}</div>
        <div class="weather-icon">🏠</div>
      </div>
    `;
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = "Erro ao obter dados. Verifique sua conexão.";
  }
});


































