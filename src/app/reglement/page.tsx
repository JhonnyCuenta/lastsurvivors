import Link from 'next/link';
import {
  AlertTriangle,
  Backpack,
  BookOpen,
  Car,
  CircleDot,
  ClipboardList,
  Crosshair,
  Hammer,
  HeartPulse,
  Map,
  Radio,
  Shield,
  Skull,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type RuleSection = {
  number: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  items: string[];
  warning?: string;
};

const principles = [
  {
    title: 'Immersion avant tout',
    text: 'Chaque action doit pouvoir exister dans un monde détruit : peur, fatigue, blessures, faim, perte et conséquences.',
  },
  {
    title: 'Fair-play survivant',
    text: 'Le but est de créer une histoire forte, pas de gagner chaque scène, chaque loot ou chaque conflit.',
  },
  {
    title: 'Respect HRP',
    text: 'Les tensions restent en RP. Le vocal, Discord et les tickets doivent rester calmes, propres et exploitables par le staff.',
  },
];

const ruleSections: RuleSection[] = [
  {
    number: '01',
    title: 'Contexte general',
    icon: Skull,
    summary: 'Last Survivors se joue dans un monde post-apo ou la societe s est effondree.',
    items: [
      'Ton personnage est un survivant credible: il a peur, doute, souffre, se fatigue et prend des risques mesures.',
      'Les ressources sont rares. L eau, la nourriture, les soins, le carburant, les munitions et les outils doivent garder de la valeur.',
      'La ville n est plus une ville normale: evite les comportements GTA Online, courses inutiles, klaxons partout et chaos gratuit.',
      'La survie, les alliances, les trahisons, la reconstruction et les histoires entre joueurs sont le coeur du serveur.',
    ],
    warning: 'Un personnage invincible, sans peur ou toujours arme comme une armee casse l univers.',
  },
  {
    number: '02',
    title: 'Roleplay obligatoire',
    icon: BookOpen,
    summary: 'Le RP est obligatoire des que tu es en jeu, meme pendant le farm ou le loot.',
    items: [
      'Reste dans ton personnage en vocal, en scène, en déplacement et lors des interactions avec les inconnus.',
      'Adapte ton langage a la situation: survivant, blessure, stress, menace, faim, froid, manque de sommeil.',
      'Le HRP vocal est interdit en scène active. Pour un problème, termine la scène puis ouvre un ticket ou appelle un staff.',
      'Les actions absurdes ou impossibles juste pour gagner une scène peuvent être annulées et sanctionnées.',
    ],
  },
  {
    number: '03',
    title: 'Fear RP et Pain RP',
    icon: HeartPulse,
    summary: 'La peur et la douleur doivent être jouées sérieusement.',
    items: [
      'Face a une arme, une horde, une prise d otage, une execution ou un groupe dominant, tu dois jouer la peur.',
      'Une blessure a des conséquences : boiter, ralentir, perdre en précision, demander de l’aide ou se replier.',
      'Un survivant seul ne provoque pas gratuitement un groupe arme ou une zone controlee.',
      'Ignorer une blessure grave, repartir en sprint après un accident violent ou parler normalement sous la torture est interdit.',
    ],
  },
  {
    number: '04',
    title: 'Metagaming et Powergaming',
    icon: Zap,
    summary: 'Ton personnage ne sait que ce qu il a appris en RP.',
    items: [
      'Interdiction d utiliser Discord, stream, carte externe, vocal HRP ou information staff pour agir en jeu.',
      'Interdiction de forcer une action impossible: fouiller instantanement, menotter sans controle, sortir une arme attachee, survivre a tout.',
      'Les informations de faction, base, radio, position et stock doivent venir d’une vraie scène RP.',
      'Tout avantage obtenu par bug, latence, faille de script ou déco/reco doit être signalé, pas exploité.',
    ],
    warning: 'Le metagaming ruine les enquetes, les embuscades et les histoires longues.',
  },
  {
    number: '05',
    title: 'Mort, coma et NLR',
    icon: AlertTriangle,
    summary: 'La mort doit rester un moment lourd, pas un simple respawn.',
    items: [
      'Après une mort ou un coma, tu oublies les événements directs qui ont causé ta mort si la scène l’impose.',
      'Interdiction de retourner sur la zone de ta mort pendant au moins 20 minutes, sauf validation staff ou rappel medical RP.',
      'Tu ne peux pas revenir pour recuperer ton stuff, te venger, donner des infos ou terminer le combat.',
      'Les morts repetees, suicides RP abusifs ou comportements sans consequence peuvent mener a une mort RP definitive.',
    ],
  },
  {
    number: '06',
    title: 'Combat et sommations',
    icon: Crosshair,
    summary: 'Les conflits doivent avoir une raison RP claire et être jouables pour les deux camps.',
    items: [
      'Le RDM est interdit: on ne tue pas sans raison RP valable, sans contexte ou pour du loot facile.',
      'Le VDM est interdit : un véhicule n’est pas une arme gratuite, sauf scène exceptionnelle valide et cohérente.',
      'Une sommation ou un dialogue est attendu avant le tir, sauf embuscade preparee, guerre declaree ou danger immediat credible.',
      'Les prises d otage, braquages, fouilles et executions doivent laisser une vraie possibilite de RP, pas juste un speedrun de loot.',
    ],
    warning: 'Tirer le premier sans construire de scène est la cause la plus rapide d’une sanction.',
  },
  {
    number: '07',
    title: 'Loot, farm et economie',
    icon: Backpack,
    summary: 'Le loot existe pour nourrir le RP, pas pour vider la carte en silence.',
    items: [
      'Farm intensif sans RP, stockage absurde, mule, transfert HRP et farm avec reroll sont interdits.',
      'Les zones riches doivent être jouées comme dangereuses : bruit, zombies, tension, surveillance et risques humains.',
      'Ne vole pas tout le contenu d’une base ou d’un coffre sans raison RP, trace RP ou scène cohérente.',
      'Les armes lourdes, munitions rares, explosifs, soins avances et pieces sensibles doivent avoir une provenance credible.',
    ],
  },
  {
    number: '08',
    title: 'Zombies et menace apocalypse',
    icon: CircleDot,
    summary: 'Les infectes font partie de l univers, ils ne sont pas un decor ignorables.',
    items: [
      'Un bruit fort, une fusillade ou une explosion doit attirer de la prudence, pas seulement de l ego.',
      'Une horde oblige a s organiser, fuir, barricader, contourner ou demander de l aide.',
      'Interdiction de bloquer, exploiter ou farmer les zombies avec une faille de script ou un endroit intouchable.',
      'Les infections, morsures et blessures doivent être jouées selon les règles staff ou médicales en vigueur.',
    ],
  },
  {
    number: '09',
    title: 'Safezones et lieux sensibles',
    icon: Shield,
    summary: 'Les safezones servent à respirer et créer du RP social, pas à provoquer sans risque.',
    items: [
      'Aucune agression, provocation forcee, braquage ou execution dans une safezone sans accord staff ou evenement annonce.',
      'Il est interdit de se réfugier en safezone pour annuler une scène déjà engagée hors safezone.',
      'Hopital, zones staff, zones d accueil, points communautaires et lieux de spawn doivent rester propres et jouables.',
      'Le mass RP s applique: ne fais pas comme si un lieu peuple, surveille ou controle etait vide.',
    ],
    warning: 'Une safezone protege le RP, pas les provocations.',
  },
  {
    number: '10',
    title: 'Bases, territoires et raids',
    icon: Map,
    summary: 'Une base doit raconter quelque chose et rester attaquable de maniere juste.',
    items: [
      'Une base doit être cohérente : accès, défenses, stockage, activité, présence et logique de faction.',
      'Un raid doit avoir une raison RP claire: conflit, dette, renseignement, guerre, recuperation ou enquete.',
      'La destruction gratuite, le grief, le vidage complet sans scène et la déco pour sauver le stock sont interdits.',
      'Les assauts doivent respecter l equilibre: horaires raisonnables, presence de joueurs, communication staff si operation lourde.',
    ],
  },
  {
    number: '11',
    title: 'Vehicules et circulation',
    icon: Car,
    summary: 'Un véhicule est une ressource rare, bruyante et risquée.',
    items: [
      'Conduis comme un survivant: pneus, moteur, carburant, bruit, obstacles et etat des routes comptent.',
      'Les accidents graves doivent être joués. Repartir instantanément après un tonneau violent est interdit.',
      'Interdiction de voler ou détruire un véhicule sans raison RP, surtout dans les lieux communautaires.',
      'Le stockage de véhicule ne doit pas servir à contourner les limites, cacher du loot abusé ou dupliquer des objets.',
    ],
  },
  {
    number: '12',
    title: 'Factions et groupes',
    icon: Users,
    summary: 'Un groupe doit avoir une identité, des limites et une logique RP.',
    items: [
      'Chaque faction doit avoir un objectif lisible: protection, commerce, pillage, culte, milice, medecine, recherche ou survie.',
      'Les alliances et guerres doivent être construites avec des scènes, pas décidées uniquement sur Discord.',
      'Les groupes doivent respecter les regles de fair-play: pas d ecrasement permanent des nouveaux, pas de chasse HRP.',
      'Le recrutement, les grades, uniformes, bases et radios doivent être justifiés en RP.',
    ],
  },
  {
    number: '13',
    title: 'Communication, radio et Discord',
    icon: Radio,
    summary: 'La communication doit rester RP en jeu et propre hors jeu.',
    items: [
      'Le vocal RP est obligatoire pour les scènes. Le chat HRP doit rester rare, court et utile.',
      'Les radios, fréquences, codes et appels de renfort doivent être obtenus et utilisés en RP.',
      'Discord sert aux annonces, tickets, candidatures staff et à l’organisation. Il ne remplace pas une scène en jeu.',
      'Insultes HRP, menaces, harcelement, spam, provocations personnelles et drama public sont interdits.',
    ],
  },
  {
    number: '14',
    title: 'Scenes sensibles',
    icon: ClipboardList,
    summary: 'Le RP dur ne donne pas le droit de mettre les joueurs mal a l aise.',
    items: [
      'Les scènes humiliantes, la torture lourde, la violence extrême, les propos discriminatoires ou les sujets sensibles doivent rester limités et encadrés.',
      'Si un joueur demande à couper ou alléger une scène HRP, on respecte sa demande et on passe par le staff si besoin.',
      'Aucun RP sexuel force, aucune menace HRP, aucun contenu haineux ou discriminatoire ne sera tolere.',
      'Le RP post-apo peut être sombre, mais le respect entre joueurs passe avant l’ambiance.',
    ],
    warning: 'Un bon RP intense doit rester consenti, jouable et humainement correct.',
  },
  {
    number: '15',
    title: 'Candidature staff et compte Discord',
    icon: Users,
    summary: 'Le site reste public, mais certaines actions demandent un Discord verifie.',
    items: [
      'La lecture du site, du guide, du lore, de la carte et du règlement reste accessible sans compte.',
      'Le serveur n est pas whitelist pour le moment: la candidature du site sert uniquement a postuler staff.',
      'Un faux pseudo, une candidature staff troll, du copier-coller vide ou une tentative de contournement peut être refusé sans débat.',
      'Le staff peut demander un entretien vocal si la candidature manque de details ou si le role propose demande confiance.',
    ],
  },
  {
    number: '16',
    title: 'Triche, bugs et abus',
    icon: Hammer,
    summary: 'Toute faille exploitee contre le serveur ou les joueurs sera sanctionnee lourdement.',
    items: [
      'Cheat, menu, injection, duplication, macro abusive, bypass anti-cheat, exploit inventaire ou argent sont interdits.',
      'Un bug doit être signalé en ticket. Profiter d’un bug avant de le signaler reste une exploitation.',
      'Les récompenses, items, argent, jobs, véhicules et permissions ne doivent jamais être demandés sous pression HRP.',
      'Le multi-compte, la mule, le transfert de biens entre personnages et le retour après ban sont interdits sans accord staff.',
    ],
    warning: 'La triche ou la duplication peut mener directement au ban definitif.',
  },
];

const sanctions = [
  {
    label: 'Rappel',
    text: 'Pour une erreur mineure ou un doute de règle. Le staff explique et remet la scène proprement.',
  },
  {
    label: 'Avertissement',
    text: 'Pour un comportement répété ou une faute claire : note staff, correction demandée, scène parfois annulée.',
  },
  {
    label: 'Sanction RP',
    text: 'Jail RP, retrait d’objet, reset partiel, perte de scène, compensation ou restriction temporaire.',
  },
  {
    label: 'Ban',
    text: 'Temporaire ou definitif selon gravite: triche, toxicite, abus massif, harcelement ou recidive.',
  },
];

const notAllowed = [
  'Serveur FPS ou tir a vue permanent',
  'Sandbox sans consequence',
  'Farm silencieux sans RP',
  'Chaos gratuit en safezone',
  'Drama HRP importe en jeu',
  'Abus de bugs ou scripts',
];

export default function ReglementPage() {
  return (
    <>
      <header className="rules-hero">
        <div className="rules-hero-copy">
          <span className="rules-kicker">Dossier public / Code survivant</span>
          <h1>Règlement Last Survivors</h1>
          <p>
            Ce règlement pose le cadre du serveur : un RP post-apo dur, lisible et fair-play. Chaque joueur doit pouvoir
            survivre, perdre, négocier, fuir, construire une histoire et comprendre les conséquences de ses actes.
          </p>
          <div className="rules-hero-actions" aria-label="Accès rapides du règlement">
            <Link href="/guide">Guide de survie</Link>
            <Link href="/lore">Lore serveur</Link>
            <Link href="/support">Support</Link>
            <Link href="/candidature">Candidature staff</Link>
          </div>
        </div>

        <aside className="rules-hero-card" aria-label="Priorité staff">
          <Shield size={30} />
          <strong>Règle principale</strong>
          <p>Si ton action détruit l’immersion, bloque le RP ou cherche juste à gagner HRP, elle n’a pas sa place ici.</p>
        </aside>
      </header>

      <section className="rules-principles" aria-label="Principes du serveur">
        {principles.map((principle) => (
          <article className="rules-principle" key={principle.title}>
            <span>{principle.title}</span>
            <p>{principle.text}</p>
          </article>
        ))}
      </section>

      <section className="rules-index" aria-labelledby="rules-index-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Référence complète</span>
            <h2 id="rules-index-title">À connaître avant de jouer</h2>
          </div>
          <p>
            Le staff garde le dernier mot en cas de zone floue. Une bonne scène sera toujours préférée à une victoire
            forcée.
          </p>
        </div>

        <div className="rules-grid">
          {ruleSections.map((section) => (
            <article className="rule-card" key={section.title}>
              <div className="rule-card-topline">
                <span>{section.number}</span>
                <section.icon size={22} />
              </div>
              <h3>{section.title}</h3>
              <p>{section.summary}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {section.warning ? <strong className="rule-warning">{section.warning}</strong> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rules-sanctions" aria-labelledby="rules-sanctions-title">
        <div>
          <span className="section-kicker">Sanctions</span>
          <h2 id="rules-sanctions-title">Progressives, mais pas automatiques</h2>
          <p>
            Le staff juge le contexte, la gravité, les preuves et l’attitude du joueur. Une erreur honnête se corrige ;
            un abus volontaire se sanctionne vite.
          </p>
        </div>

        <div className="rules-sanction-track">
          {sanctions.map((sanction, index) => (
            <article className="rules-sanction-card" key={sanction.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{sanction.label}</h3>
              <p>{sanction.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rules-final-panel">
        <div>
          <AlertTriangle size={26} />
          <h2>Ce serveur n’est pas fait pour</h2>
          <div className="rules-not-list">
            {notAllowed.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <aside>
          <Skull size={28} />
          <strong>Esprit Last Survivors</strong>
          <p>
            Joue la survie, accepte les pertes, construis des relations, respecte les scènes et laisse toujours une porte
            ouverte au RP des autres joueurs.
          </p>
        </aside>
      </section>
    </>
  );
}
