
"use client";

import { useState } from "react";

function getFakeWeather(city) {
  const key = city?.toLowerCase().trim();
  if (!key) {
    return null;
  }

  if (key.includes("viña") || key.includes("vina") || key.includes("viÃ±a") || key.includes("viña del mar")) {
    return {
      emoji: "☀️",
      temp: "22°C",
      desc: "Soleado",
      humidity: "60%",
      wind: "15 km/h",
      pressure: "1015 hPa",
      feels: "21°C",
    };
  }

  // Valores genéricos para cualquier otra ciudad (simulados)
  return {
    emoji: "⛅",
    temp: "18°C",
    desc: "Parcialmente nublado",
    humidity: "70%",
    wind: "10 km/h",
    pressure: "1012 hPa",
    feels: "17°C",
  };
}

export default function Home() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Viña del Mar");
  const [weather, setWeather] = useState(getFakeWeather("Viña del Mar"));

  function handleSubmit(e) {
    e.preventDefault();
    const c = input.trim() || "Viña del Mar";
    setCity(c);
    setWeather(getFakeWeather(c));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Clima</h1>
        <p className="text-lg text-blue-700">Consulta el estado del tiempo por ciudad</p>
      </header>

      <main className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <form onSubmit={handleSubmit} className="mb-6" aria-label="Buscar ciudad">
          <label htmlFor="city-input" className="block text-sm font-medium text-gray-700 mb-2">
            Ingresa el nombre de la ciudad
          </label>
          <div className="flex gap-2">
            <input
              id="city-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej. Viña del Mar"
              aria-label="Nombre de la ciudad"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
        </form>

        <section aria-live="polite" aria-atomic="true">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">{city}</h2>
          {weather ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl">{weather.emoji}</span>
              <p className="text-4xl font-bold text-gray-900">{weather.temp}</p>
              <p className="text-base text-gray-700">{weather.desc}</p>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 w-full">
                <div>
                  <dt className="font-medium">Humedad</dt>
                  <dd>{weather.humidity}</dd>
                </div>
                <div>
                  <dt className="font-medium">Viento</dt>
                  <dd>{weather.wind}</dd>
                </div>
                <div>
                  <dt className="font-medium">Presión</dt>
                  <dd>{weather.pressure}</dd>
                </div>
                <div>
                  <dt className="font-medium">Sensación</dt>
                  <dd>{weather.feels}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <p className="text-gray-600">Ingresa una ciudad y presiona Buscar para ver el clima (datos simulados).</p>
          )}
        </section>
      </main>

      <footer className="mt-6 text-gray-500 text-xs text-center">
        <p>Datos simulados para demostración. © 2025</p>
      </footer>
    </div>
  );
}
