import {
  BookOpen,
  CalendarDays,
  Clapperboard,
  ClipboardList,
  ExternalLink,
  Images,
  LifeBuoy,
  Map,
  Radio,
  Store,
  Trophy,
  UserRound,
  Users,
  Vote,
} from 'lucide-react';

const discordUrl =
  process.env.NEXT_PUBLIC_DISCORD_URL?.trim() || 'https://discord.gg/lastsurvivors';
const voteUrl =
  process.env.NEXT_PUBLIC_VOTE_URL?.trim() ||
  'https://top-serveurs.net/gta/vote/last-survivors';
const storeUrl = process.env.NEXT_PUBLIC_STORE_URL?.trim() || '';

export const siteConfig = {
  name: 'LAST SURVIVORS',
  description: 'Réseau de transmission des survivants — serveur FiveM RP post-apocalyptique.',
  connectCommand:
    process.env.NEXT_PUBLIC_CONNECT_COMMAND?.trim() || 'connect 49.12.121.140:30175',
  nav: [
    { href: '/', label: 'Accueil' },
    { href: '/jouer', label: 'Jouer' },
    { href: '/lore', label: 'Lore' },
    { href: '/guide', label: 'Guide' },
    { href: '/carte', label: 'Carte' },
    { href: '/evenements', label: 'Opérations' },
    { href: '/photos', label: 'Médias' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/top-vote', label: 'Votes' },
    { href: '/support', label: 'Support' },
    { href: '/reglement', label: 'Règlement' },
    { href: '/communaute', label: 'Communauté' },
  ],
};

export const publicLinks = {
  discordUrl,
  voteUrl,
  storeUrl,
  discordMediaChannelUrl:
    process.env.NEXT_PUBLIC_DISCORD_MEDIA_CHANNEL_URL?.trim() || discordUrl,
};

export const quickLinks = [
  {
    href: '/jouer',
    title: 'Rejoindre le serveur',
    text: 'Commande FiveM, Discord et contrôles avant le départ.',
    icon: Radio,
  },
  {
    href: '/guide',
    title: 'Guide de survie',
    text: 'Eau, soins, loot, zombies, craft et véhicules.',
    icon: BookOpen,
  },
  {
    href: '/carte',
    title: 'Carte des zones',
    text: 'Repères publics pour préparer une sortie.',
    icon: Map,
  },
  {
    href: '/evenements',
    title: 'Opérations',
    text: 'Alertes terrain et événements confirmés.',
    icon: CalendarDays,
  },
  {
    href: '/photos',
    title: 'Archives visuelles',
    text: 'Captures publiées par la communauté.',
    icon: Images,
  },
  {
    href: '/top-vote',
    title: 'Fréquence vote',
    text: 'Soutenir le serveur et consulter le classement.',
    icon: Trophy,
  },
  {
    href: '/support',
    title: 'Canal support',
    text: 'Signaler un bug ou demander de l’aide.',
    icon: LifeBuoy,
  },
  {
    href: '/dashboard',
    title: 'Dossier joueur',
    text: 'Profil, candidature et outils personnels.',
    icon: UserRound,
  },
];

export const factionPreviews = [
  {
    name: 'Merryweather',
    role: 'Relais d’arrivée',
    text: 'Regroupement, premiers contacts et départ des convois.',
  },
  {
    name: 'EMS Observatoire',
    role: 'Station médicale',
    text: 'Soins, évacuations et renseignements de terrain.',
  },
  {
    name: 'Nomades',
    role: 'Transport & troc',
    text: 'Carburant, pièces, routes secondaires et services mobiles.',
  },
  {
    name: 'Indépendants',
    role: 'Survie libre',
    text: 'Petits groupes dont la réputation se construit en jeu.',
  },
];

export const joinSteps = [
  'Rejoins le Discord officiel Last Survivors.',
  'Lis le règlement et le guide de départ.',
  'Le serveur est ouvert : aucune whitelist joueur n’est active actuellement.',
  'Prépare un personnage simple, crédible et jouable.',
];

export const roadmapItems = [
  {
    status: 'En ligne',
    title: 'Réseau de transmission',
    text: 'Statut serveur, opérations, carte, médias et services joueur.',
  },
  {
    status: 'En ligne',
    title: 'Dossier joueur',
    text: 'Connexion Discord, candidature, support et profil.',
  },
  {
    status: 'Connecté au bot',
    title: 'Calendrier RP',
    text: 'Les événements publics confirmés deviennent la source principale.',
  },
  {
    status: 'Sous surveillance',
    title: 'Support & sécurité',
    text: 'Contrats existants conservés et données sensibles exclues du portail.',
  },
];

export const faqItems = [
  {
    question: 'Faut-il un compte sur le site ?',
    answer:
      'Non. Le site reste public. La connexion Discord sert au dossier joueur, au support et à la candidature staff.',
  },
  {
    question: 'Comment rejoindre rapidement ?',
    answer:
      'Copie la commande connect depuis l’accueil ou la page Jouer, puis colle-la dans la console F8 de FiveM.',
  },
  {
    question: 'La boutique est-elle obligatoire ?',
    answer:
      'Non. Elle soutient le serveur et ne remplace pas la progression ni les scènes RP.',
  },
  {
    question: 'Où demander de l’aide ?',
    answer:
      'Ouvre un ticket depuis la page Support. Le Discord officiel permet ensuite de suivre la réponse du staff.',
  },
];

export const mapZones = [
  {
    name: 'Relais Merryweather',
    type: 'Point de départ',
    detail: 'Zone d’arrivée et de regroupement des survivants.',
    x: 58,
    y: 91,
    tone: 'strategic',
    kind: 'point',
    shortLabel: 'Relais',
  },
  {
    name: 'Observatoire EMS',
    type: 'Point médical',
    detail: 'Repère de soins et zone d’évacuation.',
    x: 47,
    y: 58,
    tone: 'medical',
    kind: 'point',
    shortLabel: 'EMS',
  },
  {
    name: 'Secteur Nord',
    type: 'Zone infestée',
    detail: 'Présence élevée de morts-vivants, vigilance maximale.',
    x: 50,
    y: 18,
    tone: 'danger',
    kind: 'zone',
    shortLabel: 'Nord',
  },
  {
    name: 'Secteur Sud',
    type: 'Zone plus calme',
    detail: 'Risque modéré, sans garantie de sécurité.',
    x: 51,
    y: 76,
    tone: 'calm',
    kind: 'zone',
    shortLabel: 'Sud',
  },
];

export const featuredTikTok = {
  url: 'https://www.tiktok.com/@lastsurvivorsofficiel/video/7639071565279137056',
  embedUrl: 'https://www.tiktok.com/embed/v3/7639071565279137056',
  author: '@lastsurvivorsofficiel',
};

export const communityLinks = [
  {
    href: discordUrl,
    label: 'Discord officiel',
    text: 'Annonces, support et organisation RP.',
    icon: Users,
  },
  {
    href: voteUrl,
    label: 'Vote serveur',
    text: 'Soutiens la visibilité de Last Survivors.',
    icon: Vote,
  },
  {
    href: featuredTikTok.url,
    label: 'TikTok officiel',
    text: 'Séquences publiques du serveur.',
    icon: Clapperboard,
  },
  {
    href: storeUrl,
    label: 'Boutique',
    text: 'Accède aux offres si la boutique est configurée.',
    icon: Store,
  },
].filter((link) => link.href.length > 0);

export const defaultCommunityAction = {
  icon: ExternalLink,
  title: 'Canaux en préparation',
  text: 'Les liens vérifiés apparaîtront ici dès leur configuration.',
};

export const accountBenefits = [
  {
    title: 'Profil survivant',
    text: 'Avatar, identité Discord et raccourcis utiles.',
    icon: UserRound,
  },
  {
    title: 'Candidature staff',
    text: 'Un formulaire dédié pour proposer ton aide.',
    icon: ClipboardList,
  },
  {
    title: 'Discord officiel',
    text: 'Un seul canal vérifié pour le support et les annonces.',
    icon: Radio,
  },
];
