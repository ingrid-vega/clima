import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const hasKey = !!process.env.OPENWEATHER_API_KEY;
    return NextResponse.json({ hasApiKey: hasKey });
  } catch (err) {
    return NextResponse.json({ hasApiKey: false });
  }
}
