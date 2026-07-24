'use client';

import { useCallback } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock3,
  CloudLightning,
  PackageOpen,
  Radio,
  RefreshCw,
  Skull,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PublicLiveEvent, PublicLiveEventsFeed, PublicLiveEventType } from '@/lib/live-events';
import { useSmartPolling } from '@/hooks/use-smart-polling';

type Props = {
  initialFeed: PublicLiveEventsFeed;
};

const typeMeta: Record<PublicLiveEventType, { label: string; icon: LucideIcon }> = {
  airdrop: { label: 'Airdrop', icon: PackageOpen },
  horde: { label: 'Horde', icon: Skull },
  blackout: { label: 'Blackout', icon: Zap },
  storm: { label: 'Tempête', icon: CloudLightning },
  announcement: { label: 'Annonce', icon: Radio },
};

function formatDate(value?: string) {
  if (!value) return 'signal récent';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'signal recent';

  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(date);
}

function eventStatusText(event: PublicLiveEvent) {
  if (event.status === 'announcing') return 'Annonce en cours';
  if (event.status === 'scheduled') return 'Programmé';
  if (event.status === 'success' || event.status === 'completed') return 'Terminé';
  if (event.status === 'cancelled') return 'Annulé';
  if (event.status === 'failed') return 'Échec';
  return event.statusLabel || 'En cours';
}

function LiveEventCard({ event }: { event: PublicLiveEvent }) {
  const meta = typeMeta[event.type] ?? typeMeta.announcement;
  const Icon = meta.icon;
  const waveText =
    event.totalWaves && event.totalWaves > 0
      ? `Vague ${event.currentWave ?? 0}/${event.totalWaves}`
      : null;

  return (
    <article className={`live-event-card ${event.severity} ${event.status}`}>
      <div className="live-card-head">
        <span className="live-event-icon">
          <Icon size={22} />
        </span>
        <div>
          <strong>{event.title}</strong>
          <span>{meta.label}</span>
        </div>
        <em>{eventStatusText(event)}</em>
      </div>

      <p>{event.message}</p>

      <div className="live-event-meta">
        <span>
          <Radio size={15} />
          {event.zone}
        </span>
        <span>
          <Clock3 size={15} />
          {formatDate(event.startedAt)}
        </span>
        <span>
          <Activity size={15} />
          {waveText ?? (event.endsAt ? `Fin prévue ${formatDate(event.endsAt)}` : 'Durée inconnue')}
        </span>
      </div>
    </article>
  );
}

function RecentEventRow({ event }: { event: PublicLiveEvent }) {
  const meta = typeMeta[event.type] ?? typeMeta.announcement;
  const Icon = meta.icon;

  return (
    <li className={`live-log-row ${event.severity}`}>
      <span>
        <Icon size={16} />
      </span>
      <div>
        <strong>{event.title}</strong>
        <small>{event.zone} - {eventStatusText(event)} - {formatDate(event.endedAt ?? event.updatedAt)}</small>
      </div>
    </li>
  );
}

export function LiveEventsPanel({ initialFeed }: Props) {
  const fetchFeed = useCallback(async () => {
    const response = await fetch('/api/live-events', { cache: 'no-store' });
    if (!response.ok) throw new Error('Flux indisponible');
    const payload = (await response.json()) as PublicLiveEventsFeed;
    if (payload.source === 'fallback') throw new Error('Ressource FiveM indisponible');
    return payload;
  }, []);
  const polling = useSmartPolling({
    initialData: initialFeed,
    fetcher: fetchFeed,
    intervalMs: Number(process.env.NEXT_PUBLIC_POLL_TRANSMISSIONS_MS) || 60_000,
  });
  const feed = polling.data;
  const sourceLabel = polling.isOffline
    ? 'Flux hors ligne'
    : feed.source === 'fivem-resource'
      ? 'Ressource FiveM connectée'
      : 'Flux en attente';

  return (
    <section className="live-events-panel">
      <div className="live-events-status">
        <div>
          <span className={`live-dot${feed.active.length > 0 ? ' active' : ''}`} />
          <strong>{sourceLabel}</strong>
          <small>{polling.isStale ? 'Dernière donnée conservée' : `Màj ${formatDate(feed.lastCheckedAt)}`}</small>
        </div>
        <button className="live-refresh-button" type="button" onClick={() => void polling.refresh()} disabled={polling.isRefreshing}>
          <RefreshCw size={17} className={polling.isRefreshing ? 'is-spinning' : undefined} />
          {polling.isRefreshing ? 'Scan…' : 'Rafraîchir'}
        </button>
      </div>

      <div className="live-events-grid">
        <div className="live-active-column">
          <div className="section-header compact-section-header">
            <div>
              <span className="section-kicker">Terrain</span>
              <h2>Signaux actifs</h2>
            </div>
            <p>{feed.active.length} signal(aux) à surveiller pendant ta session.</p>
          </div>

          {feed.active.length > 0 ? (
            <div className="live-card-grid">
              {feed.active.map((event) => (
                <LiveEventCard event={event} key={event.id} />
              ))}
            </div>
          ) : (
            <article className="live-empty-state">
              <span className="card-icon">
                <AlertTriangle size={22} />
              </span>
              <h3>Aucun signal actif</h3>
              <p>
                Aucun signal important pour le moment. Reviens avant de partir en expédition ou garde
                un œil sur le Discord officiel.
              </p>
            </article>
          )}
        </div>

        <aside className="live-log-panel">
          <div className="section-header compact-section-header">
            <div>
              <span className="section-kicker">Historique</span>
              <h2>Derniers signaux</h2>
            </div>
          </div>

          {feed.recent.length > 0 ? (
            <ul className="live-log-list">
              {feed.recent.slice(0, 8).map((event) => (
                <RecentEventRow event={event} key={`${event.id}-${event.updatedAt}`} />
              ))}
            </ul>
          ) : (
            <p className="live-log-empty">Aucun signal terminé depuis le dernier redémarrage du flux.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
