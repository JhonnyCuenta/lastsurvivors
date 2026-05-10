import { eventCards } from '@/config/site';

export default function EvenementsPage() {
  return (
    <>
      <header className="page-heading">
        <h1>Evenements</h1>
        <p>Airdrops, blackouts, operations RP et alertes terrain. Consulte aussi Discord pour les horaires exacts.</p>
      </header>

      <section className="events-list">
        {eventCards.map((event) => (
          <article className="event-row" key={event.title}>
            <span className="card-icon">
              <event.icon size={22} />
            </span>
            <div>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </div>
            <span className="event-schedule">{event.schedule}</span>
          </article>
        ))}
      </section>
    </>
  );
}
