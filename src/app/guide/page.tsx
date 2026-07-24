import Link from 'next/link';
import {
  AlertTriangle,
  Backpack,
  BookOpen,
  CalendarDays,
  Car,
  CircleDot,
  ClipboardList,
  Crosshair,
  Droplets,
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

import { siteConfig } from '@/config/site';

type GuideSection = {
  number: string;
  title: string;
  icon: LucideIcon;
  intro: string;
  points: string[];
  warning?: string;
};

const firstPriorities = [
  {
    label: 'Connexion directe',
    value: siteConfig.connectCommand,
  },
  {
    label: 'Objectif débutant',
    value: 'Survivre 1 heure sans mourir pour rien',
  },
  {
    label: 'Règle mentale',
    value: 'Le RP passe avant le loot',
  },
  {
    label: 'Canal utile',
    value: 'Discord pour annonces, tickets et événements',
  },
];

const routeSteps = [
  {
    time: '00-10 min',
    title: 'Sortir vivant du spawn',
    text: 'Observe autour de toi, trouve un abri court, baisse le bruit, repère les joueurs proches et évite la première bagarre inutile.',
  },
  {
    time: '10-25 min',
    title: 'Stabiliser ton personnage',
    text: 'Cherche eau, nourriture, petit soin, sac, lampe et outil simple. Ne pars pas loin si tu n as rien pour te soigner.',
  },
  {
    time: '25-45 min',
    title: 'Lire la zone',
    text: 'Identifie une route de fuite, un point haut, une safezone possible, un axe dangereux et les bruits de zombies ou véhicules.',
  },
  {
    time: '45-60 min',
    title: 'Créer ton premier RP',
    text: 'Parle à un survivant, demande une info, propose un échange, rejoins une expédition ou signale un danger sur Discord ou par radio RP.',
  },
];

const guideSections: GuideSection[] = [
  {
    number: '01',
    title: 'Avant de rejoindre',
    icon: BookOpen,
    intro: 'Prépare le minimum pour éviter d’arriver perdu ou en full HRP.',
    points: [
      'Lis le lore et le règlement avant ta première vraie session. Ton personnage doit coller au monde Last Survivors.',
      'Vérifie ton micro dans FiveM/GTA avant d’entrer en scène. Sur un serveur RP, un mauvais micro casse vite une interaction.',
      'Garde la commande de connexion sous la main: `connect 49.12.121.140:30175` si la liste FiveM bug.',
      'Rejoins Discord pour les annonces, tickets staff, événements, photos RP et informations de maintenance.',
    ],
  },
  {
    number: '02',
    title: 'Créer un survivant crédible',
    icon: Users,
    intro: 'Ton personnage n’est pas un super-soldat. Il a un passé, des limites et une raison de continuer.',
    points: [
      'Choisis une origine simple : civil, mécano, infirmier, livreur, ancien militaire fatigué, fermier, routier, étudiant ou artisan.',
      'Définis une peur ou une faiblesse : infection, solitude, bruit, sang, autorité, perte de proches ou manque de confiance.',
      'Évite le personnage qui sait tout faire. Un survivant intéressant dépend des autres et apprend en jeu.',
      'Pense à un objectif RP : retrouver quelqu’un, protéger un groupe, monter un commerce, étudier l’infection ou rejoindre une faction.',
    ],
  },
  {
    number: '03',
    title: 'Première heure de survie',
    icon: Backpack,
    intro: 'Au début, le but n’est pas d’être riche. Le but est de ne pas mourir bêtement.',
    points: [
      'Ne cours pas partout. Le bruit et la panique attirent les morts et les joueurs opportunistes.',
      'Fouille petit et propre : alimentation, bouteille, bandage, outil, sac, lampe et radio si disponible.',
      'Garde toujours une sortie avant de fouiller un bâtiment. Une pièce sans sortie devient vite un piège.',
      'Si tu croises un joueur, parle avant de viser. Une alliance de 10 minutes peut sauver toute ta soirée.',
    ],
    warning: 'Le nouveau joueur qui cherche directement une arme lourde et un raid finit souvent au sol ou en sanction RP.',
  },
  {
    number: '04',
    title: 'Eau, faim et soins',
    icon: Droplets,
    intro: 'La survie se joue sur les petites ressources que beaucoup gaspillent.',
    points: [
      'Garde toujours une réserve d’eau et de nourriture avant une expédition longue.',
      'Ne consomme pas les gros soins pour une petite blessure si un bandage ou du repos suffit.',
      'Après une morsure, une chute, un accident ou une balle, joue la douleur et cherche une aide médicale crédible.',
      'Partage les ressources dans un groupe. Un joueur assoiffé ou blessé ralentit tout le convoi.',
    ],
  },
  {
    number: '05',
    title: 'Zombies et hordes',
    icon: Skull,
    intro: 'Les infectés sont une menace RP permanente, pas juste des PNJ à farmer.',
    points: [
      'Un zombie seul se gere. Plusieurs zombies dans une rue doivent te faire changer de rythme.',
      'Le corps-à-corps économise les munitions, mais demande de l’espace et une sortie.',
      'Un coup de feu doit être un choix important : il règle parfois un problème, mais en crée souvent deux autres.',
      'N’exploite jamais une zone où les zombies ne peuvent pas te toucher. Signale le bug au staff.',
    ],
    warning: 'Si une horde arrive, fuir est souvent plus RP que vouloir tout nettoyer.',
  },
  {
    number: '06',
    title: 'Loot et inventaire',
    icon: CircleDot,
    intro: 'Ton inventaire doit raconter ta survie, pas ressembler à un coffre sans logique.',
    points: [
      'Classe ton sac : soins, nourriture, outils, munitions, pièces et objets de troc.',
      'Ne prends pas tout. Laisse ce qui ne sert pas à ton personnage ou à ton groupe.',
      'Le loot rare doit avoir une histoire : où tu l’as trouvé, pourquoi tu l’as gardé et comment tu le transportes.',
      'Évite les allers-retours de farm muets. Transforme les sorties loot en scènes : escorte, échange, danger, dette ou information.',
    ],
  },
  {
    number: '07',
    title: 'Craft, outils et réparations',
    icon: Hammer,
    intro: 'Dans un monde casse, les petits composants valent parfois plus qu une arme.',
    points: [
      'Garde les pièces utiles : composants, ferraille, outils, carburant, pneus, batteries et matériel médical.',
      'Ne craft pas juste pour vider ton inventaire. Craft quand tu sais ce que ton groupe veut construire ou reparer.',
      'Un mécano, un bricoleur ou un médecin peut devenir plus important qu’un tireur dans une expédition.',
      'Les défenses de base, véhicules et réparations doivent rester cohérents avec les ressources disponibles.',
    ],
  },
  {
    number: '08',
    title: 'Véhicules et carburant',
    icon: Car,
    intro: 'Un véhicule est un avantage énorme, mais aussi un signal sonore et une responsabilité.',
    points: [
      'Avant de partir, contrôle le carburant, l’état du moteur, les pneus, le coffre et la route de retour.',
      'Ne conduis pas comme dans GTA Online. Un accident grave doit être joué : douleur, panique, panne ou immobilisation.',
      'Évite de garer un véhicule visible près d’une base ou d’une zone sensible.',
      'Un convoi doit avoir un ordre simple : ouvreur, véhicule de charge, arrière-garde et point de repli.',
    ],
  },
  {
    number: '09',
    title: 'Safezones et rencontres',
    icon: Shield,
    intro: 'Les zones calmes servent à créer du lien, échanger et organiser les prochaines scènes.',
    points: [
      'En safezone, viens pour parler, commercer, demander de l’aide, recruter ou récupérer une information.',
      'Ne provoque pas quelqu’un juste parce que tu sais qu’il ne peut pas riposter sur place.',
      'Une scène commencée hors safezone ne disparaît pas magiquement si tu rentres dedans.',
      'Les nouveaux joueurs doivent pouvoir poser des questions RP sans se faire écraser directement.',
    ],
  },
  {
    number: '10',
    title: 'Combat, fuite et prise de risque',
    icon: Crosshair,
    intro: 'Le combat existe, mais il doit être préparé, motivé et jouable.',
    points: [
      'Demande-toi toujours pourquoi ton personnage prend le risque : dette, défense, territoire, peur, ordre ou vengeance RP.',
      'Une sommation, un dialogue ou une tension claire rend la scène meilleure qu’un tir instantané.',
      'La fuite est une vraie décision RP. Survivre aujourd’hui peut créer une meilleure histoire demain.',
      'Après un combat, pense aux conséquences : blessés, témoins, traces, munitions perdues, bruit, vengeance et réputation.',
    ],
  },
  {
    number: '11',
    title: 'Base, faction et territoire',
    icon: Map,
    intro: 'Construire une base ou rejoindre un groupe doit créer du RP, pas juste protéger du stuff.',
    points: [
      'Une base doit avoir une logique : rôle, accès, stock, défense, activité et signe de vie.',
      'Un groupe crédible a une identité : uniforme, radio, territoire, valeurs, ennemis, alliés et besoins.',
      'Ne cache pas toute ton histoire dans Discord. Les alliances et conflits doivent se construire en jeu.',
      'Avant un raid ou une grosse opération, assure-toi que la raison RP est solide et que la scène sera jouable.',
    ],
  },
  {
    number: '12',
    title: 'Événements et annonces',
    icon: CalendarDays,
    intro: 'Les airdrops, blackouts, tempêtes et opérations staff sont faits pour créer du mouvement.',
    points: [
      'Prépare les événements comme une expédition : soins, eau, carburant, radio et plan de fuite.',
      'Ne fonce pas seul sur un airdrop. Observe, négocie, patiente ou monte une équipe.',
      'Un blackout change tout: baisse la vitesse, limite les tirs, surveille les toits et les intersections.',
      'Après un événement, transforme le résultat en RP : dette, rumeur, commerce, enquête, rivalité ou recrutement.',
    ],
  },
];

const loadoutGroups = [
  {
    title: 'Kit minimum',
    icon: Backpack,
    items: ['Eau', 'Nourriture', 'Bandage', 'Lampe', 'Petit outil', 'Place libre dans le sac'],
  },
  {
    title: 'Expédition',
    icon: Map,
    items: ['Radio si possible', 'Carburant', 'Arme simple', 'Munitions limitées', 'Plan de fuite', 'Point de rendez-vous'],
  },
  {
    title: 'Retour base',
    icon: Shield,
    items: ['Tri du loot', 'Soins des blessés', 'Réparation du véhicule', 'Compte-rendu RP', 'Rangement logique', 'Repos du personnage'],
  },
];

const dangerProtocols = [
  {
    title: 'Si tu es poursuivi',
    icon: Zap,
    text: 'Ne tire pas tout de suite. Casse la ligne de vue, ferme les portes, monte en hauteur, appelle en radio et garde ton souffle.',
  },
  {
    title: 'Si un joueur te braque',
    icon: AlertTriangle,
    text: 'Joue la peur. Parle calmement, négocie, donne une partie du loot si besoin et retiens les détails utiles pour une suite RP.',
  },
  {
    title: 'Si tu trouves un bug',
    icon: ClipboardList,
    text: 'Stoppe l’action abusive, note le lieu, crée un ticket Discord et ne partage pas la méthode aux autres joueurs.',
  },
  {
    title: 'Si tu es perdu',
    icon: Radio,
    text: 'Cherche un repère public, écoute les bruits, évite les routes trop ouvertes et demande une aide RP au lieu de partir HRP.',
  },
];

const commonMistakes = [
  'Courir vers chaque coup de feu au lieu de protéger ton personnage.',
  'Remplir ton inventaire avec des objets inutiles et ne plus pouvoir porter l’essentiel.',
  'Sortir une arme trop vite et transformer une scène sociale en sanction possible.',
  'Oublier Fear RP/Pain RP après un accident, une morsure ou une menace claire.',
  'Utiliser Discord pour transmettre une position ou une information que ton personnage ne connait pas.',
  'Confondre gagner une scène et construire une histoire que les autres auront envie de continuer.',
];

const guideLinks = [
  { href: '/lore', label: 'Lire le lore', icon: Skull },
  { href: '/reglement', label: 'Voir les règles', icon: Shield },
  { href: '/carte', label: 'Consulter la carte', icon: Map },
  { href: '/evenements', label: 'Préparer les événements', icon: CalendarDays },
];

export default function GuidePage() {
  return (
    <>
      <header className="guide-hero">
        <div className="guide-hero-copy">
          <h1>Guide de survie FiveM</h1>
          <p>
            Le manuel terrain pour démarrer sur Last Survivors : survivre aux zombies, lire une zone, gérer ton loot,
            conduire proprement, créer du RP et éviter les erreurs qui ruinent une première session.
          </p>
          <div className="guide-hero-actions" aria-label="Liens importants du guide">
            <Link href="/reglement">Règlement</Link>
            <Link href="/lore">Lore</Link>
            <Link href="/communaute">Discord</Link>
          </div>
        </div>

        <aside className="guide-priority-card" aria-label="Priorités débutant">
          <HeartPulse size={30} />
          <strong>Priorité absolue</strong>
          <p>Boire, manger, soigner, observer, parler. L’arme vient après la survie et le RP.</p>
        </aside>
      </header>

      <section className="guide-first-grid" aria-label="Priorités de connexion">
        {firstPriorities.map((item) => (
          <article className="guide-stat" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="guide-timeline" aria-labelledby="first-hour-title">
        <div>
          <span className="section-kicker">Premier départ</span>
          <h2 id="first-hour-title">Ta première heure</h2>
          <p>
            Ne cherche pas directement le gros stuff. Les meilleurs survivants commencent par comprendre la zone et
            créer des contacts.
          </p>
        </div>

        <div className="guide-route">
          {routeSteps.map((step) => (
            <article className="guide-route-step" key={step.time}>
              <span>{step.time}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-manual" aria-labelledby="manual-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Manuel joueur</span>
            <h2 id="manual-title">Les bases qui font durer ton personnage</h2>
          </div>
          <p>Chaque chapitre est pensé pour le serveur : post-apo, zombies, ressources rares, factions et RP sérieux.</p>
        </div>

        <div className="guide-section-grid">
          {guideSections.map((section) => (
            <article className="guide-section-card" key={section.title}>
              <div className="guide-card-topline">
                <span>{section.number}</span>
                <section.icon size={22} />
              </div>
              <h3>{section.title}</h3>
              <p>{section.intro}</p>
              <ul>
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {section.warning ? <strong className="guide-warning">{section.warning}</strong> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="guide-loadout" aria-labelledby="loadout-title">
        <div>
          <span className="section-kicker">Sac et préparation</span>
          <h2 id="loadout-title">Check-list avant expédition</h2>
          <p>Un groupe bien préparé perd moins de temps, meurt moins souvent et crée de meilleures scènes.</p>
        </div>

        <div className="guide-loadout-grid">
          {loadoutGroups.map((group) => (
            <article className="guide-check-card" key={group.title}>
              <group.icon size={24} />
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-protocols" aria-labelledby="protocol-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Protocoles terrain</span>
            <h2 id="protocol-title">Quand la situation part mal</h2>
          </div>
          <p>Quelques réflexes simples pour rester dans le RP même sous pression.</p>
        </div>

        <div className="guide-protocol-grid">
          {dangerProtocols.map((protocol) => (
            <article className="guide-protocol-card" key={protocol.title}>
              <protocol.icon size={24} />
              <h3>{protocol.title}</h3>
              <p>{protocol.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-final-panel">
        <div>
          <AlertTriangle size={26} />
          <h2>Erreurs à éviter</h2>
          <ul>
            {commonMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </div>

        <aside>
          <Radio size={28} />
          <strong>Continue le parcours</strong>
          <div className="guide-link-list">
            {guideLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
