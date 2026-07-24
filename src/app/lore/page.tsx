import {
  AlertTriangle,
  Biohazard,
  Building2,
  Crosshair,
  FlaskConical,
  Hammer,
  HeartPulse,
  MapPinned,
  Microscope,
  Radio,
  Shield,
  Skull,
  Users,
  Zap,
} from 'lucide-react';

const chronicle = [
  {
    year: '2026',
    label: 'Les premices',
    icon: FlaskConical,
    lead:
      'Face a plusieurs epidemies mondiales, les scientifiques de Human Labs and Research lancent des recherches sur des virus anciens et inconnus.',
    official: "Officiellement, il s'agit de proteger l'humanite.",
    hidden: "Officieusement, quelque chose d'autre se prepare dans les niveaux les plus fermes du laboratoire.",
    bullets: ["Naissance de Nexus dans l'ombre", 'Scientifiques, militaires et elites influentes', 'Objectif reel inconnu'],
  },
  {
    year: '2028',
    label: 'Projet OMEGA',
    icon: Microscope,
    lead: 'En deux ans, Nexus prend le controle total de Human Labs et lance un programme secret.',
    official: 'Officiellement: un remede revolutionnaire.',
    hidden: 'Reellement: une arme biologique experimentale testee sur San Andreas.',
    bullets: [
      'Un mur massif separe Sandy Shores / Paleto du sud de Los Santos',
      "L'ile devient un laboratoire a ciel ouvert",
      'Les scientifiques non affilies ignorent la vraie nature du projet',
    ],
  },
  {
    year: '2030',
    label: 'Tests humains',
    icon: Biohazard,
    lead: 'Nexus lance une campagne publique: "Testez le remede. Sauvez l\'humanite."',
    official: "Des dizaines de volontaires acceptent l'injection.",
    hidden: 'Ils sont isoles, observes 24h/24, puis les premiers corps se relevent.',
    bullets: ['Mutations violentes', "Perte d'emotions et de reperes", 'Mort, puis reanimation'],
  },
  {
    year: '2033',
    label: 'La liberation',
    icon: Skull,
    lead: 'Nexus lance la phase finale: liberer les infectes sur San Andreas.',
    official: 'Objectif annonce en interne: etudier la propagation et la reaction humaine.',
    hidden: "En quelques mois, les morts envahissent les rues et la civilisation s'effondre.",
    bullets: ["Services d'urgence depasses", "Coupures d'electricite", 'Communications detruites'],
  },
  {
    year: '2033 - 2035',
    label: "L'ere des survivants",
    icon: Shield,
    lead: "Les survivants s'adaptent. Certains s'organisent, d'autres sombrent.",
    official: 'Les anciennes regles ne tiennent plus que par la peur, le troc et les alliances.',
    hidden: "Nexus n'a pas disparu: il controle encore des centrales, des frequences radio, et observe toujours.",
    bullets: ['Groupes improvises', 'Milices et solitaires', "Bandits, cultes et chasseurs d'humains"],
  },
];

const survivorGroups = [
  {
    name: 'Mecaniciens',
    icon: Hammer,
    text: "Ils transforment les epaves en chances de fuite. Un moteur qui tourne vaut parfois plus qu'une arme.",
  },
  {
    name: 'Medecins',
    icon: HeartPulse,
    text: 'Ils improvisent les soins avec ce qui reste: alcool, bandages, outils propres et sang-froid.',
  },
  {
    name: 'Milices',
    icon: Crosshair,
    text: "Elles cherchent a re-instaurer un semblant d'ordre, parfois pour proteger, parfois pour dominer.",
  },
  {
    name: 'Solitaires',
    icon: Users,
    text: 'Ils avancent seuls, parlent peu, et savent que chaque rencontre peut devenir un piege.',
  },
];

const collapsedGroups = ['Bandits', 'Cultes', "Chasseurs d'humains"];

export default function LorePage() {
  return (
    <>
      <header className="lore-classified">
        <div className="lore-hero-copy">
          <span className="lore-file-label">Dossier public / Archives 2035</span>
          <h1>LORE LAST SURVIVORS</h1>
          <p>
            San Andreas n’est plus qu’un enfer. Les morts marchent, les vivants se cachent, et dans l’ombre quelqu’un
            observe encore.
          </p>
          <div className="lore-hero-actions" aria-label="Informations principales du lore">
            <span>
              <MapPinned size={16} />
              San Andreas
            </span>
            <span>
              <AlertTriangle size={16} />
              Annee 2035
            </span>
            <span>
              <Radio size={16} />
              Nexus actif
            </span>
          </div>
        </div>
        <aside className="lore-status-card" aria-label="Statut narratif">
          <span className="lore-redline" />
          <strong>San Andreas n’est plus un territoire.</strong>
          <p>C’est un test.</p>
          <div className="lore-signal-row">
            <Zap size={18} />
            Frequences surveillees
          </div>
        </aside>
      </header>

      <section className="lore-brief lore-brief-wide">
        <article className="lore-statement lore-origin">
          <span className="card-icon">
            <Building2 size={22} />
          </span>
          <h2>Human Labs, point zero</h2>
          <p>
            Tout commence sous couvert de recherche medicale. Face aux epidemies mondiales, Human Labs and Research
            devient le visage officiel de l’espoir. Derrière les portes fermées, Nexus transforme cet espoir en protocole
            de controle.
          </p>
        </article>
        <article className="lore-coordinate lore-nexus">
          <Skull size={34} />
          <span>Organisation secrete</span>
          <strong>Nexus</strong>
          <p>Scientifiques, militaires et elites influentes. Leur objectif reel reste inconnu.</p>
        </article>
      </section>

      <section className="section lore-dossier-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Chronologie officielle</span>
            <h2>De l’espoir au laboratoire à ciel ouvert</h2>
          </div>
          <p>
            Ce dossier sert de base RP pour comprendre la Chute, le Projet OMEGA, l’arrivée des infectés et la survie en
            2035.
          </p>
        </div>
        <div className="lore-dossier-grid">
          {chronicle.map((entry) => (
            <article className="lore-dossier-card" key={entry.label}>
              <div className="lore-dossier-topline">
                <span>{entry.year}</span>
                <entry.icon size={20} />
              </div>
              <h3>{entry.label}</h3>
              <p>{entry.lead}</p>
              <div className="lore-dual-lines">
                <strong>{entry.official}</strong>
                <em>{entry.hidden}</em>
              </div>
              <ul>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="lore-omega-panel">
        <div>
          <span className="section-kicker">Projet OMEGA</span>
          <h2>Le remede qui a tue le monde</h2>
          <p>
            Les volontaires pensaient participer a une solution. Ils ont ete injectes, isoles, observes, puis abandonnes
            à une mutation qui efface l’humain avant de relever le corps.
          </p>
        </div>
        <div className="lore-omega-metrics" aria-label="Effets observes du Projet OMEGA">
          <span>Mutations violentes</span>
          <span>Perte d’émotions</span>
          <span>Perte de reperes</span>
          <span>Reanimation</span>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Survivants</span>
            <h2>Ceux qui restent debout</h2>
          </div>
          <p>Après la libération des infectés, les vivants s’adaptent. Les rôles naissent du besoin, pas des lois.</p>
        </div>
        <div className="lore-survivor-grid">
          {survivorGroups.map((group) => (
            <article className="lore-survivor-card" key={group.name}>
              <span className="card-icon">
                <group.icon size={22} />
              </span>
              <h3>{group.name}</h3>
              <p>{group.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lore-threat-panel">
        <div>
          <span className="section-kicker">Ceux qui sombrent</span>
          <h2>La horde n’est pas la seule menace</h2>
          <p>
            Quand la nourriture manque et que la radio ment, certains groupes cessent de survivre avec les autres. Ils
            survivent contre eux.
          </p>
        </div>
        <div className="lore-threat-list">
          {collapsedGroups.map((group) => (
            <span key={group}>
              <AlertTriangle size={16} />
              {group}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
