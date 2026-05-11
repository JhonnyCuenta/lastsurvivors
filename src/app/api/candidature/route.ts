import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

type CandidatePayload = {
  pseudoRp?: unknown;
  age?: unknown;
  experienceRp?: unknown;
  characterStory?: unknown;
  motivation?: unknown;
  availability?: unknown;
  rulesAccepted?: unknown;
  website?: unknown;
};

type FieldRule = {
  key: keyof CandidatePayload;
  label: string;
  min: number;
  max: number;
};

const cooldowns = new Map<string, number>();
const COOLDOWN_MS = 60_000;

const fieldRules: FieldRule[] = [
  { key: 'pseudoRp', label: 'Pseudo en jeu', min: 3, max: 40 },
  { key: 'age', label: 'Age', min: 2, max: 32 },
  { key: 'experienceRp', label: 'Experience staff / RP', min: 20, max: 900 },
  { key: 'characterStory', label: 'Presentation staff', min: 80, max: 1800 },
  { key: 'motivation', label: 'Motivation', min: 40, max: 1200 },
  { key: 'availability', label: 'Disponibilites', min: 8, max: 500 },
];

function cleanText(value: unknown, max = 1800) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

function cleanDiscordValue(value: string) {
  return value.replace(/@/g, '@\u200b').replace(/[<>]/g, '').slice(0, 1000);
}

function getClientKey(request: NextRequest, discordId?: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return discordId || forwardedFor || 'unknown';
}

function validatePayload(payload: CandidatePayload) {
  const errors: string[] = [];
  const values = new Map<keyof CandidatePayload, string>();

  if (cleanText(payload.website, 120).length > 0) {
    errors.push('Candidature refusee.');
  }

  for (const rule of fieldRules) {
    const value = cleanText(payload[rule.key], rule.max);
    values.set(rule.key, value);

    if (value.length < rule.min) {
      errors.push(`${rule.label} est trop court.`);
    }
  }

  if (payload.rulesAccepted !== true) {
    errors.push('Les conditions staff doivent etre acceptees.');
  }

  return { errors, values };
}

function buildWebhookPayload(values: Map<keyof CandidatePayload, string>, discordName: string, discordId?: string) {
  const field = (name: string, value: string, inline = false) => ({
    name,
    value: cleanDiscordValue(value) || 'Non renseigne',
    inline,
  });

  return {
    username: 'Last Survivors - Candidatures Staff',
    embeds: [
      {
        title: 'Nouvelle candidature staff',
        color: 14784821,
        timestamp: new Date().toISOString(),
        fields: [
          field('Discord', `${discordName}${discordId ? ` (${discordId})` : ''}`),
          field('Pseudo en jeu', values.get('pseudoRp') ?? '', true),
          field('Age', values.get('age') ?? '', true),
          field('Disponibilites', values.get('availability') ?? ''),
          field('Experience staff / RP', values.get('experienceRp') ?? ''),
          field('Presentation staff', values.get('characterStory') ?? ''),
          field('Motivation', values.get('motivation') ?? ''),
        ],
        footer: {
          text: 'Portail public Last Survivors',
        },
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Connexion Discord requise.' }, { status: 401 });
  }

  if (session.user.guildVerified !== true) {
    return NextResponse.json({ error: 'Membre Discord Last Survivors requis.' }, { status: 403 });
  }

  const clientKey = getClientKey(request, session.user.discordId);
  const now = Date.now();
  const lastAttempt = cooldowns.get(clientKey) ?? 0;

  if (now - lastAttempt < COOLDOWN_MS) {
    return NextResponse.json({ error: 'Patiente une minute avant de renvoyer une candidature staff.' }, { status: 429 });
  }

  let payload: CandidatePayload;
  try {
    payload = (await request.json()) as CandidatePayload;
  } catch {
    return NextResponse.json({ error: 'Requete invalide.' }, { status: 400 });
  }

  const { errors, values } = validatePayload(payload);
  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_APPLICATION_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook candidature staff non configure cote serveur.' }, { status: 503 });
  }

  cooldowns.set(clientKey, now);

  const response = await fetch(webhookUrl, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      buildWebhookPayload(values, session.user.name ?? 'Discord inconnu', session.user.discordId),
    ),
  });

  if (!response.ok) {
    cooldowns.delete(clientKey);
    return NextResponse.json({ error: 'Envoi Discord impossible pour le moment.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
