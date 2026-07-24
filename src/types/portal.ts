export type PortalSeverity = 'info' | 'attention' | 'alerte' | 'critique';
export type PortalSource = 'bot' | 'discord' | 'fivem';

export type PortalMeta = {
  version: string;
  source: 'last-survivors-bot';
  generatedAt: string;
};

export type PortalEnvelope<T> =
  | { ok: true; data: T; meta: PortalMeta }
  | { ok: false; error: string; meta: PortalMeta };

export type PortalTransmission = {
  id: string;
  kind: string;
  severity: PortalSeverity;
  title: string;
  summary: string;
  zone: string | null;
  status: string;
  startsAt: string | null;
  endsAt: string | null;
  publishedAt: string;
  source: PortalSource;
};

export type PortalEvent = {
  id: string;
  title: string;
  summary: string;
  zone: string;
  organizer: string;
  status: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
  publishedAt: string;
  source: 'discord';
};

export type PortalChangelogEntry = {
  id: string;
  version: string;
  title: string;
  added: string | null;
  changed: string | null;
  fixed: string | null;
  removed: string | null;
  publishedAt: string;
  source: 'discord';
};

export type PortalStatus = {
  online: boolean;
  hostname: string | null;
  playersOnline: number;
  maxPlayers: number | null;
  latencyMs: number | null;
  message: string | null;
};

export type PortalTicketResult = {
  publicId: string;
  status: string;
};

export type TransmissionFeed = {
  transmissions: PortalTransmission[];
  lastCheckedAt: string;
  source: 'bot-api' | 'unconfigured' | 'unavailable';
};
