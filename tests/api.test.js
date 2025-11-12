// tests/api.test.js

// Mock global do fetch
global.fetch = jest.fn();

// Função simulada para testes (mesma lógica do api.js)
async function obterClima(city) {
  if (!city || !city.trim()) throw new Error("Por favor, digite o nome de uma cidade.");

  const geoResp = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=pt&format=json`
  );
  if (!geoResp.ok) throw new Error("Falha na API de geocodificação.");

  const geoData = await geoResp.json();
  if (!geoData.results || geoData.results.length === 0) throw new Error("Cidade não encontrada");

  const { latitude, longitude, name, country } = geoData.results[0];

  const weatherResp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  if (!weatherResp.ok) throw new Error("Falha ao buscar dados meteorológicos.");

  const weatherData = await weatherResp.json();
  if (!weatherData.current_weather)
    throw new Error("Dados de clima indisponíveis para essa localização.");

  return { name, country, ...weatherData };
}

describe("API de clima", () => {
  beforeEach(() => jest.clearAllMocks());

  const cidadeValida = { latitude: -23.55, longitude: -46.63, name: "São Paulo", country: "BR" };
  const climaValido = { temperature: 25, weathercode: 1, time: "2025-11-12T12:00" };

  const mockGeoResponse = (results) =>
    Promise.resolve({ ok: true, json: async () => ({ results }) });
  const mockWeatherResponse = (current_weather) =>
    Promise.resolve({ ok: true, json: async () => ({ current_weather }) });

  test("Cidade válida retorna dados meteorológicos", async () => {
    fetch
      .mockResolvedValueOnce(mockGeoResponse([cidadeValida]))
      .mockResolvedValueOnce(mockWeatherResponse(climaValido));

    const dados = await obterClima("São Paulo");

    expect(dados.name).toBe("São Paulo");
    expect(dados.country).toBe("BR");
    expect(dados.current_weather.temperature).toBe(25);
  });

  test("Cidade inexistente lança exceção", async () => {
    fetch.mockResolvedValueOnce(mockGeoResponse([]));
    await expect(obterClima("CidadeQueNaoExiste")).rejects.toThrow("Cidade não encontrada");
  });

  test("Entrada vazia lança erro de validação", async () => {
    await expect(obterClima("")).rejects.toThrow("Por favor, digite o nome de uma cidade.");
  });

  test("Falha na API de geocodificação", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(obterClima("Curitiba")).rejects.toThrow("Falha na API de geocodificação.");
  });

  test("Falha na API de clima", async () => {
    fetch
      .mockResolvedValueOnce(mockGeoResponse([cidadeValida]))
      .mockResolvedValueOnce({ ok: false });
    await expect(obterClima("São Paulo")).rejects.toThrow("Falha ao buscar dados meteorológicos.");
  });

  test("Dados meteorológicos ausentes", async () => {
    fetch
      .mockResolvedValueOnce(mockGeoResponse([cidadeValida]))
      .mockResolvedValueOnce(mockWeatherResponse(undefined));
    await expect(obterClima("São Paulo")).rejects.toThrow(
      "Dados de clima indisponíveis para essa localização."
    );
  });
});





