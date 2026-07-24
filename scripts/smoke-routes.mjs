import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const port = 32_176;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const pages = [
  '/',
  '/boutique',
  '/candidature',
  '/carte',
  '/changelog',
  '/communaute',
  '/dashboard',
  '/evenements',
  '/guide',
  '/jouer',
  '/lore',
  '/photos',
  '/profil',
  '/reglement',
  '/serveur',
  '/support',
  '/top-vote',
];

const child = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
  cwd: new URL('..', import.meta.url),
  env: {
    ...process.env,
    NODE_ENV: 'production',
    BOT_PORTAL_API_URL: '',
    BOT_PORTAL_API_TOKEN: '',
    DISCORD_SUPPORT_WEBHOOK_URL: '',
    DISCORD_APPLICATION_WEBHOOK_URL: '',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let logs = '';
child.stdout.on('data', (chunk) => {
  logs += String(chunk);
});
child.stderr.on('data', (chunk) => {
  logs += String(chunk);
});

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Le serveur a quitté prématurément.\n${logs}`);
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Le démarrage est encore en cours.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Délai de démarrage dépassé.\n${logs}`);
}

async function getJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json();
  assert.equal(response.status, 200, `${path} doit répondre 200`);
  return body;
}

try {
  await waitForServer();

  for (const path of pages) {
    const response = await fetch(`${baseUrl}${path}`, { redirect: 'follow' });
    assert.equal(response.status, 200, `${path} doit répondre 200`);
    assert.match(response.headers.get('content-type') || '', /text\/html/);
  }

  const status = await getJson('/api/server-status');
  assert.equal(typeof status.online, 'boolean');
  assert.equal(typeof status.playersOnline, 'number');
  assert.equal(typeof status.connectCommand, 'string');

  const liveEvents = await getJson('/api/live-events');
  assert.ok(Array.isArray(liveEvents.active));
  assert.ok(Array.isArray(liveEvents.recent));

  const voters = await getJson('/api/top-voters');
  assert.ok(Array.isArray(voters.voters));

  const scheduled = await getJson('/api/scheduled-events');
  assert.ok(Array.isArray(scheduled.events));

  const photos = await getJson('/api/discord-photos');
  assert.ok(Array.isArray(photos.photos));

  const transmissions = await getJson('/api/transmissions');
  assert.ok(Array.isArray(transmissions.transmissions));
  assert.equal(transmissions.source, 'unconfigured');

  const providers = await fetch(`${baseUrl}/api/auth/providers`);
  assert.ok([200, 400, 500].includes(providers.status), 'La route OAuth doit rester joignable');

  const invalidSupport = await fetch(`${baseUrl}/api/support-ticket`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
  });
  assert.equal(invalidSupport.status, 401, 'Le support sans connexion doit être refusé');

  const invalidApplication = await fetch(`${baseUrl}/api/candidature`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
  });
  assert.equal(
    invalidApplication.status,
    401,
    'La candidature non authentifiée doit être refusée sans webhook',
  );

  console.log(`Smoke test réussi : ${pages.length} pages et 9 contrats API vérifiés.`);
} finally {
  child.kill('SIGTERM');
}
