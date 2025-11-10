// Seletores principais
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

// Função principal
async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        error.textContent = "Por favor, digite o nome de uma cidade.";
        return;
    }

    // Reset
    weatherInfo.style.display = "none";
    error.textContent = "";
    loading.style.display = "block";

    try {
        // 1️⃣ Buscar latitude e longitude da cidade (API de Geocodificação Open-Meteo)
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Cidade não encontrada.");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2️⃣ Buscar dados meteorológicos (API de Previsão Open-Meteo)
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
        );
        const weatherData = await weatherRes.json();

        // 3️⃣ Exibir informações atuais
        const current = weatherData.current;
        cityNameEl.textContent = `${name}, ${country}`;
        temperatureEl.textContent = `${current.temperature_2m.toFixed(1)}°C`;
        feelsLikeEl.textContent = `${current.apparent_temperature.toFixed(1)}°C`;
        humidityEl.textContent = `${current.relative_humidity_2m}%`;
        windSpeedEl.textContent = `${current.wind_speed_10m.toFixed(1)} km/h`;
        precipitationEl.textContent = `${current.precipitation.toFixed(1)} mm`;

        // 4️⃣ Montar previsão de 7 dias
        const days = weatherData.daily.time;
        const maxTemp = weatherData.daily.temperature_2m_max;
        const minTemp = weatherData.daily.temperature_2m_min;

        forecastGrid.innerHTML = "";
        days.forEach((day, i) => {
            const date = new Date(day);
            const options = { weekday: "short", day: "2-digit", month: "2-digit" };
            const formatted = date.toLocaleDateString("pt-BR", options);

            const card = document.createElement("div");
            card.classList.add("forecast-day");
            card.innerHTML = `
                <h3>${formatted}</h3>
                <p>🌡️ ${minTemp[i].toFixed(1)}°C - ${maxTemp[i].toFixed(1)}°C</p>
            `;
            forecastGrid.appendChild(card);
        });

        // Exibir na tela
        loading.style.display = "none";
        weatherInfo.style.display = "block";
    } catch (err) {
        loading.style.display = "none";
        error.textContent = err.message || "Erro ao buscar dados do clima.";
    }
}

// Evento do botão
searchBtn.addEventListener("click", getWeather);

// Pressionar Enter também busca
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});

