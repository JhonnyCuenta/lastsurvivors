export type PublicServerStatus = {
  online: boolean;
  playersOnline: number;
  maxPlayers: number;
  hostname: string;
  connectCommand: string;
  lastCheckedAt: string;
  source: 'fivem-dynamic' | 'fallback';
};

const DEFAULT_ENDPOINT = 'http://49.12.121.140:30175';
const DEFAULT_CONNECT_COMMAND = 'connect 49.12.121.140:30175';
const DEFAULT_HOSTNAME = 'LAST SURVIVORS';
const DEFAULT_MAX_PLAYERS = 64;

function getConnectCommand() {
  return (process.env.NEXT_PUBLIC_CONNECT_COMMAND || DEFAULT_CONNECT_COMMAND).trim();
}

function getDynamicEndpoint() {
  const raw = (process.env.FIVEM_SERVER_ENDPOINT || DEFAULT_ENDPOINT).trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `http://${raw}`;
  const clean = withProtocol.replace(/\/+$/, '');
  return clean.endsWith('/dynamic.json') ? clean : `${clean}/dynamic.json`;
}

function asSafeString(value: unknown, fallback: string, maxLength = 120) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function asSafeNumber(value: unknown, fallback: number) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return fallback;
  return Math.min(Math.round(number), 2048);
}

function fallbackStatus(): PublicServerStatus {
  return {
    online: false,
    playersOnline: 0,
    maxPlayers: DEFAULT_MAX_PLAYERS,
    hostname: DEFAULT_HOSTNAME,
    connectCommand: getConnectCommand(),
    lastCheckedAt: new Date().toISOString(),
    source: 'fallback',
  };
}

export async function getPublicServerStatus(): Promise<PublicServerStatus> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(getDynamicEndpoint(), {
      cache: 'no-store',
      headers: { accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) return fallbackStatus();

    const data = (await response.json()) as Record<string, unknown>;
    const playersOnline = asSafeNumber(data.clients ?? data.players, 0);
    const maxPlayers = asSafeNumber(data.sv_maxclients ?? data.maxclients, DEFAULT_MAX_PLAYERS);

    return {
      online: true,
      playersOnline,
      maxPlayers,
      hostname: asSafeString(data.hostname, DEFAULT_HOSTNAME),
      connectCommand: getConnectCommand(),
      lastCheckedAt: new Date().toISOString(),
      source: 'fivem-dynamic',
    };
  } catch {
    return fallbackStatus();
  } finally {
    clearTimeout(timeout);
  }
}
