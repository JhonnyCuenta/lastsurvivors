import { NextResponse } from 'next/server';
import { getScheduledEvents } from '@/lib/scheduled-events';

export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await getScheduledEvents();
  return NextResponse.json({
    events,
    lastCheckedAt: new Date().toISOString(),
  });
}
