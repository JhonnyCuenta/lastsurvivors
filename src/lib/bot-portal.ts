import type {
  PortalChangelogEntry,
  PortalEnvelope,
  PortalEvent,
  PortalStatus,
  PortalTicketResult,
  PortalTransmission,
  TransmissionFeed,
} from '@/types/portal';

type BotPortalResult<T> =
  | { ok: true; data: T; generatedAt: string }
  | { ok: false; reason: 'unconfigured' | 'unavailable' };

const REQUEST_TIMEOUT_MS = 4_000;

function portalConfig() {
  return {
    baseUrl: process.env.BOT_PORTAL_API_URL?.trim().replace(/\/+$/, ''),
    token: process.env.BOT_PORTAL_API_TOKEN?.trim(),
  };
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

async function requestBotPortal<T>(
  path: string,
  init?: { method?: 'GET' | 'POST'; body?: unknown; timeoutMs?: number },
): Promise<BotPortalResult<T>> {
  const { baseUrl, token } = portalConfig();

  if (!baseUrl || !token || !isHttpsUrl(baseUrl)) {
    return { ok: false, reason: 'unconfigured' };
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: init?.method ?? 'GET',
      cache: 'no-store',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        ...(init?.body === undefined ? {} : { 'content-type': 'application/json' }),
      },
      body: init?.body === undefined ? undefined : JSON.stringify(init.body),
      signal: AbortSignal.timeout(init?.timeoutMs ?? REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { ok: false, reason: 'unavailable' };
    }

    const envelope = (await response.json()) as PortalEnvelope<T>;

    if (!envelope.ok || !Array.isArray(envelope.data) && envelope.data === null) {
      return { ok: false, reason: 'unavailable' };
    }

    return {
      ok: true,
      data: envelope.data,
      generatedAt: envelope.meta.generatedAt,
    };
  } catch {
    return { ok: false, reason: 'unavailable' };
  }
}

export async function fetchBotPortal<T>(path: string): Promise<BotPortalResult<T>> {
  return requestBotPortal<T>(path);
}

export async function getPortalStatus() {
  return fetchBotPortal<PortalStatus>('/api/portal/v1/status');
}

export async function getPortalEvents(limit = 20) {
  const now = new Date();
  const to = new Date(now.getTime() + 90 * 86_400_000);
  const query = new URLSearchParams({
    from: now.toISOString(),
    to: to.toISOString(),
    limit: String(limit),
  });
  return fetchBotPortal<PortalEvent[]>(`/api/portal/v1/events?${query}`);
}

export async function getPortalChangelog(limit = 10) {
  return fetchBotPortal<PortalChangelogEntry[]>(`/api/portal/v1/changelog?limit=${limit}`);
}

export async function getTransmissionFeed(limit = 20): Promise<TransmissionFeed> {
  const result = await fetchBotPortal<PortalTransmission[]>(
    `/api/portal/v1/transmissions?limit=${limit}`,
  );

  if (!result.ok) {
    return {
      transmissions: [],
      lastCheckedAt: new Date().toISOString(),
      source: result.reason,
    };
  }

  return {
    transmissions: result.data,
    lastCheckedAt: result.generatedAt,
    source: 'bot-api',
  };
}

export async function createPortalSupportTicket(input: {
  userDiscordId: string;
  categoryKey: 'support' | 'bug' | 'report_player' | 'shop' | 'other';
  subject: string;
  description: string;
}) {
  return requestBotPortal<PortalTicketResult>('/api/portal/v1/tickets', {
    method: 'POST',
    body: input,
    timeoutMs: 14_000,
  });
}
