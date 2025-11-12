const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cardRoot = document.getElementById("card-root");
const messageEl = document.getElementById("message");

// Função auxiliar: formata data e hora completas
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

// Função auxiliar: define ícone de clima de acordo com o código da API
function getWeatherIcon(weatherCode) {
  const icons = {
    0: "wi-day-sunny", // céu limpo
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

// Função auxiliar: muda cor do fundo conforme horário
function aplicarTemaPorHorario() {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 18) {
    document.body.style.background = "linear-gradient(to bottom, #78c0f8, #cce7ff)";
  } else {
    document.body.style.background = "linear-gradient(to bottom, #0a2342, #1c3b64)";
  }
}

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
  aplicarTemaPorHorario();

  try {
    // 1️⃣ Buscar coordenadas
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=pt&format=json`;

    const geoResp = await fetch(geoUrl);
    if (!geoResp.ok) throw new Error("Falha na API de geocodificação.");
    const geoData = await geoResp.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Cidade não encontrada. Verifique o nome e tente novamente.");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Buscar dados meteorológicos
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResp = await fetch(weatherUrl);
    if (!weatherResp.ok) throw new Error("Falha ao buscar dados meteorológicos.");

    const weatherData = await weatherResp.json();
    if (!weatherData.current_weather) {
      throw new Error("Dados de clima indisponíveis para essa localização.");
    }

    const { temperature, weathercode, time } = weatherData.current_weather;

    // 3️⃣ Ícone e descrição do clima
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

    // 4️⃣ Data e hora formatadas
    const dataHora = formatarDataHora();

    // 5️⃣ Renderizar resultado no card
    cardRoot.innerHTML = `
      <div class="weather-card">
        <div class="weather-temp-box">
          <i class="wi ${iconClass} weather-icon"></i>
          <div class="weather-temp">${Math.round(temperature)}°C</div>
        </div>
        <div class="weather-city">${name}, ${country}</div>
        <div class="weather-desc">${descricao}</div>
        <div class="weather-date">${dataHora}</div>
      </div>
    `;
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = error.message || "Erro desconhecido. Verifique sua conexão.";
  }
});





































