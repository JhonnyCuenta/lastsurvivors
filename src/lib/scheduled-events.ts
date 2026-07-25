import { getPortalEvents } from '@/lib/bot-portal';

const DISCORD_USER_AGENT = 'DiscordBot (https://lastsurvivor.fr, 1.0)';

type DiscordScheduledEvent = {
  id: string;
  name?: string;
  description?: string | null;
  scheduled_start_time?: string;
  status?: number;
  entity_type?: number;
  entity_metadata?: { location?: string | null } | null;
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
  source: 'bot' | 'discord';
  url?: string;
  playersInterested?: number;
};

function formatEventDate(value?: string) {
  if (!value) return 'Date non communiquée';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date non communiquée';

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
  if (entityType === 1) return 'Scène vocale';
  if (entityType === 2) return 'Salon vocal';
  if (entityType === 3) return 'Opération externe';
  return 'Opération RP';
}

async function getDiscordScheduledEvents(): Promise<ScheduledPortalEvent[]> {
  const token = (
    process.env.DISCORD_EVENTS_BOT_TOKEN ||
    process.env.DISCORD_MEDIA_BOT_TOKEN ||
    ''
  ).trim();
  const guildId = process.env.DISCORD_GUILD_ID?.trim();

  if (!token || !guildId) return [];

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/scheduled-events?with_user_count=true`,
      {
        cache: 'no-store',
        headers: {
          accept: 'application/json',
          authorization: `Bot ${token}`,
          'user-agent': DISCORD_USER_AGENT,
        },
        signal: AbortSignal.timeout(4_000),
      },
    );

    if (!response.ok) return [];

    const events = (await response.json()) as DiscordScheduledEvent[];
    return events
      .filter((event) => event.status === 1 || event.status === 2)
      .map((event) => ({
        id: `discord:${event.id}`,
        title: event.name?.trim() || 'Opération Last Survivors',
        type: eventTypeLabel(event.entity_type),
        schedule: formatEventDate(event.scheduled_start_time),
        startsAt: event.scheduled_start_time,
        location:
          event.entity_metadata?.location?.trim() ||
          (event.channel_id ? 'Discord vocal' : 'Lieu communiqué sur Discord'),
        text: event.description?.trim() || 'Détails à venir sur le Discord officiel.',
        source: 'discord' as const,
        url: `https://discord.com/events/${guildId}/${event.id}`,
        playersInterested: event.user_count,
      }));
  } catch {
    return [];
  }
}

export async function getScheduledEvents(): Promise<ScheduledPortalEvent[]> {
  const [botResult, discordEvents] = await Promise.all([
    getPortalEvents(20),
    getDiscordScheduledEvents(),
  ]);

  const botEvents: ScheduledPortalEvent[] = botResult.ok
    ? botResult.data.map((event) => ({
        id: `bot:${event.id}`,
        title: event.title,
        type: 'Opération RP',
        schedule: formatEventDate(event.startsAt),
        startsAt: event.startsAt,
        location: event.zone,
        text: event.summary,
        source: 'bot',
        playersInterested: event.maxParticipants,
      }))
    : [];

  const unique = new Map<string, ScheduledPortalEvent>();
  for (const event of [...botEvents, ...discordEvents]) {
    const key = `${event.title.trim().toLowerCase()}|${event.startsAt ?? event.schedule}`;
    if (!unique.has(key)) unique.set(key, event);
  }

  return [...unique.values()]
    .sort((left, right) => {
      const leftTime = left.startsAt ? new Date(left.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
      const rightTime = right.startsAt ? new Date(right.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
      return leftTime - rightTime;
    })
    .slice(0, 20);
}
