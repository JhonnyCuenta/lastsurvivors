'use client';

import { AlertTriangle, MapPin, Radio, RefreshCw } from 'lucide-react';
import { useCallback } from 'react';
import { useSmartPolling } from '@/hooks/use-smart-polling';
import type { TransmissionFeed } from '@/types/portal';

const POLL_INTERVAL_MS =
  Number(process.env.NEXT_PUBLIC_POLL_TRANSMISSIONS_MS) || 60_000;

function formatTransmissionDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'heure inconnue';
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(date);
}

export function TransmissionFeedPanel({ initialFeed }: { initialFeed: TransmissionFeed }) {
  const fetchFeed = useCallback(async () => {
    const response = await fetch('/api/transmissions', { cache: 'no-store' });
    if (!response.ok) throw new Error('Transmissions indisponibles');
    const payload = (await response.json()) as TransmissionFeed;
    if (payload.source === 'unavailable') throw new Error('Bot indisponible');
    return payload;
  }, []);

  const polling = useSmartPolling({
    initialData: initialFeed,
    fetcher: fetchFeed,
    intervalMs: POLL_INTERVAL_MS,
  });
  const feed = polling.data;
  const stateLabel = polling.isOffline
    ? 'Canal hors ligne'
    : polling.isStale
      ? 'Dernière réception conservée'
      : feed.source === 'bot-api'
        ? 'Liaison bot vérifiée'
        : feed.source === 'unconfigured'
          ? 'Liaison à configurer'
          : 'Liaison indisponible';

  return (
    <section className="tn-transmissions" aria-labelledby="transmissions-title">
      <div className="tn-section-heading">
        <div>
          <span className="tn-eyebrow">
            <Radio size={15} aria-hidden="true" />
            Fréquence 07
          </span>
          <h2 id="transmissions-title">Transmissions reçues</h2>
          <p>Uniquement les informations publiques émises par les systèmes du serveur.</p>
        </div>
        <div className="tn-feed-controls">
          <span className={feed.source === 'bot-api' && !polling.isOffline ? 'is-linked' : ''}>
            {stateLabel}
          </span>
          <button
            className="tn-icon-button"
            type="button"
            onClick={() => void polling.refresh()}
            disabled={polling.isRefreshing}
            aria-label="Rafraîchir les transmissions"
          >
            <RefreshCw size={18} className={polling.isRefreshing ? 'is-spinning' : undefined} />
          </button>
        </div>
      </div>

      {feed.transmissions.length > 0 ? (
        <div className="tn-report-grid">
          {feed.transmissions.slice(0, 6).map((item) => (
            <article className={`tn-report-card severity-${item.severity}`} key={item.id}>
              <header>
                <span>{item.kind}</span>
                <time dateTime={item.publishedAt}>{formatTransmissionDate(item.publishedAt)}</time>
              </header>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <footer>
                <span>
                  <MapPin size={14} aria-hidden="true" />
                  {item.zone || 'Zone non communiquée'}
                </span>
                <strong>{item.status}</strong>
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="tn-empty-state" role="status">
          <AlertTriangle size={24} aria-hidden="true" />
          <div>
            <h3>Aucune transmission publique</h3>
            <p>
              Aucun message n’est inventé. Le canal restera vide jusqu’à la connexion HTTPS du bot
              ou la publication d’un signal public.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
