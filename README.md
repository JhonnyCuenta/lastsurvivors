# Portail Joueurs Last Survivors

Site public separe de FiveMetrics pour les joueurs du serveur FiveM `LAST SURVIVORS`.
Les pages publiques restent accessibles sans compte. La connexion Discord est optionnelle et sert uniquement au profil joueur et a la candidature.

## Installation

```powershell
cd "C:\Users\djonn\Desktop\serveur fiveM last survivors\[SAAS]\last-survivors-portal"
npm install
npm run dev
```

Le site local demarre sur:

```txt
http://localhost:30176
```

## Variables

Copier `.env.example` vers `.env.local` si besoin:

```env
AUTH_SECRET=""
AUTH_DISCORD_ID=""
AUTH_DISCORD_SECRET=""
DISCORD_GUILD_ID=""
DISCORD_APPLICATION_WEBHOOK_URL=""
DISCORD_MEDIA_BOT_TOKEN=""
DISCORD_MEDIA_CHANNEL_ID=""
DISCORD_MEDIA_LIMIT="30"
FIVEM_SERVER_ENDPOINT="http://49.12.121.140:30175"
NEXT_PUBLIC_CONNECT_COMMAND="connect 49.12.121.140:30175"
NEXT_PUBLIC_DISCORD_URL=""
NEXT_PUBLIC_DISCORD_MEDIA_CHANNEL_URL=""
NEXT_PUBLIC_VOTE_URL=""
NEXT_PUBLIC_STORE_URL=""
```

`AUTH_SECRET`, `AUTH_DISCORD_SECRET`, `DISCORD_GUILD_ID`, `DISCORD_APPLICATION_WEBHOOK_URL`, `DISCORD_MEDIA_BOT_TOKEN`, `DISCORD_MEDIA_CHANNEL_ID` et `FIVEM_SERVER_ENDPOINT` restent cote serveur. Les liens `NEXT_PUBLIC_*` sont publics et peuvent rester vides: le site masque automatiquement les boutons non configures.

Generer `AUTH_SECRET`:

```powershell
npx auth secret
```

Redirect Discord a ajouter dans le portail developpeur Discord:

```txt
http://localhost:30176/api/auth/callback/discord
https://TON-DOMAINE-VERCEL/api/auth/callback/discord
```

## API publique

```txt
GET /api/server-status
POST /api/candidature
GET /api/discord-photos
```

Retourne uniquement des donnees publiques: statut, nombre total de joueurs connectes, capacite, nom serveur, commande de connexion et date de verification.

`POST /api/candidature` exige une session Discord membre du serveur configure dans `DISCORD_GUILD_ID`. La candidature est envoyee au staff via `DISCORD_APPLICATION_WEBHOOK_URL`, sans base de donnees en v1.

`GET /api/discord-photos` lit les derniers messages du salon `DISCORD_MEDIA_CHANNEL_ID` via un bot Discord. Le bot doit avoir acces au salon avec les permissions `View Channel` et `Read Message History`. Seules les images jointes ou embeds image sont retournees au frontend; le token bot reste serveur.

## Upload GitHub

Repo prevu:

```bash
git remote add origin https://github.com/JhonnyCuenta/lastsurvivors.git
git push -u origin main
```

Ne pas commiter `.env`, `.next`, `.runtime` ou `node_modules`.

## Deploiement Vercel

Projet separe recommande:

```bash
npm run build
vercel
vercel --prod
```

Ajouter les variables ci-dessus dans les variables d'environnement Vercel.

Le projet Vercel doit etre separe de FiveMetrics et branche sur le repo GitHub du portail.
