import { AlertTriangle, MapPinned, Radio, Shield, Skull } from 'lucide-react';

const timeline = [
  {
    year: 'Jour 0',
    title: 'La Chute',
    text: 'Les sirenes ont couvert Los Santos pendant une nuit entiere. Les secours ont disparu avant le matin.',
  },
  {
    year: 'Semaine 2',
    title: 'Les premieres hordes',
    text: 'Les quartiers bruyants sont tombes les premiers. Ceux qui ont survecu ont appris a parler bas, marcher vite et fermer les portes.',
  },
  {
    year: 'Mois 1',
    title: 'La Zone',
    text: 'Des points de regroupement se sont formes autour de stocks, radios et abris improvises. Les alliances ont remplace les lois.',
  },
  {
    year: 'Aujourd hui',
    title: 'Last Survivors',
    text: 'Chaque survivant arrive avec ses pertes, ses dettes et ses secrets. La ville ne pardonne pas les erreurs.',
  },
];

const factions = [
  {
    title: 'Les Survivants',
    icon: Shield,
    text: 'Groupes, familles improvisees, solitaires armes de prudence. Ils cherchent de quoi durer un jour de plus.',
  },
  {
    title: 'Les Charognards',
    icon: Skull,
    text: 'Ils suivent le bruit, les incendies et les convois. Une caisse ouverte trop longtemps devient une invitation.',
  },
  {
    title: 'Les Radios',
    icon: Radio,
    text: 'Rumeurs, appels a l aide, fausses coordonnees et vraies menaces. La frequence est utile, jamais innocente.',
  },
];

export default function LorePage() {
  return (
    <>
      <header className="page-heading lore-heading">
        <span className="hero-badge">
          <span className="pulse-dot" />
          Archives de la Zone
        </span>
        <h1>Lore</h1>
        <p>
          Last Survivors se joue dans une ville fracturee, ou chaque scene RP doit sentir la survie, la peur et les
          choix difficiles.
        </p>
      </header>

      <section className="lore-brief">
        <article className="lore-statement">
          <span className="card-icon">
            <AlertTriangle size={22} />
          </span>
          <h2>Le monde n est pas mort. Il attend.</h2>
          <p>
            Les routes sont encore la. Les immeubles tiennent encore debout. Mais tout ce qui rendait la ville normale a
            disparu: securite, confiance, abondance. Dans Last Survivors, le vrai danger n est pas seulement la horde.
            C est ce que les vivants acceptent de devenir pour survivre.
          </p>
        </article>
        <article className="lore-coordinate">
          <MapPinned size={34} />
          <span>Zone publique</span>
          <strong>Los Santos / Blaine County</strong>
          <p>Carte RP ouverte, lieux sensibles masques, informations staff protegees.</p>
        </article>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Chronologie</span>
            <h2>Ce que les survivants racontent</h2>
          </div>
          <p>Ce lore sert de base RP. Les details peuvent evoluer avec les evenements serveur et les decisions joueurs.</p>
        </div>
        <div className="lore-timeline">
          {timeline.map((entry) => (
            <article className="lore-entry" key={entry.title}>
              <span>{entry.year}</span>
              <h3>{entry.title}</h3>
              <p>{entry.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Forces en presence</span>
            <h2>Allies, menaces, rumeurs</h2>
          </div>
        </div>
        <div className="card-grid">
          {factions.map((faction) => (
            <article className="info-card" key={faction.title}>
              <span className="card-icon">
                <faction.icon size={22} />
              </span>
              <h3>{faction.title}</h3>
              <p>{faction.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
