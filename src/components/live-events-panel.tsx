'use client';

import { useCallback, useEffect, useState } from 'react';
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

type Props = {
  initialFeed: PublicLiveEventsFeed;
};

const typeMeta: Record<PublicLiveEventType, { label: string; icon: LucideIcon }> = {
  airdrop: { label: 'Airdrop', icon: PackageOpen },
  horde: { label: 'Horde', icon: Skull },
  blackout: { label: 'Blackout', icon: Zap },
  storm: { label: 'Tempete', icon: CloudLightning },
  announcement: { label: 'Annonce', icon: Radio },
};

function formatDate(value?: string) {
  if (!value) return 'signal recent';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'signal recent';

  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  }).format(date);
}

function formatCountdown(value?: string) {
  if (!value) return 'duree inconnue';
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return 'duree inconnue';

  const diff = time - Date.now();
  if (diff <= 0) return 'fin proche';

  const minutes = Math.ceil(diff / 60000);
  if (minutes < 60) return `${minutes} min restantes`;
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')} restantes`;
}

function eventStatusText(event: PublicLiveEvent) {
  if (event.status === 'announcing') return 'Annonce en cours';
  if (event.status === 'scheduled') return 'Programme';
  if (event.status === 'success' || event.status === 'completed') return 'Termine';
  if (event.status === 'cancelled') return 'Annule';
  if (event.status === 'failed') return 'Echec';
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
          {waveText ?? formatCountdown(event.endsAt)}
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
  const [feed, setFeed] = useState(initialFeed);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/live-events', { cache: 'no-store' });
      if (!response.ok) throw new Error('live feed unavailable');
      const nextFeed = (await response.json()) as PublicLiveEventsFeed;
      setFeed(nextFeed);
      setLastError(false);
    } catch {
      setLastError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(refresh, 15000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const sourceLabel = feed.source === 'fivem-resource' ? 'Ressource FiveM connectee' : 'Flux en attente';

  return (
    <section className="live-events-panel">
      <div className="live-events-status">
        <div>
          <span className={`live-dot${feed.active.length > 0 ? ' active' : ''}`} />
          <strong>{sourceLabel}</strong>
          <small>{lastError ? 'Derniere lecture echouee' : `Maj ${formatDate(feed.lastCheckedAt)}`}</small>
        </div>
        <button className="live-refresh-button" type="button" onClick={refresh} disabled={loading}>
          <RefreshCw size={17} />
          {loading ? 'Scan...' : 'Rafraichir'}
        </button>
      </div>

      <div className="live-events-grid">
        <div className="live-active-column">
          <div className="section-header compact-section-header">
            <div>
              <span className="section-kicker">Terrain</span>
              <h2>Events actifs</h2>
            </div>
            <p>{feed.active.length} signal(s) public(s), sans position joueur ni inventaire.</p>
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
              <h3>Aucun event actif</h3>
              <p>
                Le site attend le prochain airdrop ou la prochaine horde. Si tu viens d installer le flux, redemarre
                <code> lsv_live_events</code>, <code>airdrop_apoc</code> et <code>hrs_zombies_horde</code>.
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
            <p className="live-log-empty">Aucun event termine depuis le dernier redemarrage du flux.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
