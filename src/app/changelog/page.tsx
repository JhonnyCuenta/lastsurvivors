import { CalendarDays, CheckCircle2, Hammer, Radio } from 'lucide-react';
import { roadmapItems } from '@/config/site';

export default function ChangelogPage() {
  return (
    <>
      <header className="page-heading">
        <h1>Roadmap</h1>
        <p>Les nouveautes du portail et les prochaines ameliorations prevues pour la communaute Last Survivors.</p>
      </header>

      <section className="roadmap-timeline">
        {roadmapItems.map((item, index) => (
          <article className="roadmap-item" key={item.title}>
            <span className="roadmap-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{item.status}</strong>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="section premium-card-grid">
        <article className="premium-feature-card">
          <span className="card-icon">
            <CheckCircle2 size={22} />
          </span>
          <h3>Deja actif</h3>
          <p>Statut serveur, events live, votes, galerie Discord, boutique, profil, support et candidature staff.</p>
        </article>
        <article className="premium-feature-card">
          <span className="card-icon">
            <Hammer size={22} />
          </span>
          <h3>En construction</h3>
          <p>Dashboard connecte, support par ticket et raccourcis utiles pour les joueurs.</p>
        </article>
        <article className="premium-feature-card">
          <span className="card-icon">
            <CalendarDays size={22} />
          </span>
          <h3>A planifier</h3>
          <p>Events organises a venir, lus depuis Discord quand les evenements sont planifies.</p>
        </article>
        <article className="premium-feature-card">
          <span className="card-icon">
            <Radio size={22} />
          </span>
          <h3>Communaute</h3>
          <p>Les priorites evoluent avec les retours joueurs et les besoins du serveur.</p>
        </article>
      </section>
    </>
  );
}
