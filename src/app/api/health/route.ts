import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    service: 'Trend Motor API',
    version: '1.0.0'
  });
}