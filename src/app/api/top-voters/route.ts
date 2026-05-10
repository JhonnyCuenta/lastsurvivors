import { NextResponse } from 'next/server';
import { getTopVoters } from '@/lib/top-voters';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const feed = await getTopVoters();

  return NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
