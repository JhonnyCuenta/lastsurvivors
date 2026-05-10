import { NextResponse } from 'next/server';
import { getPublicServerStatus } from '@/lib/server-status';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const status = await getPublicServerStatus();

  return NextResponse.json(status, {
    headers: {
      'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
    },
  });
}
