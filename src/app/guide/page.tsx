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
    label: 'Objectif debutant',
    value: 'Survivre 1 heure sans mourir pour rien',
  },
  {
    label: 'Regle mentale',
    value: 'Le RP passe avant le loot',
  },
  {
    label: 'Canal utile',
    value: 'Discord pour annonces, tickets et events',
  },
];

const routeSteps = [
  {
    time: '00-10 min',
    title: 'Sortir vivant du spawn',
    text: 'Observe autour de toi, trouve un abri court, baisse le bruit, repere les joueurs proches et evite la premiere bagarre inutile.',
  },
  {
    time: '10-25 min',
    title: 'Stabiliser ton personnage',
    text: 'Cherche eau, nourriture, petit soin, sac, lampe et outil simple. Ne pars pas loin si tu n as rien pour te soigner.',
  },
  {
    time: '25-45 min',
    title: 'Lire la zone',
    text: 'Identifie une route de fuite, un point haut, une safezone possible, un axe dangereux et les bruits de zombies ou vehicules.',
  },
  {
    time: '45-60 min',
    title: 'Creer ton premier RP',
    text: 'Parle a un survivant, demande une info, propose un echange, rejoins une expedition ou signale un danger au Discord/Radio RP.',
  },
];

const guideSections: GuideSection[] = [
  {
    number: '01',
    title: 'Avant de rejoindre',
    icon: BookOpen,
    intro: 'Prepare le minimum pour eviter d arriver perdu ou en full HRP.',
    points: [
      'Lis le lore et le reglement avant ta premiere vraie session. Ton personnage doit coller au monde Last Survivors.',
      'Verifie ton micro dans FiveM/GTA avant d entrer en scene. Sur un serveur RP, un micro mauvais casse vite une interaction.',
      'Garde la commande de connexion sous la main: `connect 49.12.121.140:30175` si la liste FiveM bug.',
      'Rejoins le Discord pour les annonces, tickets staff, evenements, photos RP et informations de maintenance.',
    ],
  },
  {
    number: '02',
    title: 'Creer un survivant credible',
    icon: Users,
    intro: 'Ton personnage n est pas un super-soldat. Il a un passe, des limites et une raison de continuer.',
    points: [
      'Choisis une origine simple: civil, mecano, infirmier, livreur, ancien militaire fatigue, fermier, routier, etudiant, artisan.',
      'Definis une peur ou une faiblesse: infection, solitude, bruit, sang, autorite, perte de proches ou manque de confiance.',
      'Evite le personnage qui sait tout faire. Un survivant interessant depend des autres et apprend en jeu.',
      'Pense a un objectif RP: retrouver quelqu un, proteger un groupe, monter un commerce, etudier l infection, rejoindre une faction.',
    ],
  },
  {
    number: '03',
    title: 'Premiere heure de survie',
    icon: Backpack,
    intro: 'Au debut, le but n est pas d etre riche. Le but est de ne pas mourir betement.',
    points: [
      'Ne cours pas partout. Le bruit et la panique attirent les morts et les joueurs opportunistes.',
      'Fouille petit et propre: alimentation, bouteille, bandage, outil, sac, lampe, radio si disponible.',
      'Garde toujours une sortie avant de fouiller un batiment. Une piece sans sortie devient vite un piege.',
      'Si tu croises un joueur, parle avant de viser. Une alliance de 10 minutes peut sauver toute ta soiree.',
    ],
    warning: 'Le nouveau joueur qui cherche directement arme lourde et raid finit souvent au sol ou en sanction RP.',
  },
  {
    number: '04',
    title: 'Eau, faim et soins',
    icon: Droplets,
    intro: 'La survie se joue sur les petites ressources que beaucoup gaspillent.',
    points: [
      'Garde toujours une reserve d eau et de nourriture avant une expedition longue.',
      'Ne consomme pas les gros soins pour une petite blessure si un bandage ou du repos suffit.',
      'Apres une morsure, une chute, un accident ou une balle, joue la douleur et cherche une aide medicale credible.',
      'Partage les ressources dans un groupe. Un joueur assoiffe ou blesse ralentit tout le convoi.',
    ],
  },
  {
    number: '05',
    title: 'Zombies et hordes',
    icon: Skull,
    intro: 'Les infectes sont une menace RP permanente, pas juste des PNJ a farmer.',
    points: [
      'Un zombie seul se gere. Plusieurs zombies dans une rue doivent te faire changer de rythme.',
      'Le corps a corps economise les munitions, mais demande de l espace et une sortie.',
      'Un coup de feu doit etre un choix important: il regle parfois un probleme, mais en cree souvent deux autres.',
      'N exploite jamais une zone ou les zombies ne peuvent pas te toucher. Signale le bug au staff.',
    ],
    warning: 'Si une horde arrive, fuir est souvent plus RP que vouloir tout nettoyer.',
  },
  {
    number: '06',
    title: 'Loot et inventaire',
    icon: CircleDot,
    intro: 'Ton inventaire doit raconter ta survie, pas ressembler a un coffre sans logique.',
    points: [
      'Classe ton sac: soins, nourriture, outils, munitions, pieces, objets de troc.',
      'Ne prends pas tout. Laisse ce qui ne sert pas a ton personnage ou a ton groupe.',
      'Le loot rare doit avoir une histoire: ou tu l as trouve, pourquoi tu l as garde, comment tu le transportes.',
      'Evite les allers-retours de farm muets. Transforme les sorties loot en scenes: escorte, echange, danger, dette, information.',
    ],
  },
  {
    number: '07',
    title: 'Craft, outils et reparations',
    icon: Hammer,
    intro: 'Dans un monde casse, les petits composants valent parfois plus qu une arme.',
    points: [
      'Garde les pieces utiles: composants, ferraille, outils, carburant, pneus, batteries, materiel medical.',
      'Ne craft pas juste pour vider ton inventaire. Craft quand tu sais ce que ton groupe veut construire ou reparer.',
      'Un mecano, un bricoleur ou un medecin peut devenir plus important qu un tireur dans une expedition.',
      'Les defenses de base, vehicules et reparations doivent rester coherents avec les ressources disponibles.',
    ],
  },
  {
    number: '08',
    title: 'Vehicules et carburant',
    icon: Car,
    intro: 'Un vehicule est un avantage enorme, mais aussi un signal sonore et une responsabilite.',
    points: [
      'Avant de partir, controle carburant, etat moteur, pneus, coffre et route de retour.',
      'Ne conduis pas comme en GTA Online. Un accident grave doit etre joue: douleur, panique, panne ou immobilisation.',
      'Evite de garer un vehicule visible pres d une base ou d une zone sensible.',
      'Un convoi doit avoir un ordre simple: ouvreur, vehicule de charge, arriere-garde, point de repli.',
    ],
  },
  {
    number: '09',
    title: 'Safezones et rencontres',
    icon: Shield,
    intro: 'Les zones calmes servent a creer du lien, echanger et organiser les prochaines scenes.',
    points: [
      'En safezone, viens pour parler, commercer, demander de l aide, recruter ou recuperer une information.',
      'Ne provoque pas quelqu un juste parce que tu sais qu il ne peut pas riposter sur place.',
      'Une scene commencee hors safezone ne disparait pas magiquement si tu rentres dedans.',
      'Les nouveaux joueurs doivent pouvoir poser des questions RP sans se faire ecraser directement.',
    ],
  },
  {
    number: '10',
    title: 'Combat, fuite et prise de risque',
    icon: Crosshair,
    intro: 'Le combat existe, mais il doit etre prepare, motive et jouable.',
    points: [
      'Demande-toi toujours pourquoi ton personnage prend le risque: dette, defense, territoire, peur, ordre, vengeance RP.',
      'Une sommation, un dialogue ou une tension claire rend la scene meilleure qu un tir instantane.',
      'La fuite est une vraie decision RP. Survivre aujourd hui peut creer une meilleure histoire demain.',
      'Apres un combat, pense consequences: blesses, temoins, traces, munitions perdues, bruit, vengeance et reputation.',
    ],
  },
  {
    number: '11',
    title: 'Base, faction et territoire',
    icon: Map,
    intro: 'Construire une base ou rejoindre un groupe doit creer du RP, pas juste proteger du stuff.',
    points: [
      'Une base doit avoir une logique: role, acces, stock, defense, activite et signe de vie.',
      'Un groupe credible a une identite: uniforme, radio, territoire, valeurs, ennemis, allies, besoins.',
      'Ne cache pas toute ton histoire dans Discord. Les alliances et conflits doivent se construire en jeu.',
      'Avant un raid ou une grosse operation, assure-toi que la raison RP est solide et que la scene sera jouable.',
    ],
  },
  {
    number: '12',
    title: 'Evenements et annonces',
    icon: CalendarDays,
    intro: 'Les airdrops, blackouts, tempetes et operations staff sont faits pour creer du mouvement.',
    points: [
      'Prepare les events comme une expedition: soins, eau, carburant, radio, plan de fuite.',
      'Ne fonce pas seul sur un airdrop. Observe, negocie, patiente ou monte une equipe.',
      'Un blackout change tout: baisse la vitesse, limite les tirs, surveille les toits et les intersections.',
      'Apres un event, transforme le resultat en RP: dette, rumeur, commerce, enquete, rivalite ou recrutement.',
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
    title: 'Expedition',
    icon: Map,
    items: ['Radio si possible', 'Carburant', 'Arme simple', 'Munitions limitees', 'Plan de fuite', 'Point de rendez-vous'],
  },
  {
    title: 'Retour base',
    icon: Shield,
    items: ['Tri du loot', 'Soins des blesses', 'Reparation vehicule', 'Compte-rendu RP', 'Rangement logique', 'Repos personnage'],
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
    text: 'Joue la peur. Parle calmement, negocie, donne une partie du loot si besoin et retiens les details utiles pour une suite RP.',
  },
  {
    title: 'Si tu trouves un bug',
    icon: ClipboardList,
    text: 'Stoppe l action abusive, note le lieu, fais un ticket Discord et ne partage pas la methode aux autres joueurs.',
  },
  {
    title: 'Si tu es perdu',
    icon: Radio,
    text: 'Cherche un repere public, ecoute les bruits, evite les routes trop ouvertes et demande une aide RP au lieu de partir HRP.',
  },
];

const commonMistakes = [
  'Courir vers chaque coup de feu au lieu de proteger ton personnage.',
  'Remplir ton inventaire avec des objets inutiles et ne plus pouvoir porter l essentiel.',
  'Sortir une arme trop vite et transformer une scene sociale en sanction possible.',
  'Oublier Fear RP/Pain RP apres un accident, une morsure ou une menace claire.',
  'Utiliser Discord pour transmettre une position ou une information que ton personnage ne connait pas.',
  'Confondre gagner une scene et construire une histoire que les autres auront envie de continuer.',
];

const guideLinks = [
  { href: '/lore', label: 'Lire le lore', icon: Skull },
  { href: '/reglement', label: 'Voir les regles', icon: Shield },
  { href: '/carte', label: 'Consulter la carte', icon: Map },
  { href: '/evenements', label: 'Preparer les events', icon: CalendarDays },
];

export default function GuidePage() {
  return (
    <>
      <header className="guide-hero">
        <div className="guide-hero-copy">
          <h1>Guide de survie FiveM</h1>
          <p>
            Le manuel terrain pour demarrer sur Last Survivors: survivre aux zombies, lire une zone, gerer ton loot,
            conduire proprement, creer du RP et eviter les erreurs qui ruinent une premiere session.
          </p>
          <div className="guide-hero-actions" aria-label="Liens importants du guide">
            <Link href="/reglement">Reglement</Link>
            <Link href="/lore">Lore</Link>
            <Link href="/communaute">Discord</Link>
          </div>
        </div>

        <aside className="guide-priority-card" aria-label="Priorites debutant">
          <HeartPulse size={30} />
          <strong>Priorite absolue</strong>
          <p>Boire, manger, soigner, observer, parler. L arme vient apres la survie et le RP.</p>
        </aside>
      </header>

      <section className="guide-first-grid" aria-label="Priorites de connexion">
        {firstPriorities.map((item) => (
          <article className="guide-stat" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="guide-timeline" aria-labelledby="first-hour-title">
        <div>
          <span className="section-kicker">Premier depart</span>
          <h2 id="first-hour-title">Ta premiere heure</h2>
          <p>
            Ne cherche pas directement le gros stuff. Les meilleurs survivants commencent par comprendre la zone et
            creer des contacts.
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
          <p>Chaque chapitre est pense pour le serveur: post-apo, zombies, ressources rares, factions et RP serieux.</p>
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
          <span className="section-kicker">Sac et preparation</span>
          <h2 id="loadout-title">Check-list avant expedition</h2>
          <p>Un groupe bien prepare perd moins de temps, meurt moins souvent et cree de meilleures scenes.</p>
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
          <p>Quelques reflexes simples pour rester dans le RP meme sous pression.</p>
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
          <h2>Erreurs a eviter</h2>
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
