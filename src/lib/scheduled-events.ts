import { organizedEvents } from '@/config/site';

type DiscordScheduledEvent = {
  id: string;
  name?: string;
  description?: string | null;
  scheduled_start_time?: string;
  scheduled_end_time?: string | null;
  status?: number;
  entity_type?: number;
  entity_metadata?: {
    location?: string | null;
  } | null;
  channel_id?: string | null;
  user_count?: number;
};

export type ScheduledPortalEvent = {
  id: string;
  title: string;
  type: string;
  schedule: string;
  startsAt?: string;
  location: string;
  text: string;
  source: 'discord' | 'manual';
  url?: string;
  playersInterested?: number;
};

function formatDiscordEventDate(value?: string) {
  if (!value) return 'Date annoncee sur Discord';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date annoncee sur Discord';

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(date);
}

function eventTypeLabel(entityType?: number) {
  if (entityType === 1) return 'Stage vocal';
  if (entityType === 2) return 'Salon vocal';
  if (entityType === 3) return 'Event externe';
  return 'Event organise';
}

function manualEvents(): ScheduledPortalEvent[] {
  return organizedEvents.map((event, index) => ({
    id: `manual-${index}`,
    title: event.title,
    type: event.type,
    schedule: event.schedule,
    location: event.location,
    text: event.text,
    source: 'manual',
  }));
}

export async function getScheduledEvents(): Promise<ScheduledPortalEvent[]> {
  const token = (process.env.DISCORD_EVENTS_BOT_TOKEN || process.env.DISCORD_MEDIA_BOT_TOKEN || '').trim();
  const guildId = process.env.DISCORD_GUILD_ID?.trim();

  if (!token || !guildId) {
    return manualEvents();
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/scheduled-events?with_user_count=true`, {
      cache: 'no-store',
      headers: {
        accept: 'application/json',
        authorization: `Bot ${token}`,
      },
    });

    if (!response.ok) {
      return manualEvents();
    }

    const events = (await response.json()) as DiscordScheduledEvent[];
    const mapped = events
      .filter((event) => event.status === 1 || event.status === 2)
      .map((event) => ({
        id: event.id,
        title: event.name?.trim() || 'Event Last Survivors',
        type: eventTypeLabel(event.entity_type),
        schedule: formatDiscordEventDate(event.scheduled_start_time),
        startsAt: event.scheduled_start_time,
        location: event.entity_metadata?.location?.trim() || (event.channel_id ? 'Discord vocal' : 'Lieu annonce Discord'),
        text: event.description?.trim() || 'Details a venir sur Discord.',
        source: 'discord' as const,
        url: `https://discord.com/events/${guildId}/${event.id}`,
        playersInterested: event.user_count,
      }))
      .sort((a, b) => {
        const aTime = a.startsAt ? new Date(a.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
        const bTime = b.startsAt ? new Date(b.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
        return aTime - bTime;
      });

    return mapped.length > 0 ? mapped.slice(0, 6) : manualEvents();
  } catch {
    return manualEvents();
  }
}
