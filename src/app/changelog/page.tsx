import { CalendarDays, CheckCircle2, Radio } from 'lucide-react';
import { roadmapItems } from '@/config/site';
import { getPortalChangelog } from '@/lib/bot-portal';

export const dynamic = 'force-dynamic';

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'date inconnue';
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  }).format(date);
}

export default async function ChangelogPage() {
  const changelogResult = await getPortalChangelog(10);
  const entries = changelogResult.ok ? changelogResult.data : [];

  return (
    <>
      <header className="page-heading">
        <span className="tn-eyebrow">Dossier / évolution</span>
        <h1>Journal du réseau</h1>
        <p>
          Les mises à jour publiques confirmées par le bot, puis la feuille de route éditoriale
          clairement séparée.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Source bot</span>
            <h2>Changements publiés</h2>
          </div>
        </div>
        {entries.length > 0 ? (
          <div className="tn-changelog-grid">
            {entries.map((entry) => (
              <article key={entry.id}>
                <span>{entry.version} · {formatDate(entry.publishedAt)}</span>
                <h3>{entry.title}</h3>
                <p>{entry.changed || entry.added || entry.fixed || entry.removed || 'Mise à jour publiée.'}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="tn-empty-state">
            <Radio size={24} aria-hidden="true" />
            <div>
              <h3>Aucune note publique reçue</h3>
              <p>Le canal reste vide tant que l’API HTTPS du bot n’est pas configurée ou ne publie rien.</p>
            </div>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Feuille de route</span>
            <h2>État des systèmes</h2>
          </div>
          <p>Ces éléments décrivent le portail ; ils ne sont pas présentés comme un changelog en direct.</p>
        </div>
        <div className="roadmap-timeline">
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
        </div>
      </section>

      <section className="section premium-card-grid">
        <article className="premium-feature-card">
          <span className="card-icon"><CheckCircle2 size={22} /></span>
          <h3>Contrats conservés</h3>
          <p>Support, candidature, OAuth, votes, photos Discord et statut FiveM restent compatibles.</p>
        </article>
        <article className="premium-feature-card">
          <span className="card-icon"><CalendarDays size={22} /></span>
          <h3>Sources honnêtes</h3>
          <p>Les événements manuels de secours ont été retirés au profit d’un état vide explicite.</p>
        </article>
      </section>
    </>
  );
}
