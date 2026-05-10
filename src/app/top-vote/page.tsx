import { AlertTriangle, Clock3, Gift, Radio, ShieldCheck, Trophy, Vote } from 'lucide-react';
import { VoteLaunchPanel } from '@/components/vote-launch-panel';
import { publicLinks } from '@/config/site';
import { getTopVoters } from '@/lib/top-voters';

export const dynamic = 'force-dynamic';

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
  }).format(date);
}

export default async function TopVotePage() {
  const feed = await getTopVoters();
  const leader = feed.voters[0];
  const totalVotes = feed.voters.reduce((sum, voter) => sum + voter.votes, 0);

  return (
    <>
      <section className="vote-hero">
        <div className="vote-hero-copy">
          <h1>Top Vote</h1>
          <p>
            Vote pour Last Survivors, aide le serveur a monter dans le classement Top-Serveurs et recupere tes
            recompenses directement en jeu.
          </p>
          <VoteLaunchPanel voteUrl={publicLinks.voteUrl} />
        </div>

        <aside className="vote-terminal" aria-label="Etat du classement vote">
          <span className="section-kicker">Signal recompense</span>
          <strong>{leader ? leader.playername : 'Aucun voteur'}</strong>
          <p>{leader ? `${leader.votes} vote(s) en tete du classement` : 'Le classement attend les prochains votes publics.'}</p>
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
              {formatDate(feed.lastCheckedAt)}
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
            <p>
              Lecture seule depuis le script recompense. Le site ne donne aucun item et ne modifie jamais la base de
              donnees.
            </p>
          </div>

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
                Aucun total public n est encore disponible. Redemarre <code>voterecompense</code>, verifie que le
                plugin Top-Serveurs recoit les votes, puis les prochains votes rempliront ce classement.
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
            <h3>Securite</h3>
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
