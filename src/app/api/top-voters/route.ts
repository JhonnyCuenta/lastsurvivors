import { NextResponse } from 'next/server';
import { getTopVoters } from '@/lib/top-voters';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const feed = await getTopVoters();

  return NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
