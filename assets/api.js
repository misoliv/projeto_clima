/**
 * Busca informações meteorológicas atuais e previsão de 7 dias para uma cidade usando a API Open-Meteo.
 *
 * @async
 * @function getWeatherByCity
 * @param {string} city - Nome da cidade a ser consultada. Deve ser uma string não vazia.
 *
 * @returns {Promise<Object>} Um objeto contendo:
 * - {string} city - Nome da cidade e país.
 * - {Object} current - Dados atuais do clima, incluindo:
 *   - {number} temperature_2m - Temperatura atual em graus Celsius.
 *   - {number} apparent_temperature - Sensação térmica em graus Celsius.
 *   - {number} relative_humidity_2m - Umidade relativa do ar (%).
 *   - {number} wind_speed_10m - Velocidade do vento (km/h).
 *   - {number} precipitation - Quantidade de precipitação (mm).
 * - {Object} daily - Dados da previsão para os próximos dias (temperatura máxima e mínima, tempo, etc.).
 *
 * @throws {Error} Se o parâmetro `city` for inválido, se a cidade não for encontrada
 * ou se ocorrer um erro ao buscar os dados das APIs.
 *
 * @example
 * // Exemplo de uso:
 * import { getWeatherByCity } from "./api.js";
 *
 * (async () => {
 *   try {
 *     const weatherData = await getWeatherByCity("São Paulo");
 *     console.log(weatherData.city); // "São Paulo, Brazil"
 *     console.log(weatherData.current.temperature_2m); // 25.3
 *   } catch (error) {
 *     console.error("Erro:", error.message);
 *   }
 * })();
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











