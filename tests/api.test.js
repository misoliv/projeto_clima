// tests/api.test.js

// Aqui criamos uma função isolada para testar a lógica da API
async function obterClima(city) {
  if (!city || !city.trim()) {
    throw new Error("Por favor, digite o nome de uma cidade.");
  }

  // Simula fetch da API de geocodificação
  const geoResp = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=pt&format=json`
  );
  if (!geoResp.ok) throw new Error("Falha na API de geocodificação.");

  const geoData = await geoResp.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // Simula fetch da API de clima
  const weatherResp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  if (!weatherResp.ok) throw new Error("Falha ao buscar dados meteorológicos.");

  const weatherData = await weatherResp.json();
  if (!weatherData.current_weather) {
    throw new Error("Dados de clima indisponíveis para essa localização.");
  }

  return { name, country, ...weatherData };
}

// Mock global do fetch
global.fetch = jest.fn();

describe("Testes de API de clima", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Nome de cidade válido retorna dados meteorológicos", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ latitude: -23.55, longitude: -46.63, name: "São Paulo", country: "BR" }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          current_weather: { temperature: 25, weathercode: 1, time: "2025-11-12T12:00" },
        }),
      });

    const dados = await obterClima("São Paulo");
    expect(dados.name).toBe("São Paulo");
    expect(dados.current_weather.temperature).toBe(25);
  });

  test("Nome de cidade inexistente lança exceção", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) });
    await expect(obterClima("CidadeQueNaoExiste")).rejects.toThrow("Cidade não encontrada");
  });

  test("Entrada vazia retorna erro de validação", async () => {
    await expect(obterClima("")).rejects.toThrow("Por favor, digite o nome de uma cidade.");
  });

  test("Falha da API gera erro", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(obterClima("Curitiba")).rejects.toThrow("Falha na API de geocodificação.");
  });
});


