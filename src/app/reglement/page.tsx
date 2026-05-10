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
    text: 'Chaque action doit pouvoir exister dans un monde detruit: peur, fatigue, blessures, faim, perte et consequences.',
  },
  {
    title: 'Fair-play survivant',
    text: 'Le but est de creer une histoire forte, pas de gagner chaque scene, chaque loot ou chaque conflit.',
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
      'Reste dans ton personnage en vocal, en scene, en deplacement et lors des interactions avec les inconnus.',
      'Adapte ton langage a la situation: survivant, blessure, stress, menace, faim, froid, manque de sommeil.',
      'Le HRP vocal est interdit en scene active. Pour un probleme, termine la scene puis ouvre un ticket ou appelle un staff.',
      'Les actions absurdes ou impossibles juste pour gagner une scene peuvent etre annulees et sanctionnees.',
    ],
  },
  {
    number: '03',
    title: 'Fear RP et Pain RP',
    icon: HeartPulse,
    summary: 'La peur et la douleur doivent etre jouees serieusement.',
    items: [
      'Face a une arme, une horde, une prise d otage, une execution ou un groupe dominant, tu dois jouer la peur.',
      'Une blessure a des consequences: boiter, ralentir, perdre en precision, demander de l aide ou se replier.',
      'Un survivant seul ne provoque pas gratuitement un groupe arme ou une zone controlee.',
      'Ignorer une blessure grave, repartir en sprint apres un accident violent ou parler normalement torture est interdit.',
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
      'Les informations de faction, base, radio, position et stock doivent venir d une vraie scene RP.',
      'Tout avantage obtenu par bug, latence, fail script ou deco/reco doit etre signale, pas exploite.',
    ],
    warning: 'Le metagaming ruine les enquetes, les embuscades et les histoires longues.',
  },
  {
    number: '05',
    title: 'Mort, coma et NLR',
    icon: AlertTriangle,
    summary: 'La mort doit rester un moment lourd, pas un simple respawn.',
    items: [
      'Apres une mort ou un coma, tu oublies les evenements directs qui ont cause ta mort si la scene l impose.',
      'Interdiction de retourner sur la zone de ta mort pendant au moins 20 minutes, sauf validation staff ou rappel medical RP.',
      'Tu ne peux pas revenir pour recuperer ton stuff, te venger, donner des infos ou terminer le combat.',
      'Les morts repetees, suicides RP abusifs ou comportements sans consequence peuvent mener a une mort RP definitive.',
    ],
  },
  {
    number: '06',
    title: 'Combat et sommations',
    icon: Crosshair,
    summary: 'Les conflits doivent avoir une raison RP claire et etre jouables pour les deux camps.',
    items: [
      'Le RDM est interdit: on ne tue pas sans raison RP valable, sans contexte ou pour du loot facile.',
      'Le VDM est interdit: un vehicule n est pas une arme gratuite, sauf scene exceptionnelle valide et coherente.',
      'Une sommation ou un dialogue est attendu avant le tir, sauf embuscade preparee, guerre declaree ou danger immediat credible.',
      'Les prises d otage, braquages, fouilles et executions doivent laisser une vraie possibilite de RP, pas juste un speedrun de loot.',
    ],
    warning: 'Tirer le premier sans construire de scene est la cause la plus rapide d une sanction.',
  },
  {
    number: '07',
    title: 'Loot, farm et economie',
    icon: Backpack,
    summary: 'Le loot existe pour nourrir le RP, pas pour vider la carte en silence.',
    items: [
      'Farm intensif sans RP, stockage absurde, mule, transfert HRP et farm avec reroll sont interdits.',
      'Les zones riches doivent etre jouees comme dangereuses: bruit, zombies, tension, surveillance et risques humains.',
      'Ne vole pas tout le contenu d une base ou d un coffre sans raison RP, trace RP ou scene coherente.',
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
      'Les infections, morsures et blessures doivent etre jouees selon les regles staff ou medicales en vigueur.',
    ],
  },
  {
    number: '09',
    title: 'Safezones et lieux sensibles',
    icon: Shield,
    summary: 'Les safezones servent a respirer et creer du RP social, pas a provoquer sans risque.',
    items: [
      'Aucune agression, provocation forcee, braquage ou execution dans une safezone sans accord staff ou evenement annonce.',
      'Il est interdit de se refugier en safezone pour annuler une scene deja engagee hors safezone.',
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
      'Une base doit etre coherente: acces, defenses, stockage, activite, presence et logique de faction.',
      'Un raid doit avoir une raison RP claire: conflit, dette, renseignement, guerre, recuperation ou enquete.',
      'La destruction gratuite, le grief, le vidage complet sans scene et la deco pour sauver le stock sont interdits.',
      'Les assauts doivent respecter l equilibre: horaires raisonnables, presence de joueurs, communication staff si operation lourde.',
    ],
  },
  {
    number: '11',
    title: 'Vehicules et circulation',
    icon: Car,
    summary: 'Un vehicule est une ressource rare, bruyante et risquee.',
    items: [
      'Conduis comme un survivant: pneus, moteur, carburant, bruit, obstacles et etat des routes comptent.',
      'Les accidents graves doivent etre joues. Repartir instantanement apres un tonneau violent est interdit.',
      'Interdiction de voler ou detruire un vehicule sans raison RP, surtout dans les lieux communautaires.',
      'Le stockage vehicule ne doit pas servir a contourner les limites, cacher du loot abuse ou dupliquer des objets.',
    ],
  },
  {
    number: '12',
    title: 'Factions et groupes',
    icon: Users,
    summary: 'Un groupe doit avoir une identite, des limites et une logique RP.',
    items: [
      'Chaque faction doit avoir un objectif lisible: protection, commerce, pillage, culte, milice, medecine, recherche ou survie.',
      'Les alliances et guerres doivent etre construites avec des scenes, pas decidees uniquement en Discord.',
      'Les groupes doivent respecter les regles de fair-play: pas d ecrasement permanent des nouveaux, pas de chasse HRP.',
      'Le recrutement, les grades, uniformes, bases et radios doivent etre justifies en RP.',
    ],
  },
  {
    number: '13',
    title: 'Communication, radio et Discord',
    icon: Radio,
    summary: 'La communication doit rester RP en jeu et propre hors jeu.',
    items: [
      'Le vocal RP est obligatoire pour les scenes. Le chat HRP doit rester rare, court et utile.',
      'Les radios, frequences, codes et appels de renfort doivent etre obtenus et utilises en RP.',
      'Discord sert aux annonces, tickets, candidatures et organisation. Il ne remplace pas une scene en jeu.',
      'Insultes HRP, menaces, harcelement, spam, provocations personnelles et drama public sont interdits.',
    ],
  },
  {
    number: '14',
    title: 'Scenes sensibles',
    icon: ClipboardList,
    summary: 'Le RP dur ne donne pas le droit de mettre les joueurs mal a l aise.',
    items: [
      'Les scenes humiliantes, torture lourde, violence extreme, propos discriminatoires ou sujets sensibles doivent rester limites et encadres.',
      'Si un joueur demande a couper ou alleger une scene HRP, on respecte et on passe par le staff si besoin.',
      'Aucun RP sexuel force, aucune menace HRP, aucun contenu haineux ou discriminatoire ne sera tolere.',
      'Le RP post-apo peut etre sombre, mais le respect entre joueurs passe avant l ambiance.',
    ],
    warning: 'Un bon RP intense doit rester consenti, jouable et humainement correct.',
  },
  {
    number: '15',
    title: 'Candidatures et compte Discord',
    icon: Users,
    summary: 'Le site reste public, mais certaines actions demandent un Discord verifie.',
    items: [
      'La lecture du site, du guide, du lore, de la carte et du reglement reste accessible sans compte.',
      'La candidature demande une connexion Discord pour limiter les abus et transmettre une fiche propre au staff.',
      'Un faux pseudo, une candidature troll, du copier-coller vide ou une tentative de contournement peut etre refuse sans debat.',
      'Le staff peut demander un entretien vocal si la candidature manque de details ou si le RP propose est sensible.',
    ],
  },
  {
    number: '16',
    title: 'Triche, bugs et abus',
    icon: Hammer,
    summary: 'Toute faille exploitee contre le serveur ou les joueurs sera sanctionnee lourdement.',
    items: [
      'Cheat, menu, injection, duplication, macro abusive, bypass anti-cheat, exploit inventaire ou argent sont interdits.',
      'Un bug doit etre signale en ticket. Profiter d un bug avant de le signaler reste une exploitation.',
      'Les rewards, items, argent, jobs, vehicules et permissions ne doivent jamais etre demandes via pression HRP.',
      'Le multi-compte, la mule, le transfert de biens entre personnages et le retour apres ban sont interdits sans accord staff.',
    ],
    warning: 'La triche ou la duplication peut mener directement au ban definitif.',
  },
];

const sanctions = [
  {
    label: 'Rappel',
    text: 'Pour une erreur mineure ou un doute de regle. Le staff explique et remet la scene proprement.',
  },
  {
    label: 'Avertissement',
    text: 'Pour un comportement repete ou une faute claire: note staff, correction demandee, scene parfois annulee.',
  },
  {
    label: 'Sanction RP',
    text: 'Jail RP, retrait d objet, reset partiel, perte de scene, compensation ou restriction temporaire.',
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
          <h1>Reglement Last Survivors</h1>
          <p>
            Ce reglement pose le cadre du serveur: un RP post-apo dur, lisible et fair-play. Chaque joueur doit pouvoir
            survivre, perdre, negocier, fuir, construire une histoire et comprendre les consequences de ses actes.
          </p>
          <div className="rules-hero-actions" aria-label="Acces rapides du reglement">
            <Link href="/guide">Guide de survie</Link>
            <Link href="/lore">Lore serveur</Link>
            <Link href="/candidature">Candidature</Link>
          </div>
        </div>

        <aside className="rules-hero-card" aria-label="Priorite staff">
          <Shield size={30} />
          <strong>Regle principale</strong>
          <p>Si ton action detruit l immersion, bloque le RP ou cherche juste a gagner HRP, elle n a pas sa place ici.</p>
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
            <span className="section-kicker">Reference complete</span>
            <h2 id="rules-index-title">A connaitre avant de jouer</h2>
          </div>
          <p>
            Le staff garde le dernier mot en cas de zone floue. Une bonne scene sera toujours preferee a une victoire
            forcee.
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
            Le staff juge le contexte, la gravite, les preuves et l attitude du joueur. Une erreur honnete se corrige;
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
          <h2>Ce serveur n est pas fait pour</h2>
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
            Joue la survie, accepte les pertes, construis des relations, respecte les scenes et laisse toujours une porte
            ouverte au RP des autres joueurs.
          </p>
        </aside>
      </section>
    </>
  );
}
