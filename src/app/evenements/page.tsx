import { CalendarDays, CloudLightning, ExternalLink, MapPin, PackageOpen, Radio, Skull, Users, Zap } from 'lucide-react';
import { LiveEventsPanel } from '@/components/live-events-panel';
import { getLiveEvents } from '@/lib/live-events';
import { getScheduledEvents } from '@/lib/scheduled-events';

export const dynamic = 'force-dynamic';

const eventTypes = [
  {
    title: 'Airdrops',
    icon: PackageOpen,
    tone: 'high',
    text: 'Caisses signalees en zone ouverte. Arrive equipe, reste mobile et repars avant que la situation se ferme.',
  },
  {
    title: 'Hordes',
    icon: Skull,
    tone: 'critical',
    text: 'Vagues de morts-vivants, appels radio et zones a eviter si tu n es pas pret.',
  },
  {
    title: 'Blackouts',
    icon: Zap,
    tone: 'medium',
    text: 'Coupures, rues plus sombres et trajets plus tendus pour les scenes nocturnes.',
  },
  {
    title: 'Tempetes',
    icon: CloudLightning,
    tone: 'medium',
    text: 'Conditions difficiles, visibilite reduite et bonnes raisons de se mettre a couvert.',
  },
];

export default async function EvenementsPage() {
  const [initialFeed, scheduledEvents] = await Promise.all([getLiveEvents(), getScheduledEvents()]);

  return (
    <>
      <section className="events-hero">
        <div className="events-hero-copy">
          <h1>Events live</h1>
          <p>
            Airdrops, hordes et alertes terrain en temps reel. Consulte les signaux avant de sortir, rejoindre un convoi
            ou prendre une route trop calme pour etre honnete.
          </p>
        </div>
        <aside className="events-signal-card">
          <span className="section-kicker">Radio Last Survivors</span>
          <strong>{initialFeed.active.length > 0 ? `${initialFeed.active.length} event(s) actif(s)` : 'Canal en veille'}</strong>
          <p>
            Les prochains mouvements importants apparaitront ici pendant les sessions.
          </p>
          <div>
            <Radio size={18} />
            <span>Transmission terrain</span>
          </div>
        </aside>
      </section>

      <LiveEventsPanel initialFeed={initialFeed} />

      <section className="section scheduled-events-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Planning RP</span>
            <h2>Events organises a venir</h2>
          </div>
          <p>
            Les events planifies apparaissent ici. Si Discord ne renvoie rien, le site garde les prochains formats RP
            prevus comme repere.
          </p>
        </div>

        <div className="scheduled-events-grid">
          {scheduledEvents.map((event) =>
            event.url ? (
              <a className="scheduled-event-card" href={event.url} key={event.id} target="_blank" rel="noreferrer">
                <span className="scheduled-event-type">{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
                <div className="scheduled-event-meta">
                  <span>
                    <CalendarDays size={15} />
                    {event.schedule}
                  </span>
                  <span>
                    <MapPin size={15} />
                    {event.location}
                  </span>
                  {event.playersInterested ? (
                    <span>
                      <Users size={15} />
                      {event.playersInterested} interesse(s)
                    </span>
                  ) : null}
                  <span>
                    Discord <ExternalLink size={15} />
                  </span>
                </div>
              </a>
            ) : (
              <article className="scheduled-event-card" key={event.id}>
                <span className="scheduled-event-type">{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
                <div className="scheduled-event-meta">
                  <span>
                    <CalendarDays size={15} />
                    {event.schedule}
                  </span>
                  <span>
                    <MapPin size={15} />
                    {event.location}
                  </span>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="event-type-grid section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Types de signal</span>
            <h2>Ce que les joueurs peuvent suivre</h2>
          </div>
          <p>
            Les signaux restent courts et pratiques: assez d informations pour reagir, pas assez pour casser le RP.
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
        <div>
          <h2>Conseil de survivant</h2>
          <p>
            Un event n est pas juste un point sur une carte. Prends de l eau, un soin, du carburant, un plan de sortie
            et quelqu un capable de parler si les choses tournent mal.
          </p>
        </div>
      </section>
    </>
  );
}
