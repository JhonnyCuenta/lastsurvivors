import { survivalChapters } from '@/config/site';

export default function GuidePage() {
  return (
    <>
      <header className="page-heading">
        <h1>Guide de survie</h1>
        <p>Les reflexes simples qui sauvent une expedition: preparation, discretion, gestion du loot et lecture du danger.</p>
      </header>

      <section className="guide-list">
        {survivalChapters.map((chapter) => (
          <article className="info-card guide-card" key={chapter.title}>
            <span className="card-icon">
              <chapter.icon size={22} />
            </span>
            <h3>{chapter.title}</h3>
            <ul>
              {chapter.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
