'use client';

import { RefreshCw, Server, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CopyConnectButton } from '@/components/copy-connect-button';
import type { PublicServerStatus } from '@/lib/server-status';
import { siteConfig } from '@/config/site';

const initialStatus: PublicServerStatus = {
  online: false,
  playersOnline: 0,
  maxPlayers: 64,
  hostname: 'LAST SURVIVORS',
  connectCommand: siteConfig.connectCommand,
  lastCheckedAt: '',
  source: 'fallback',
};

function formatTime(value: string) {
  if (!value) return '--';
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value));
}

export function ServerStatusPanel() {
  const [status, setStatus] = useState<PublicServerStatus>(initialStatus);
  const [loading, setLoading] = useState(true);

  async function loadStatus() {
    setLoading(true);
    try {
      const response = await fetch('/api/server-status', { cache: 'no-store' });
      if (response.ok) setStatus(await response.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatus();
    const interval = window.setInterval(loadStatus, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="status-panel" aria-label="Statut serveur">
      <div className="status-top">
        <div>
          <span className={`status-dot${status.online ? ' online' : ''}`}>
            {status.online ? 'Serveur en ligne' : 'Statut indisponible'}
          </span>
          <h2 style={{ margin: '14px 0 0', fontSize: '1.55rem' }}>{status.hostname}</h2>
        </div>
        <button type="button" className="button button-ghost" onClick={loadStatus} aria-label="Rafraichir">
          <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="status-grid">
        <div className="metric">
          <span>Survivants en ligne</span>
          <strong>
            <Users size={20} style={{ display: 'inline', marginRight: 8 }} />
            {status.playersOnline}
          </strong>
        </div>
        <div className="metric">
          <span>Capacite</span>
          <strong>
            <Server size={20} style={{ display: 'inline', marginRight: 8 }} />
            {status.maxPlayers}
          </strong>
        </div>
        <div className="metric">
          <span>Source</span>
          <strong style={{ fontSize: '1rem' }}>{status.source === 'fivem-dynamic' ? 'FiveM public' : 'Fallback'}</strong>
        </div>
        <div className="metric">
          <span>Dernier check</span>
          <strong style={{ fontSize: '1rem' }}>{formatTime(status.lastCheckedAt)}</strong>
        </div>
      </div>

      <div className="connect-line">
        <code>{status.connectCommand}</code>
        <CopyConnectButton className="button button-secondary" compact={false} />
      </div>
    </section>
  );
}
