import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
