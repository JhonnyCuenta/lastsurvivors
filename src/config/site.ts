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
  ExternalLink,
  Hammer,
  HeartPulse,
  Images,
  Map,
  Radio,
  Shield,
  Skull,
  Store,
  UserRound,
  Users,
  Vote,
  Zap,
} from 'lucide-react';

export const siteConfig = {
  name: 'LAST SURVIVORS',
  description: 'Portail joueurs du serveur FiveM RP post-apo.',
  connectCommand: process.env.NEXT_PUBLIC_CONNECT_COMMAND || 'connect 49.12.121.140:30175',
  nav: [
    { href: '/', label: 'Accueil' },
    { href: '/lore', label: 'Lore' },
    { href: '/guide', label: 'Guide' },
    { href: '/carte', label: 'Carte' },
    { href: '/evenements', label: 'Events' },
    { href: '/photos', label: 'Photos' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/reglement', label: 'Regles' },
    { href: '/communaute', label: 'Commu' },
  ],
};

export const quickLinks = [
  {
    href: '/lore',
    title: 'Lore serveur',
    text: 'Comprendre la Chute, la Zone et les rumeurs qui guident les survivants.',
    icon: Skull,
  },
  {
    href: '/guide',
    title: 'Guide de survie',
    text: 'Les bases pour arriver vivant: eau, loot, zombies, craft et vehicules.',
    icon: BookOpen,
  },
  {
    href: '/carte',
    title: 'Carte utile',
    text: 'Zones publiques, lieux de repere et secteurs a risque sans fuite de position joueur.',
    icon: Map,
  },
  {
    href: '/evenements',
    title: 'Evenements RP',
    text: 'Airdrops, blackouts, tempetes, missions et alertes communautaires.',
    icon: CalendarDays,
  },
  {
    href: '/photos',
    title: 'Photos RP',
    text: 'Galerie publique reliee au salon Discord si le channel est configure.',
    icon: Images,
  },
  {
    href: '/profil',
    title: 'Compte optionnel',
    text: 'Connecte Discord seulement pour le profil et la candidature.',
    icon: UserRound,
  },
];

export const survivalChapters = [
  {
    title: 'Premiers pas',
    icon: Backpack,
    points: [
      'Recupere une gourde, un sac et de quoi soigner les blessures legeres.',
      'Evite les coups de feu inutiles: le bruit attire les morts et les vivants.',
      'Garde toujours une sortie avant de fouiller un batiment.',
    ],
  },
  {
    title: 'Eau et faim',
    icon: Droplets,
    points: [
      'Priorite a l eau potable: filtre, bouteille vide, purificateur ou point d eau controle.',
      'Ne gaspille pas les consommables rares avant une expedition longue.',
      'Partage les ressources avec ton groupe pour eviter les pertes en route.',
    ],
  },
  {
    title: 'Zombies',
    icon: Skull,
    points: [
      'Un zombie seul est gerable; une horde peut bloquer un quartier entier.',
      'Le corps a corps economise les munitions, mais demande de l espace.',
      'Si une zone devient trop bruyante, decroche et contourne.',
    ],
  },
  {
    title: 'Loot',
    icon: CircleDot,
    points: [
      'Les zones riches sont souvent surveillees par d autres survivants.',
      'Classe ton inventaire avant de partir pour garder de la place.',
      'Signale les gros spots a ton groupe plutot que de tout porter seul.',
    ],
  },
  {
    title: 'Craft',
    icon: Hammer,
    points: [
      'Transforme les pieces faibles en outils utiles: reparation, stockage, defenses.',
      'Garde les composants rares pour les vehicules ou les bases.',
      'Un craft rentable est un craft qui te ramene vivant.',
    ],
  },
  {
    title: 'Vehicules',
    icon: Car,
    points: [
      'Controle carburant, pneus et moteur avant chaque depart.',
      'Les routes principales sont rapides mais predecibles.',
      'Un vehicule bruyant doit bouger vite ou rester cache.',
    ],
  },
];

export const mapZones = [
  {
    name: 'Safe Zone Nord',
    type: 'Zone verte',
    detail: 'Point de regroupement public, commerce RP et repos.',
    x: 44,
    y: 20,
    tone: 'safe',
  },
  {
    name: 'Pont fracture',
    type: 'Passage risque',
    detail: 'Controle les alentours avant de traverser.',
    x: 52,
    y: 46,
    tone: 'danger',
  },
  {
    name: 'Observatoire',
    type: 'Repere haut',
    detail: 'Bonne visibilite, mauvaise discretion.',
    x: 43,
    y: 55,
    tone: 'signal',
  },
  {
    name: 'Centrale',
    type: 'Zone contaminee',
    detail: 'Materiel rare, exposition possible.',
    x: 66,
    y: 38,
    tone: 'radiation',
  },
  {
    name: 'Chiliad',
    type: 'Terrain sauvage',
    detail: 'Utile pour camps, chasse et trajets discrets.',
    x: 34,
    y: 25,
    tone: 'safe',
  },
  {
    name: 'Cayo isolee',
    type: 'Expedition',
    detail: 'Sortie organisee conseillee.',
    x: 83,
    y: 82,
    tone: 'warning',
  },
];

export const eventCards = [
  {
    title: 'Airdrops',
    icon: Radio,
    schedule: 'Annonce staff ou evenement dynamique',
    text: 'Des caisses tombent en zone ouverte. Arrive equipe, repars vite.',
  },
  {
    title: 'Blackouts',
    icon: Zap,
    schedule: 'Soirees RP et phases tension',
    text: 'La visibilite baisse, les deplacements deviennent plus dangereux.',
  },
  {
    title: 'Tempetes',
    icon: AlertTriangle,
    schedule: 'Selon meteo et scripts actifs',
    text: 'Les survivants doivent s abriter, limiter les trajets et surveiller les vehicules.',
  },
  {
    title: 'Operations de faction',
    icon: Crosshair,
    schedule: 'Planning Discord',
    text: 'Escortes, recuperations, prises de zone et interventions RP.',
  },
];

export const rules = [
  {
    title: 'Respect RP',
    icon: Users,
    items: [
      'Joue la peur, la douleur, la fatigue et les consequences de tes actes.',
      'Le fair-play passe avant le gain d inventaire.',
      'Pas de HRP vocal en scene active.',
    ],
  },
  {
    title: 'Safezones',
    icon: Shield,
    items: [
      'Pas de provocation artificielle pour forcer un conflit.',
      'Respecte les zones staff, medicales ou communautaires.',
      'Une safezone n efface pas les consequences RP deja engagees.',
    ],
  },
  {
    title: 'Conflits',
    icon: Crosshair,
    items: [
      'Un conflit doit avoir une raison RP comprehensible.',
      'Le tir a vue gratuit casse l experience serveur.',
      'L enlevement, la fouille et la prise d otage doivent rester jouables.',
    ],
  },
  {
    title: 'Triche et abus',
    icon: AlertTriangle,
    items: [
      'Aucun cheat, macro abusive, duplication ou exploitation de bug.',
      'Signale les bugs au staff au lieu d en profiter.',
      'Les rewards, items et permissions sont controles cote serveur.',
    ],
  },
];

const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || '';
const voteUrl = process.env.NEXT_PUBLIC_VOTE_URL || '';
const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || '';
const discordMediaChannelUrl = process.env.NEXT_PUBLIC_DISCORD_MEDIA_CHANNEL_URL || '';

export const publicLinks = {
  discordUrl,
  voteUrl,
  storeUrl,
  discordMediaChannelUrl,
};

export const communityLinks = [
  {
    href: discordUrl,
    label: 'Discord',
    text: 'Support, annonces, candidatures et organisation RP.',
    icon: Users,
  },
  {
    href: voteUrl,
    label: 'Vote serveur',
    text: 'Soutiens la visibilite de Last Survivors.',
    icon: Vote,
  },
  {
    href: storeUrl,
    label: 'Boutique',
    text: 'Accede aux contenus boutique si le lien est configure.',
    icon: Store,
  },
].filter((link) => link.href.trim().length > 0);

export const defaultCommunityAction = {
  icon: ExternalLink,
  title: 'Liens en preparation',
  text: 'Configure les URLs publiques dans Vercel ou dans `.env.local` pour afficher Discord, vote et boutique.',
};

export const accountBenefits = [
  {
    title: 'Profil survivant',
    text: 'Avatar, pseudo Discord et raccourcis utiles sans compte obligatoire.',
    icon: UserRound,
  },
  {
    title: 'Candidature propre',
    text: 'Formulaire reserve aux membres Discord et transmis au staff.',
    icon: ClipboardList,
  },
  {
    title: 'Verification serveur',
    text: 'Le portail verifie seulement ton appartenance Discord, pas tes donnees en jeu.',
    icon: Shield,
  },
];

export const staffSignals = [
  'Aucun nom de joueur public',
  'Aucune position joueur',
  'Aucun inventaire expose',
  'Aucune route admin ouverte',
];

export const healthSignals = [
  { label: 'Blessures', value: 'Soins avant depart', icon: HeartPulse },
  { label: 'Menaces', value: 'Zones rouges a eviter', icon: AlertTriangle },
  { label: 'Radio', value: 'Discord pour les annonces', icon: Radio },
];

export const shopCards = [
  {
    title: 'Soutien survivant',
    price: 'Libre',
    text: 'Aide au financement serveur, hebergement, scripts et evenements.',
    items: ['Role Discord soutien', 'Remerciement communautaire', 'Aucun avantage pay-to-win'],
  },
  {
    title: 'Cosmetiques RP',
    price: 'Selon boutique',
    text: 'Contenus visuels ou RP sans casser l equilibre de survie.',
    items: ['Tenues autorisees', 'Accessoires RP', 'Validation staff si necessaire'],
  },
  {
    title: 'Evenements',
    price: 'Annonce Discord',
    text: 'Participation ou soutien aux grosses operations communautaires.',
    items: ['Operations RP', 'Lots non abusifs', 'Tracabilite staff'],
  },
];
