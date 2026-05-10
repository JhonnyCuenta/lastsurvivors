import { rules } from '@/config/site';

export default function ReglementPage() {
  return (
    <>
      <header className="page-heading">
        <h1>Reglement</h1>
        <p>Des regles claires pour garder un RP dur, juste et jouable. En cas de doute, ouvre un ticket staff.</p>
      </header>

      <section className="rule-list">
        {rules.map((rule) => (
          <article className="rule-panel" key={rule.title}>
            <span className="card-icon">
              <rule.icon size={22} />
            </span>
            <h3>{rule.title}</h3>
            <ul>
              {rule.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
