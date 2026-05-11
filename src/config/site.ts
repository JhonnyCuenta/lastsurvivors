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
  Trophy,
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
    { href: '/jouer', label: 'Jouer' },
    { href: '/lore', label: 'Lore' },
    { href: '/guide', label: 'Guide' },
    { href: '/carte', label: 'Carte' },
    { href: '/evenements', label: 'Events' },
    { href: '/photos', label: 'Photos' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/top-vote', label: 'Vote' },
    { href: '/reglement', label: 'Regles' },
    { href: '/communaute', label: 'Communaute' },
  ],
};

export const quickLinks = [
  {
    href: '/jouer',
    title: 'Rejoindre le serveur',
    text: 'Connexion, Discord, whitelist et premiers reflexes avant ton arrivee.',
    icon: Radio,
  },
  {
    href: '/serveur',
    title: 'Univers & factions',
    text: 'Les groupes, les metiers et les tensions qui font vivre la Zone.',
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
    text: 'Les grands reperes pour preparer une sortie sans partir au hasard.',
    icon: Map,
  },
  {
    href: '/evenements',
    title: 'Events live',
    text: 'Airdrops, hordes, alertes terrain et rendez-vous RP a surveiller.',
    icon: CalendarDays,
  },
  {
    href: '/photos',
    title: 'Galerie RP',
    text: 'Screenshots et moments de serveur postes par la communaute.',
    icon: Images,
  },
  {
    href: '/top-vote',
    title: 'Top vote',
    text: 'Soutiens le serveur et suis les meilleurs voteurs.',
    icon: Trophy,
  },
  {
    href: '/dashboard',
    title: 'Compte joueur',
    text: 'Discord, candidature, support et raccourcis utiles au meme endroit.',
    icon: UserRound,
  },
];

export const premiumStats = [
  { label: 'Style', value: 'RP post-apo' },
  { label: 'Connexion', value: 'FiveM PC' },
  { label: 'Compte', value: 'Optionnel' },
];

export const homeHighlights = [
  {
    href: '/serveur',
    title: 'Un monde qui tient debout',
    text: 'Factions, medecins, groupes de route, commerce, conflits et survie lente. Rien n oblige a jouer le chaos permanent.',
    icon: Users,
  },
  {
    href: '/evenements',
    title: 'Des signaux qui bougent',
    text: 'Airdrops, hordes et rendez-vous RP donnent des raisons de sortir, negocier ou prendre des risques.',
    icon: Radio,
  },
  {
    href: '/boutique',
    title: 'Boutique lisible',
    text: 'Coins, vehicules et objets presentes clairement, avec un acces propre aux offres disponibles.',
    icon: Store,
  },
];

export const factionPreviews = [
  {
    name: 'Merryweather',
    role: 'Point de depart',
    text: 'Zone d arrivee et de regroupement pour les survivants qui cherchent une route, un contact ou un plan.',
  },
  {
    name: 'EMS Observatoire',
    role: 'Medical',
    text: 'Repere de soins et d informations, ideal pour les scenes de secours, escorte et evacuation.',
  },
  {
    name: 'Nomades',
    role: 'Transport & troc',
    text: 'Groupes mobiles, convois, carburant, pieces et routes secondaires. Pratique, mais jamais gratuit.',
  },
  {
    name: 'Independants',
    role: 'Survie libre',
    text: 'Joueurs solo ou petits groupes qui construisent leur reputation par leurs choix en jeu.',
  },
];

export const whitelistSteps = [
  'Rejoins le Discord Last Survivors.',
  'Lis le reglement et le guide de depart.',
  'Connecte ton Discord si tu veux envoyer une candidature.',
  'Prepare un personnage simple, credible et jouable.',
];

export const roadmapItems = [
  {
    status: 'En ligne',
    title: 'Portail joueur',
    text: 'Statut serveur, guide, carte, boutique, photos, votes et events live.',
  },
  {
    status: 'En cours',
    title: 'Dashboard joueur',
    text: 'Compte Discord, candidature, support, whitelist et raccourcis personnels.',
  },
  {
    status: 'Prochaine etape',
    title: 'Calendrier RP',
    text: 'Planning clair pour soirees faction, operations, hordes et evenements staff.',
  },
  {
    status: 'A venir',
    title: 'Support & tickets',
    text: 'Un acces plus simple aux demandes joueur, relie au Discord ou a un systeme dedie.',
  },
];

export const playerQuotes = [
  {
    quote: 'On vient pour survivre, pas juste pour tirer. Les meilleures scenes arrivent souvent quand tout part mal.',
    author: 'Survivant nomade',
  },
  {
    quote: 'Le serveur est meilleur quand les groupes prennent le temps de discuter avant de sortir les armes.',
    author: 'Joueur faction',
  },
  {
    quote: 'La carte, les events et le guide aident vraiment les nouveaux a comprendre ou ils mettent les pieds.',
    author: 'Nouveau arrivant',
  },
];

export const faqItems = [
  {
    question: 'Faut-il un compte sur le site ?',
    answer: 'Non. Le site reste lisible par tous. La connexion Discord sert seulement aux candidatures et a l espace joueur.',
  },
  {
    question: 'Comment rejoindre rapidement ?',
    answer: 'Copie la commande connect depuis l accueil ou la page Jouer, puis colle-la dans F8 sur FiveM.',
  },
  {
    question: 'La boutique est-elle obligatoire ?',
    answer: 'Non. Elle sert a soutenir le serveur et a acheter des offres visibles, sans remplacer le RP en jeu.',
  },
  {
    question: 'Ou demander de l aide ?',
    answer: 'Le Discord reste le meilleur endroit pour les tickets, questions, signalements et annonces importantes.',
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
    name: 'Spawn Merryweather',
    type: 'Point de depart',
    detail: 'Point de depart / zone importante pour les survivants.',
    x: 58,
    y: 91,
    tone: 'strategic',
    kind: 'point',
    shortLabel: 'Spawn',
  },
  {
    name: 'Observatoire EMS',
    type: 'Point medical',
    detail: 'Point medical / repere strategique.',
    x: 47,
    y: 58,
    tone: 'medical',
    kind: 'point',
    shortLabel: 'EMS',
  },
  {
    name: 'Nord',
    type: 'Zone infestee',
    detail: 'Zone fortement infestee de morts-vivants, vigilance maximale.',
    x: 50,
    y: 18,
    tone: 'danger',
    kind: 'zone',
    shortLabel: 'Nord',
  },
  {
    name: 'Sud',
    type: 'Zone plus calme',
    detail: 'Zone plus calme, recommandee pour les deplacements plus surs.',
    x: 51,
    y: 76,
    tone: 'calm',
    kind: 'zone',
    shortLabel: 'Sud',
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

const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/lastsurvivors';
const voteUrl = process.env.NEXT_PUBLIC_VOTE_URL || 'https://top-serveurs.net/gta/vote/last-survivors';
const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || '';
const discordMediaChannelUrl = process.env.NEXT_PUBLIC_DISCORD_MEDIA_CHANNEL_URL || 'https://discord.gg/KaWEEehr';

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
  text: 'Discord, vote et boutique apparaitront ici des que les liens seront prets.',
};

export const accountBenefits = [
  {
    title: 'Profil survivant',
    text: 'Avatar, pseudo Discord et raccourcis utiles sans compte obligatoire.',
    icon: UserRound,
  },
  {
    title: 'Candidature propre',
    text: 'Un formulaire simple pour presenter ton personnage ou ton projet.',
    icon: ClipboardList,
  },
  {
    title: 'Discord utile',
    text: 'Un seul compte pour retrouver candidature, support et prochains outils joueur.',
    icon: Radio,
  },
];

export const staffSignals = [
  'Connexion rapide',
  'Guide clair',
  'Events visibles',
  'Discord central',
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
