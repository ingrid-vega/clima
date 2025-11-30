import { NextResponse } from 'next/server';

// Ruta server-side que actúa como proxy a OpenWeatherMap.
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || 'Viña del Mar';

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured on server' }, { status: 500 });
    }

    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${apiKey}`
    );

    if (!resp.ok) {
      const text = await resp.text();
      // Si la API upstream devuelve 404 "city not found", devolvemos un mensaje claro
      if (resp.status === 404) {
        return NextResponse.json({ error: 'City not found', details: text }, { status: 404 });
      }
      // Para otros errores upstream devolvemos la descripción para debugging
      return NextResponse.json({ error: 'Upstream error', status: resp.status, details: text }, { status: resp.status });
    }

    const data = await resp.json();

    const weatherMain = data.weather && data.weather[0] && data.weather[0].main;
    const desc = data.weather && data.weather[0] && data.weather[0].description;

    // Map simple emoji based on weather main
    const emojiMap = {
      Clear: '☀️',
      Clouds: '⛅',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Snow: '❄️',
      Thunderstorm: '⛈️',
      Mist: '🌫️',
      Smoke: '🌫️',
      Haze: '🌫️',
      Fog: '🌫️',
    };

    const result = {
      city: data.name,
      country: data.sys?.country,
      temp: `${Math.round(data.main?.temp ?? 0)}°C`,
      feels_like: `${Math.round(data.main?.feels_like ?? 0)}°C`,
      humidity: `${data.main?.humidity ?? '-'}%`,
      pressure: `${data.main?.pressure ?? '-'} hPa`,
      wind: `${Math.round((data.wind?.speed ?? 0) * 3.6)} km/h`, // m/s -> km/h
      desc: desc || '',
      emoji: emojiMap[weatherMain] || '🌤️',
    };

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
