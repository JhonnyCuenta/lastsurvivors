import { AlertTriangle, CloudLightning, PackageOpen, Radio, Skull, Zap } from 'lucide-react';
import { LiveEventsPanel } from '@/components/live-events-panel';
import { getLiveEvents } from '@/lib/live-events';

export const dynamic = 'force-dynamic';

const eventTypes = [
  {
    title: 'Airdrops',
    icon: PackageOpen,
    tone: 'high',
    text: 'Caisses publiques signalees par le script airdrop. Le site affiche la zone, jamais les joueurs.',
  },
  {
    title: 'Hordes',
    icon: Skull,
    tone: 'critical',
    text: 'Vagues zombies suivies en direct: annonce, debut, vague active et fin de l evenement.',
  },
  {
    title: 'Blackouts',
    icon: Zap,
    tone: 'medium',
    text: 'Pret pour les coupures et phases de tension. Le flux accepte deja ce type de signal public.',
  },
  {
    title: 'Tempetes',
    icon: CloudLightning,
    tone: 'medium',
    text: 'Alertes meteo ou environnementales affichables sans modifier les donnees staff.',
  },
];

export default async function EvenementsPage() {
  const initialFeed = await getLiveEvents();

  return (
    <>
      <section className="events-hero">
        <div className="events-hero-copy">
          <h1>Events live</h1>
          <p>
            Airdrops, hordes et alertes terrain en temps reel. Le portail reste public: il affiche les signaux utiles
            aux survivants, sans noms de joueurs, positions sensibles ni outils staff.
          </p>
        </div>
        <aside className="events-signal-card">
          <span className="section-kicker">Radio Last Survivors</span>
          <strong>{initialFeed.active.length > 0 ? `${initialFeed.active.length} event(s) actif(s)` : 'Canal en veille'}</strong>
          <p>
            Le site interroge <code>/api/live-events</code>, qui lit la ressource FiveM <code>lsv_live_events</code>.
          </p>
          <div>
            <Radio size={18} />
            <span>Lecture seule publique</span>
          </div>
        </aside>
      </section>

      <LiveEventsPanel initialFeed={initialFeed} />

      <section className="event-type-grid section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Types de signal</span>
            <h2>Ce que les joueurs peuvent suivre</h2>
          </div>
          <p>
            Les airdrops et hordes sont branches. Les blackouts, tempetes ou annonces RP pourront utiliser le meme
            flux plus tard.
          </p>
        </div>

        <div className="event-type-list">
          {eventTypes.map((event) => (
            <article className={`event-type-card ${event.tone}`} key={event.title}>
              <span className="card-icon">
                <event.icon size={22} />
              </span>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="event-safety-panel section">
        <span className="card-icon">
          <AlertTriangle size={22} />
        </span>
        <div>
          <h2>Infos publiques uniquement</h2>
          <p>
            Le flux ne donne pas les coordonnees exactes, ne liste pas les joueurs, ne montre pas les inventaires et ne
            lance aucun event depuis le site. Tout reste controle cote serveur FiveM.
          </p>
        </div>
      </section>
    </>
  );
}
