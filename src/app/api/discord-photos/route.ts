import { NextResponse } from 'next/server';
import { getDiscordPhotos } from '@/lib/discord-photos';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const feed = await getDiscordPhotos();

  return NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
