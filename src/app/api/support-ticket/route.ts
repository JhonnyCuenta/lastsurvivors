import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createPortalSupportTicket } from '@/lib/bot-portal';

type SupportTicketPayload = {
  category?: unknown;
  priority?: unknown;
  subject?: unknown;
  message?: unknown;
  confirm?: unknown;
  website?: unknown;
};

const cooldowns = new Map<string, number>();
const COOLDOWN_MS = 45_000;

const categoryKeys = {
  bug: 'bug',
  joueur: 'report_player',
  boutique: 'shop',
  question: 'support',
  autre: 'other',
} as const;

const priorities = {
  low: 'Simple question',
  normal: 'Normale',
  high: 'Importante',
} as const;

function cleanText(value: unknown, max = 1800) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

function validatePayload(payload: SupportTicketPayload) {
  const errors: string[] = [];
  const category = cleanText(payload.category, 20);
  const priority = cleanText(payload.priority, 20);
  const subject = cleanText(payload.subject, 120);
  const message = cleanText(payload.message, 1800);

  if (cleanText(payload.website, 120).length > 0) {
    errors.push('Ticket refusé.');
  }

  if (!(category in categoryKeys)) {
    errors.push('Catégorie invalide.');
  }

  if (!(priority in priorities)) {
    errors.push('Priorité invalide.');
  }

  if (subject.length < 5) {
    errors.push('Le sujet est trop court.');
  }

  if (message.length < 20) {
    errors.push('Le message est trop court.');
  }

  if (payload.confirm !== true) {
    errors.push('Confirme que ta demande est complète.');
  }

  return {
    errors,
    values: { category, priority, subject, message },
  };
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const discordId = session?.user?.discordId;

  if (!discordId) {
    return NextResponse.json(
      { error: 'Connecte-toi avec Discord pour ouvrir un ticket.' },
      { status: 401 },
    );
  }

  const now = Date.now();
  const lastAttempt = cooldowns.get(discordId) ?? 0;

  if (now - lastAttempt < COOLDOWN_MS) {
    return NextResponse.json(
      { error: 'Patiente quelques secondes avant de renvoyer un ticket.' },
      { status: 429 },
    );
  }

  let payload: SupportTicketPayload;
  try {
    payload = (await request.json()) as SupportTicketPayload;
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { errors, values } = validatePayload(payload);
  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  }

  const categoryKey = categoryKeys[values.category as keyof typeof categoryKeys];
  const priorityLabel = priorities[values.priority as keyof typeof priorities];
  cooldowns.set(discordId, now);

  const result = await createPortalSupportTicket({
    userDiscordId: discordId,
    categoryKey,
    subject: values.subject,
    description: `Priorité déclarée : ${priorityLabel}\n\n${values.message}`,
  });

  if (!result.ok) {
    cooldowns.delete(discordId);
    return NextResponse.json(
      {
        error:
          result.reason === 'unconfigured'
            ? 'La liaison sécurisée avec le bot doit encore être configurée.'
            : 'Le bot Discord ne peut pas créer le ticket pour le moment.',
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    ticketId: result.data.publicId,
    status: result.data.status,
  });
}
