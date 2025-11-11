// assets/api.test.js
import { getWeatherByCity } from "./api.js";

global.fetch = jest.fn();

describe("getWeatherByCity", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve lançar erro se a cidade estiver vazia", async () => {
    await expect(getWeatherByCity("")).rejects.toThrow(
      "Por favor, digite o nome de uma cidade."
    );
  });

  it("deve lançar erro se a cidade não for encontrada", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    });

    await expect(getWeatherByCity("Atlantis")).rejects.toThrow(
      "Cidade não encontrada."
    );
  });

  it("deve retornar dados válidos de clima para cidade existente", async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => ({
          results: [
            { latitude: -23.5, longitude: -46.6, name: "São Paulo", country: "Brasil" },
          ],
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          current: {
            temperature_2m: 25,
            apparent_temperature: 24,
            relative_humidity_2m: 60,
            wind_speed_10m: 5,
            precipitation: 0,
          },
          daily: {
            temperature_2m_max: [28],
            temperature_2m_min: [18],
            time: ["2025-11-11"],
          },
        }),
      });

    const result = await getWeatherByCity("São Paulo");

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(result.city).toBe("São Paulo, Brasil");
    expect(result.current.temperature_2m).toBe(25);
    expect(result.daily.temperature_2m_max[0]).toBe(28);
  });

  it("deve tratar erro de rede", async () => {
    fetch.mockRejectedValueOnce(new Error("Erro na rede"));

    await expect(getWeatherByCity("Rio")).rejects.toThrow("Erro na rede");
  });
});







