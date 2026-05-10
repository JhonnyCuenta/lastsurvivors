export type PublicLiveEventType = 'airdrop' | 'horde' | 'blackout' | 'storm' | 'announcement';
export type PublicLiveEventStatus =
  | 'announcing'
  | 'scheduled'
  | 'active'
  | 'completed'
  | 'success'
  | 'cancelled'
  | 'failed'
  | 'expired';
export type PublicLiveEventSeverity = 'low' | 'medium' | 'high' | 'critical';

export type PublicLiveEvent = {
  id: string;
  type: PublicLiveEventType;
  title: string;
  zone: string;
  status: PublicLiveEventStatus;
  statusLabel: string;
  severity: PublicLiveEventSeverity;
  message: string;
  startedAt?: string;
  updatedAt?: string;
  endedAt?: string;
  endsAt?: string;
  currentWave?: number;
  totalWaves?: number;
};

export type PublicLiveEventsFeed = {
  active: PublicLiveEvent[];
  recent: PublicLiveEvent[];
  lastCheckedAt: string;
  source: 'fivem-resource' | 'fallback';
};

const DEFAULT_SERVER_ENDPOINT = 'http://49.12.121.140:30175';
const allowedTypes = new Set<PublicLiveEventType>(['airdrop', 'horde', 'blackout', 'storm', 'announcement']);
const allowedStatuses = new Set<PublicLiveEventStatus>([
  'announcing',
  'scheduled',
  'active',
  'completed',
  'success',
  'cancelled',
  'failed',
  'expired',
]);
const allowedSeverities = new Set<PublicLiveEventSeverity>(['low', 'medium', 'high', 'critical']);

function getFiveMBaseEndpoint() {
  const raw = (process.env.FIVEM_SERVER_ENDPOINT || DEFAULT_SERVER_ENDPOINT).trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `http://${raw}`;
  return withProtocol.replace(/\/dynamic\.json$/i, '').replace(/\/+$/, '');
}

function getLiveEventsEndpoint() {
  const configured = process.env.LIVE_EVENTS_ENDPOINT?.trim();
  if (configured) return configured;
  return `${getFiveMBaseEndpoint()}/lsv_live_events/feed`;
}

function fallbackFeed(): PublicLiveEventsFeed {
  return {
    active: [],
    recent: [],
    lastCheckedAt: new Date().toISOString(),
    source: 'fallback',
  };
}

function asSafeString(value: unknown, fallback: string, maxLength = 90) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function asSafeType(value: unknown): PublicLiveEventType {
  const type = asSafeString(value, 'announcement', 24).toLowerCase() as PublicLiveEventType;
  return allowedTypes.has(type) ? type : 'announcement';
}

function asSafeStatus(value: unknown): PublicLiveEventStatus {
  const status = asSafeString(value, 'active', 24).toLowerCase() as PublicLiveEventStatus;
  return allowedStatuses.has(status) ? status : 'active';
}

function asSafeSeverity(value: unknown): PublicLiveEventSeverity {
  const severity = asSafeString(value, 'medium', 24).toLowerCase() as PublicLiveEventSeverity;
  return allowedSeverities.has(severity) ? severity : 'medium';
}

function asSafeDate(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value * 1000).toISOString();
  }

  if (typeof value !== 'string') return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function asSafeNumber(value: unknown, max = 50) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return undefined;
  return Math.min(Math.round(number), max);
}

function normalizeEvent(value: unknown, index: number): PublicLiveEvent {
  const event = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const type = asSafeType(event.type);
  const status = asSafeStatus(event.status);
  const currentWave = asSafeNumber(event.currentWave);
  const totalWaves = asSafeNumber(event.totalWaves);

  return {
    id: asSafeString(event.id, `${type}-${index}`, 64),
    type,
    title: asSafeString(event.title, 'Event serveur', 90),
    zone: asSafeString(event.zone, 'Zone inconnue', 80),
    status,
    statusLabel: asSafeString(event.statusLabel, status === 'active' ? 'En cours' : 'Signal', 40),
    severity: asSafeSeverity(event.severity),
    message: asSafeString(event.message, 'Information terrain en cours de mise a jour.', 180),
    startedAt: asSafeDate(event.startedAt),
    updatedAt: asSafeDate(event.updatedAt),
    endedAt: asSafeDate(event.endedAt),
    endsAt: asSafeDate(event.endsAt),
    currentWave,
    totalWaves,
  };
}

function normalizeFeed(payload: unknown): PublicLiveEventsFeed {
  const data = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};
  const activeRows = Array.isArray(data.active) ? data.active : [];
  const recentRows = Array.isArray(data.recent) ? data.recent : [];

  return {
    active: activeRows.slice(0, 12).map(normalizeEvent),
    recent: recentRows.slice(0, 30).map(normalizeEvent),
    lastCheckedAt: new Date().toISOString(),
    source: 'fivem-resource',
  };
}

export async function getLiveEvents(): Promise<PublicLiveEventsFeed> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(getLiveEventsEndpoint(), {
      cache: 'no-store',
      headers: { accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) return fallbackFeed();

    return normalizeFeed(await response.json());
  } catch {
    return fallbackFeed();
  } finally {
    clearTimeout(timeout);
  }
}
