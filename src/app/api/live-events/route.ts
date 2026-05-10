import { NextResponse } from 'next/server';
import { getLiveEvents } from '@/lib/live-events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const feed = await getLiveEvents();

  return NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
    },
  });
}
