# Liaison bot → portail

Le portail lit les données du bot exclusivement côté serveur. Le jeton ne doit jamais être
préfixé par `NEXT_PUBLIC_`.

## Bot Discord

Variables :

```env
PORTAL_API_TOKEN=generer_un_secret_aleatoire_de_32_caracteres_minimum
PORTAL_API_RATE_LIMIT_PER_MINUTE=60
PORTAL_API_REQUIRE_HTTPS=true
PORTAL_API_TIMEOUT_MS=5000
```

Routes en lecture seule :

- `GET /api/portal/v1/health`
- `GET /api/portal/v1/status`
- `GET /api/portal/v1/transmissions?limit=20`
- `GET /api/portal/v1/events?from=<ISO>&to=<ISO>&limit=20`
- `GET /api/portal/v1/changelog?limit=10`

Toutes les routes exigent `Authorization: Bearer <PORTAL_API_TOKEN>`. En production, le
reverse proxy doit transmettre `X-Forwarded-Proto: https`.

## Portail Next.js

Variables serveur :

```env
BOT_PORTAL_API_URL=https://bot-api.exemple.fr
BOT_PORTAL_API_TOKEN=meme_secret_que_le_bot
```

Tant que ces deux variables ne sont pas configurées, le portail affiche un état vide identifié
et n’invente aucune transmission.

## FiveM

Aucune ligne supplémentaire n’est nécessaire dans `server.cfg`. Les contrats FiveM existants
restent inchangés.
