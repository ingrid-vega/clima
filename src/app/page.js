
"use client";

import { useState, useEffect } from 'react';

async function fetchWeatherForCity(city) {
  const res = await fetch(`/api/weather?q=${encodeURIComponent(city)}`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Error fetching weather');
  }
  return res.json();
}

export default function Home() {
  const [input, setInput] = useState('');
  const [city, setCity] = useState('Viña del Mar');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch initial
    let mounted = true;
    setLoading(true);
    fetchWeatherForCity('Viña del Mar')
      .then((data) => {
        if (mounted) setWeather(data);
      })
      .catch((err) => {
        if (mounted) setError(String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const c = input.trim() || 'Viña del Mar';
    setCity(c);
    setError(null);
    setLoading(true);
    try {
      const data = await fetchWeatherForCity(c);
      setWeather(data);
    } catch (err) {
      setError(String(err));
      setWeather(null);
    } finally {
      setLoading(false);
    }
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
          {loading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : weather ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl">{weather.emoji}</span>
              <p className="text-4xl font-bold text-gray-900">{weather.temp}</p>
              <p className="text-base text-gray-700 capitalize">{weather.desc}</p>

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
                  <dd>{weather.feels_like}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <p className="text-gray-600">Ingresa una ciudad y presiona Buscar para ver el clima.</p>
          )}
        </section>
      </main>

      <footer className="mt-6 text-gray-500 text-xs text-center">
        <p>Datos obtenidos desde OpenWeatherMap (vía proxy). © 2025</p>
      </footer>
    </div>
  );
}
