const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");

// Função principal de busca
async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Por favor, digite o nome de uma cidade.");
    return;
  }

  hideError();
  loading.style.display = "block";
  weatherInfo.style.display = "none";

  try {
    // 1️⃣ Obter coordenadas da cidade (API Geocoding)
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Cidade não encontrada.");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Buscar dados do clima
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // 3️⃣ Atualizar interface
    const temp = weatherData.current.temperature_2m;
    const code = weatherData.current.weathercode;

    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = `${temp}°C`;
    condition.textContent = getWeatherDescription(code);

    weatherInfo.style.display = "block";
  } catch (err) {
    showError(err.message || "Erro ao obter dados do clima.");
  } finally {
    loading.style.display = "none";
  }
}

// Descrição simples do código meteorológico
function getWeatherDescription(code) {
  const descriptions = {
    0: "Céu limpo ☀️",
    1: "Parcialmente nublado 🌤️",
    2: "Nublado ⛅",
    3: "Nuvens densas ☁️",
    45: "Neblina 🌫️",
    48: "Nevoeiro 🌫️",
    51: "Garoa 💧",
    61: "Chuva leve 🌦️",
    63: "Chuva moderada 🌧️",
    65: "Chuva forte ⛈️",
  };
  return descriptions[code] || "Condição desconhecida";
}

// Funções de erro
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function hideError() {
  errorMsg.style.display = "none";
}

// Eventos
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});


