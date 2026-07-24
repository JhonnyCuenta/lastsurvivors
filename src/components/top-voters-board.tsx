'use client';

import { useCallback, useMemo } from 'react';
import { AlertTriangle, Clock3, Gift, Radio, RefreshCw, ShieldCheck, Trophy, Vote } from 'lucide-react';
import { VoteLaunchPanel } from '@/components/vote-launch-panel';
import type { PublicTopVotersFeed } from '@/lib/top-voters';
import { useSmartPolling } from '@/hooks/use-smart-polling';

type Props = {
  initialFeed: PublicTopVotersFeed;
  voteUrl: string;
};

const REFRESH_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_POLL_VOTES_MS) || 120_000;

const rewardPreview = [
  { label: 'Eau', amount: '3x', type: 'Survie' },
  { label: 'Bois', amount: '10x', type: 'Craft' },
  { label: 'Bandage', amount: '1x', type: 'Soin' },
  { label: 'Crochet', amount: '1x', type: 'Rare' },
  { label: 'Planche', amount: '15x', type: 'Construction' },
];

const voteSteps = [
  'Entre ton pseudo FiveM exact sur le site.',
  'Vote sur Top-Serveurs avec ce pseudo.',
  'Connecte-toi au serveur Last Survivors.',
  'Va voir le PNJ de vote et recupere tes recompenses.',
];

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'verification recente';

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(date);
}

function safeFeed(payload: unknown, fallback: PublicTopVotersFeed): PublicTopVotersFeed {
  const data = payload && typeof payload === 'object' ? (payload as Partial<PublicTopVotersFeed>) : {};

  if (!Array.isArray(data.voters)) return fallback;

  return {
    voters: data.voters.slice(0, 10).map((voter, index) => ({
      rank: Number.isFinite(voter.rank) ? voter.rank : index + 1,
      playername: typeof voter.playername === 'string' && voter.playername.trim() ? voter.playername : 'Survivant',
      votes: Number.isFinite(voter.votes) ? Math.max(0, Math.round(voter.votes)) : 0,
      lastVoteAt: typeof voter.lastVoteAt === 'string' ? voter.lastVoteAt : undefined,
    })),
    lastCheckedAt: typeof data.lastCheckedAt === 'string' ? data.lastCheckedAt : new Date().toISOString(),
    source: data.source === 'fivem-resource' ? 'fivem-resource' : 'fallback',
  };
}

export function TopVotersBoard({ initialFeed, voteUrl }: Props) {
  const fetchFeed = useCallback(async () => {
    const response = await fetch('/api/top-voters', {
      cache: 'no-store',
      headers: { accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Classement indisponible');
    const payload = safeFeed(await response.json(), initialFeed);
    if (payload.source === 'fallback') throw new Error('Classement FiveM indisponible');
    return payload;
  }, [initialFeed]);
  const polling = useSmartPolling({
    initialData: initialFeed,
    fetcher: fetchFeed,
    intervalMs: REFRESH_INTERVAL_MS,
  });
  const feed = polling.data;
  const leader = feed.voters[0];
  const totalVotes = useMemo(() => feed.voters.reduce((sum, voter) => sum + voter.votes, 0), [feed.voters]);
  const clientCheckedAt = polling.lastSuccessAt ?? feed.lastCheckedAt;

  return (
    <>
      <section className="vote-hero">
        <div className="vote-hero-copy">
          <h1>Top Vote</h1>
          <p>
            Vote pour Last Survivors, aide le serveur a monter dans le classement Top-Serveurs et recupere tes
            recompenses directement en jeu.
          </p>
          <VoteLaunchPanel voteUrl={voteUrl} />
        </div>

        <aside className="vote-terminal" aria-label="Etat du classement vote">
          <div className="vote-terminal-head">
            <span className="section-kicker">Signal recompense</span>
            <span className={`vote-live-badge ${feed.source === 'fivem-resource' ? 'is-live' : 'is-fallback'}`}>
              {feed.source === 'fivem-resource' ? 'Live FiveM' : 'Secours'}
            </span>
          </div>
          <strong>{leader ? leader.playername : 'Aucun voteur'}</strong>
          <p>
            {leader ? `${leader.votes} vote(s) en tete du classement` : 'Le classement attend les prochains votes publics.'}
          </p>
          <div className="vote-terminal-grid">
            <span>
              <Trophy size={18} />
              {feed.voters.length} voteur(s)
            </span>
            <span>
              <Vote size={18} />
              {totalVotes} vote(s)
            </span>
            <span>
              <Clock3 size={18} />
              {formatDate(clientCheckedAt)}
            </span>
          </div>
        </aside>
      </section>

      <section className="vote-grid section">
        <div className="vote-ranking">
          <div className="section-header vote-section-header">
            <div>
              <span className="section-kicker">Classement public</span>
              <h2>Meilleurs voteurs</h2>
            </div>
            <div className="vote-refresh-box">
              <p>
                Lecture depuis le script récompense. Le site actualise le tableau toutes les deux minutes
                et ralentit automatiquement en cas de panne.
              </p>
              <button className="vote-refresh-button" type="button" onClick={() => void polling.refresh()} disabled={polling.isRefreshing}>
                <RefreshCw size={16} className={polling.isRefreshing ? 'is-spinning' : undefined} />
                {polling.isRefreshing ? 'Mise à jour…' : 'Rafraîchir'}
              </button>
            </div>
          </div>

          {polling.isStale ? (
            <p className="vote-inline-error">
              {polling.isOffline
                ? 'Classement hors ligne après cinq tentatives.'
                : 'Dernier classement valide conservé.'}
            </p>
          ) : null}

          {feed.voters.length > 0 ? (
            <ol className="vote-rank-list">
              {feed.voters.map((voter) => (
                <li className={`vote-rank-row${voter.rank <= 3 ? ' podium' : ''}`} key={`${voter.rank}-${voter.playername}`}>
                  <span className="vote-rank-number">{voter.rank}</span>
                  <div>
                    <strong>{voter.playername}</strong>
                    <span>{voter.lastVoteAt ? `Dernier vote: ${formatDate(voter.lastVoteAt)}` : 'Vote enregistre'}</span>
                  </div>
                  <em>{voter.votes} vote(s)</em>
                </li>
              ))}
            </ol>
          ) : (
            <article className="vote-empty">
              <span className="card-icon">
                <AlertTriangle size={22} />
              </span>
              <h3>Classement en attente</h3>
              <p>
                Aucun total public n est encore disponible. Redemarre <code>voterecompense</code>, verifie que le plugin
                Top-Serveurs recoit les votes, puis les prochains votes rempliront ce classement.
              </p>
            </article>
          )}
        </div>

        <aside className="vote-side-stack">
          <article className="vote-card">
            <span className="card-icon">
              <Gift size={22} />
            </span>
            <h3>Recompenses possibles</h3>
            <div className="vote-reward-list">
              {rewardPreview.map((reward) => (
                <span key={reward.label}>
                  <strong>{reward.amount}</strong>
                  {reward.label}
                  <small>{reward.type}</small>
                </span>
              ))}
            </div>
          </article>

          <article className="vote-card">
            <span className="card-icon">
              <Radio size={22} />
            </span>
            <h3>Comment ca marche</h3>
            <ol className="vote-step-list">
              {voteSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>

          <article className="vote-card muted-card">
            <span className="card-icon">
              <ShieldCheck size={22} />
            </span>
            <h3>Controle serveur</h3>
            <p>
              La page lit seulement un top public. Les rewards restent controles cote serveur par <code>onPlayerVote</code> et
              par le PNJ de recuperation en jeu.
            </p>
          </article>
        </aside>
      </section>
    </>
  );
}
