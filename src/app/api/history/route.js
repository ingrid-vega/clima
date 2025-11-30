import { NextResponse } from 'next/server';
import { query, ensureTable } from '../../../lib/db';

// GET: devuelve historial de búsquedas (más recientes primero)
export async function GET() {
  try {
    await ensureTable();
    const res = await query('SELECT id, city, source, result, created_at FROM search_history ORDER BY created_at DESC LIMIT 100');
    return NextResponse.json({ data: res.rows });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST: guarda una búsqueda { city, source, result }
export async function POST(req) {
  try {
    await ensureTable();
    const body = await req.json();
    const { city = null, source = 'mock', result = null } = body;
    const res = await query('INSERT INTO search_history (city, source, result) VALUES ($1, $2, $3) RETURNING id, created_at', [city, source, result && JSON.stringify(result)]);
    return NextResponse.json({ ok: true, id: res.rows[0].id, created_at: res.rows[0].created_at });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
