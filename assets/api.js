/**
 * Busca os dados meteorológicos de uma cidade usando a API Open-Meteo.
 *
 * A função realiza duas chamadas de API:
 * 1. Geocodificação: obtém latitude e longitude da cidade.
 * 2. Previsão do tempo: obtém dados horários e diários do clima.
 * 
 * Retorna os dados atuais do clima com base no horário mais próximo do momento da requisição,
 * e a previsão diária para os próximos dias.
 *
 * @async
 * @function getWeatherByCity
 * @param {string} city - Nome da cidade a ser consultada. Ex.: "São Paulo".
 * @throws {Error} Lança erro se:
 *   - O parâmetro `city` for vazio ou não for string.
 *   - A cidade não for encontrada.
 *   - Os dados meteorológicos não estiverem disponíveis.
 * @returns {Promise<Object>} Um objeto contendo:
 *   - city {string}: Nome da cidade e país, ex.: "São Paulo, Brasil".
 *   - current {Object}: Dados do clima atual:
 *       - temperature_2m {number}: Temperatura atual em °C.
 *       - apparent_temperature {number}: Sensação térmica em °C.
 *       - relative_humidity_2m {number}: Umidade relativa em %.
 *       - wind_speed_10m {number}: Velocidade do vento em km/h.
 *       - precipitation {number}: Precipitação em mm.
 *   - daily {Object}: Previsão diária com arrays de:
 *       - temperature_2m_max {number[]}: Temperaturas máximas.
 *       - temperature_2m_min {number[]}: Temperaturas mínimas.
 *       - time {string[]}: Datas correspondentes.
 *
 * @example
 * import { getWeatherByCity } from './api.js';
 * 
 * async function mostrarClima() {
 *   try {
 *     const dados = await getWeatherByCity("São Paulo");
 *     console.log(dados.city); // "São Paulo, Brasil"
 *     console.log(dados.current.temperature_2m); // 25.3
 *     console.log(dados.daily.temperature_2m_max); // [28, 27, 26, ...]
 *   } catch (err) {
 *     console.error(err.message);
 *   }
 * }
 */
export async function getWeatherByCity(city) {
  if (!city || typeof city !== "string") {
    throw new Error("Por favor, digite o nome de uma cidade.");
  }

  try {
    // 1️⃣ Buscar latitude e longitude
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=pt&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Cidade não encontrada.");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Buscar dados meteorológicos
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    if (!weatherData.hourly || !weatherData.hourly.time) {
      throw new Error("Dados horários do clima não disponíveis.");
    }

    // 3️⃣ Encontrar horário mais próximo do momento atual
    const now = new Date();
    const times = weatherData.hourly.time;
    let closestIndex = 0;
    let minDiff = Infinity;

    times.forEach((t, i) => {
      const diff = Math.abs(new Date(t).getTime() - now.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });

    // 4️⃣ Extrair dados atuais do clima
    const current = {
      temperature_2m: weatherData.hourly.temperature_2m[closestIndex],
      apparent_temperature: weatherData.hourly.apparent_temperature[closestIndex],
      relative_humidity_2m: weatherData.hourly.relative_humidity_2m[closestIndex],
      wind_speed_10m: weatherData.hourly.wind_speed_10m[closestIndex],
      precipitation: weatherData.hourly.precipitation[closestIndex],
    };

    return {
      city: `${name}, ${country}`,
      current,
      daily: weatherData.daily,
    };
  } catch (err) {
    throw new Error(err.message || "Erro ao buscar dados do clima.");
  }
}











