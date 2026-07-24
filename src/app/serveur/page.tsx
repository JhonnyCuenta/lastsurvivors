import Link from 'next/link';
import { ArrowRight, CalendarDays, HeartPulse, Map, Radio, Skull, Store, Users } from 'lucide-react';
import { MapOverview } from '@/components/map-overview';
import { factionPreviews } from '@/config/site';

const pillars = [
  {
    title: 'Survie lisible',
    text: 'Faim, blessures, carburant, bruit et routes dangereuses doivent compter sans transformer le serveur en punition permanente.',
    icon: HeartPulse,
  },
  {
    title: 'RP de groupe',
    text: 'Les factions, convois, médecins et indépendants donnent des raisons de parler avant de tirer.',
    icon: Users,
  },
  {
    title: 'Events terrain',
    text: 'Airdrops, hordes, alertes et opérations créent des points chauds sans forcer tous les joueurs au même style.',
    icon: Radio,
  },
  {
    title: 'Progression propre',
    text: 'La boutique, les votes et les récompenses doivent soutenir le jeu, pas remplacer les scènes.',
    icon: Store,
  },
];

export default function ServeurPage() {
  return (
    <>
      <section className="server-hero">
        <div>
          <span className="section-kicker">Identité du serveur</span>
          <h1>Un GTA RP post-apo plus crédible, moins brouillon</h1>
          <p>
            Last Survivors mise sur une ambiance sombre, des décisions simples à comprendre et des scènes qui laissent
            une trace. Ici, survivre vaut mieux que gagner vite.
          </p>
          <div className="premium-actions">
            <Link className="button button-primary" href="/jouer">
              Rejoindre <ArrowRight size={18} />
            </Link>
            <Link className="button button-secondary" href="/lore">
              Lire le lore <Skull size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section premium-card-grid">
        {pillars.map((pillar) => (
          <article className="premium-feature-card" key={pillar.title}>
            <span className="card-icon">
              <pillar.icon size={22} />
            </span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </section>

      <section className="section split-showcase">
        <div>
          <span className="section-kicker">Métiers & factions</span>
          <h2>Des rôles pour créer du jeu</h2>
          <p>
            Les groupes ci-dessous donnent une direction, pas une prison. Chaque joueur peut construire sa réputation
            par ses alliances, ses dettes, ses services ou ses erreurs.
          </p>
          <div className="showcase-actions">
            <Link className="button button-primary" href="/support">
              Proposer un projet <ArrowRight size={18} />
            </Link>
            <Link className="button button-secondary" href="/reglement">
              Cadre RP <CalendarDays size={18} />
            </Link>
          </div>
        </div>

        <div className="faction-mini-grid">
          {factionPreviews.map((faction) => (
            <article key={faction.name}>
              <span>{faction.role}</span>
              <h3>{faction.name}</h3>
              <p>{faction.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Carte</span>
            <h2>Les grands repères</h2>
          </div>
          <p>Une lecture rapide des zones utiles avant une sortie, un convoi ou une première arrivée.</p>
        </div>
        <MapOverview compact />
        <div className="showcase-actions section-actions">
          <Link className="button button-secondary" href="/carte">
            Ouvrir la carte complète <Map size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
