/**
 * @fileoverview Previsão do tempo com temperatura, umidade, vento, precipitação e máximas/mínimas.
 */

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const messageEl = document.getElementById("message");
const cardRoot = document.getElementById("card-root");

/** Formata data e hora atual */
function formatarDataHora() {
  const agora = new Date();
  return agora.toLocaleString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Ícone do clima baseado no código da API */
function getWeatherIcon(weatherCode) {
  const icons = {
    0: "wi-day-sunny",
    1: "wi-day-sunny-overcast",
    2: "wi-day-cloudy",
    3: "wi-cloudy",
    45: "wi-fog",
    48: "wi-fog",
    51: "wi-sprinkle",
    61: "wi-rain",
    71: "wi-snow",
    95: "wi-thunderstorm",
    99: "wi-storm-showers",
  };
  return icons[weatherCode] || "wi-na";
}

/** Evento principal */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    messageEl.style.color = "red";
    messageEl.textContent = "Por favor, digite o nome de uma cidade.";
    return;
  }

  messageEl.style.color = "#1b4b91";
  messageEl.textContent = "Buscando dados...";

  try {
    // Buscar coordenadas
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=pt&format=json`;
    const geoResp = await fetch(geoUrl);
    if (!geoResp.ok) throw new Error("Falha na API de geocodificação.");
    const geoData = await geoResp.json();
    if (!geoData.results || geoData.results.length === 0)
      throw new Error("Cidade não encontrada. Verifique o nome e tente novamente.");

    const { latitude, longitude, name, country } = geoData.results[0];

    // Buscar clima atual e diário
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    const weatherResp = await fetch(weatherUrl);
    if (!weatherResp.ok) throw new Error("Falha ao buscar dados meteorológicos.");
    const weatherData = await weatherResp.json();

    if (!weatherData.current)
      throw new Error("Dados de clima indisponíveis para essa localização.");

    const { temperature_2m, weathercode, relative_humidity_2m, precipitation, windspeed_10m } =
      weatherData.current;

    const maxTemp = weatherData.daily?.temperature_2m_max?.[0] ?? "--";
    const minTemp = weatherData.daily?.temperature_2m_min?.[0] ?? "--";

    const iconClass = getWeatherIcon(weathercode);
    const descricao = {
      0: "Céu limpo",
      1: "Poucas nuvens",
      2: "Parcialmente nublado",
      3: "Nublado",
      45: "Neblina",
      48: "Neblina",
      51: "Garoa",
      61: "Chuva leve",
      71: "Neve",
      95: "Tempestade",
      99: "Chuva forte com trovões",
    }[weathercode] || "Condição desconhecida";

    const dataHora = formatarDataHora();

    // Atualiza o card com fundo branco
    cardRoot.innerHTML = `
      <div class="weather-card">
        <div class="weather-temp-box">
          <i class="wi ${iconClass} weather-icon"></i>
          <div class="weather-temp">${Math.round(temperature_2m)}°C</div>
          <div class="weather-minmax">Máx: ${Math.round(maxTemp)}°C | Mín: ${Math.round(minTemp)}°C</div>
        </div>
        <div class="weather-city">${name}, ${country}</div>
        <div class="weather-desc">${descricao}</div>
        <div class="weather-date">${dataHora}</div>

        <div class="weather-extra">
          <div>
            <i class="wi wi-humidity"></i>
            <span>${relative_humidity_2m ?? "--"}%</span>
            <small>Umidade</small>
          </div>
          <div>
            <i class="wi wi-strong-wind"></i>
            <span>${windspeed_10m ?? "--"} km/h</span>
            <small>Vento</small>
          </div>
          <div>
            <i class="wi wi-raindrop"></i>
            <span>${precipitation ?? "0"} mm</span>
            <small>Precipitação</small>
          </div>
        </div>
      </div>
    `;

    messageEl.textContent = "";
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = error.message || "Erro desconhecido. Verifique sua conexão.";
  }
});













































