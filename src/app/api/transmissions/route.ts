import { NextResponse } from 'next/server';
import { getTransmissionFeed } from '@/lib/bot-portal';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const feed = await getTransmissionFeed();

  return NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
