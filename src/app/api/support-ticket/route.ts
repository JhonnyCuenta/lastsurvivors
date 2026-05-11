import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

type SupportTicketPayload = {
  category?: unknown;
  priority?: unknown;
  subject?: unknown;
  message?: unknown;
  contact?: unknown;
  confirm?: unknown;
  website?: unknown;
};

const cooldowns = new Map<string, number>();
const COOLDOWN_MS = 45_000;

const categories: Record<string, string> = {
  bug: 'Bug / probleme technique',
  joueur: 'Signalement joueur',
  boutique: 'Boutique / achat',
  question: 'Question serveur',
  autre: 'Autre demande',
};

const priorities: Record<string, string> = {
  low: 'Simple question',
  normal: 'Normal',
  high: 'Important',
};

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

function validatePayload(payload: SupportTicketPayload, hasSession: boolean) {
  const errors: string[] = [];
  const category = cleanText(payload.category, 20);
  const priority = cleanText(payload.priority, 20);
  const subject = cleanText(payload.subject, 120);
  const message = cleanText(payload.message, 1800);
  const contact = cleanText(payload.contact, 80);

  if (cleanText(payload.website, 120).length > 0) {
    errors.push('Ticket refuse.');
  }

  if (!categories[category]) {
    errors.push('Categorie invalide.');
  }

  if (!priorities[priority]) {
    errors.push('Priorite invalide.');
  }

  if (!hasSession && contact.length < 3) {
    errors.push('Indique ton Discord pour que le staff puisse te repondre.');
  }

  if (subject.length < 5) {
    errors.push('Le sujet est trop court.');
  }

  if (message.length < 20) {
    errors.push('Le message est trop court.');
  }

  if (payload.confirm !== true) {
    errors.push('Confirme que ta demande est complete.');
  }

  return {
    errors,
    values: {
      category,
      priority,
      subject,
      message,
      contact,
    },
  };
}

function buildTicketId() {
  return `LS-${Date.now().toString(36).toUpperCase()}`;
}

function buildWebhookPayload(
  ticketId: string,
  values: ReturnType<typeof validatePayload>['values'],
  discordName?: string | null,
  discordId?: string,
) {
  const field = (name: string, value: string, inline = false) => ({
    name,
    value: cleanDiscordValue(value) || 'Non renseigne',
    inline,
  });

  const contact = discordName ? `${discordName}${discordId ? ` (${discordId})` : ''}` : values.contact;

  return {
    username: 'Last Survivors - Support',
    embeds: [
      {
        title: `Nouveau ticket support ${ticketId}`,
        color: 16032331,
        timestamp: new Date().toISOString(),
        fields: [
          field('Contact Discord', contact),
          field('Categorie', categories[values.category] ?? values.category, true),
          field('Priorite', priorities[values.priority] ?? values.priority, true),
          field('Sujet', values.subject),
          field('Message', values.message),
        ],
        footer: {
          text: 'Portail Last Survivors',
        },
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const clientKey = getClientKey(request, session?.user?.discordId);
  const now = Date.now();
  const lastAttempt = cooldowns.get(clientKey) ?? 0;

  if (now - lastAttempt < COOLDOWN_MS) {
    return NextResponse.json({ error: 'Patiente quelques secondes avant de renvoyer un ticket.' }, { status: 429 });
  }

  let payload: SupportTicketPayload;
  try {
    payload = (await request.json()) as SupportTicketPayload;
  } catch {
    return NextResponse.json({ error: 'Requete invalide.' }, { status: 400 });
  }

  const { errors, values } = validatePayload(payload, Boolean(session?.user));
  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  }

  const webhookUrl = (
    process.env.DISCORD_SUPPORT_WEBHOOK_URL ||
    process.env.DISCORD_APPLICATION_WEBHOOK_URL ||
    ''
  ).trim();

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook support non configure cote serveur.' }, { status: 503 });
  }

  cooldowns.set(clientKey, now);
  const ticketId = buildTicketId();

  const response = await fetch(webhookUrl, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildWebhookPayload(ticketId, values, session?.user?.name, session?.user?.discordId)),
  });

  if (!response.ok) {
    cooldowns.delete(clientKey);
    return NextResponse.json({ error: 'Envoi Discord impossible pour le moment.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, ticketId });
}
