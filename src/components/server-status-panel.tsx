'use client';

import { RefreshCw, Server, Signal, Users } from 'lucide-react';
import { useCallback } from 'react';
import { CopyConnectButton } from '@/components/copy-connect-button';
import { useSmartPolling } from '@/hooks/use-smart-polling';
import type { PublicServerStatus } from '@/lib/server-status';
import { siteConfig } from '@/config/site';

const POLL_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_POLL_STATUS_MS) || 30_000;

const initialStatus: PublicServerStatus = {
  online: false,
  playersOnline: 0,
  maxPlayers: 0,
  hostname: 'LAST SURVIVORS',
  connectCommand: siteConfig.connectCommand,
  lastCheckedAt: '',
  source: 'fallback',
};

function formatTime(value: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(date);
}

export function ServerStatusPanel() {
  const fetchStatus = useCallback(async () => {
    const response = await fetch('/api/server-status', { cache: 'no-store' });
    if (!response.ok) throw new Error('Statut indisponible');
    const payload = (await response.json()) as PublicServerStatus;
    if (payload.source === 'fallback') throw new Error('Source FiveM indisponible');
    return payload;
  }, []);

  const polling = useSmartPolling({
    initialData: initialStatus,
    fetcher: fetchStatus,
    intervalMs: POLL_INTERVAL_MS,
  });
  const status = polling.data;
  const checkedAt = polling.lastSuccessAt ?? status.lastCheckedAt;
  const reliableCapacity = status.online && status.source !== 'fallback';
  const signalLabel = polling.isOffline
    ? 'Hors ligne'
    : polling.isStale
      ? 'Donnée conservée'
      : status.source === 'bot-api'
        ? 'Bot sécurisé'
        : status.source === 'fivem-dynamic'
          ? 'FiveM direct'
          : 'En attente';

  return (
    <section className="tn-status-panel" aria-label="État du serveur" aria-live="polite">
      <div className="tn-status-heading">
        <div>
          <span className={`tn-status-badge ${status.online ? 'is-online' : 'is-quiet'}`}>
            <span aria-hidden="true" />
            {status.online ? 'Serveur en ligne' : 'Signal indisponible'}
          </span>
          <h2>{status.hostname}</h2>
        </div>
        <button
          type="button"
          className="tn-icon-button"
          onClick={() => void polling.refresh()}
          aria-label="Rafraîchir le statut"
          disabled={polling.isRefreshing}
        >
          <RefreshCw size={18} className={polling.isRefreshing ? 'is-spinning' : undefined} />
        </button>
      </div>

      <div className="tn-status-metrics">
        <div>
          <Users size={19} aria-hidden="true" />
          <span>Survivants</span>
          <strong>{status.online ? status.playersOnline : '—'}</strong>
        </div>
        <div>
          <Server size={19} aria-hidden="true" />
          <span>Capacité</span>
          <strong>{reliableCapacity ? status.maxPlayers : '—'}</strong>
        </div>
        <div>
          <Signal size={19} aria-hidden="true" />
          <span>Source</span>
          <strong>{signalLabel}</strong>
        </div>
        <div>
          <RadioClock />
          <span>Relevé</span>
          <strong>{formatTime(checkedAt)}</strong>
        </div>
      </div>

      <div className="tn-connect-command">
        <span>Commande F8</span>
        <code>{status.connectCommand}</code>
        <CopyConnectButton className="button button-primary" />
      </div>
    </section>
  );
}

function RadioClock() {
  return <span className="tn-clock-glyph" aria-hidden="true">UTC+2</span>;
}
