// assets/main.js
import { getWeatherByCity } from "./api.js";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const cityNameEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const precipitationEl = document.getElementById("precipitation");
const forecastGrid = document.getElementById("forecastGrid");

async function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    error.textContent = "Por favor, digite o nome de uma cidade.";
    return;
  }

  weatherInfo.style.display = "none";
  loading.style.display = "block";
  error.textContent = "";

  try {
    const data = await getWeatherByCity(city);

    const current = data.current || {};

    cityNameEl.textContent = data.city;
    temperatureEl.textContent = current.temperature_2m
      ? `${current.temperature_2m.toFixed(1)}°C`
      : "N/A";
    feelsLikeEl.textContent = current.apparent_temperature
      ? `${current.apparent_temperature.toFixed(1)}°C`
      : "N/A";
    humidityEl.textContent = current.relative_humidity_2m
      ? `${current.relative_humidity_2m}%`
      : "N/A";
    windSpeedEl.textContent = current.wind_speed_10m
      ? `${current.wind_speed_10m.toFixed(1)} km/h`
      : "N/A";
    precipitationEl.textContent = current.precipitation
      ? `${current.precipitation.toFixed(1)} mm`
      : "N/A";

    // Previsão de 7 dias
    forecastGrid.innerHTML = "";
    const days = data.daily.time || [];
    const maxTemp = data.daily.temperature_2m_max || [];
    const minTemp = data.daily.temperature_2m_min || [];

    days.forEach((day, i) => {
      const date = new Date(day);
      const formatted = date.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      });

      const card = document.createElement("div");
      card.classList.add("forecast-day");
      card.innerHTML = `<h3>${formatted}</h3><p>🌡️ ${minTemp[i]?.toFixed(1) || "N/A"}°C - ${maxTemp[i]?.toFixed(1) || "N/A"}°C</p>`;
      forecastGrid.appendChild(card);
    });

    loading.style.display = "none";
    weatherInfo.style.display = "block";
  } catch (err) {
    loading.style.display = "none";
    error.textContent = err.message;
  }
}

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});


