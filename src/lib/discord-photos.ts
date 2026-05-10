export type DiscordPhoto = {
  id: string;
  messageId: string;
  url: string;
  filename: string;
  width?: number;
  height?: number;
  authorName: string;
  postedAt: string;
  messageUrl?: string;
};

export type DiscordPhotoFeed = {
  configured: boolean;
  photos: DiscordPhoto[];
  lastCheckedAt: string;
  source: 'discord-channel' | 'fallback';
  error?: string;
};

type DiscordAttachment = {
  id?: string;
  url?: string;
  proxy_url?: string;
  filename?: string;
  content_type?: string;
  width?: number;
  height?: number;
};

type DiscordEmbed = {
  image?: { url?: string; width?: number; height?: number };
  thumbnail?: { url?: string; width?: number; height?: number };
};

type DiscordMessage = {
  id?: string;
  timestamp?: string;
  author?: {
    username?: string;
    global_name?: string | null;
  };
  attachments?: DiscordAttachment[];
  embeds?: DiscordEmbed[];
};

const DISCORD_API_BASE = 'https://discord.com/api/v10';
const IMAGE_EXTENSION_RE = /\.(png|jpe?g|webp|gif)(\?.*)?$/i;

function cleanText(value: unknown, fallback: string, maxLength = 80) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function isImageAttachment(attachment: DiscordAttachment) {
  if (attachment.content_type?.toLowerCase().startsWith('image/')) return true;
  return typeof attachment.url === 'string' && IMAGE_EXTENSION_RE.test(attachment.url);
}

function messageUrl(channelId: string, messageId?: string) {
  const guildId = process.env.DISCORD_GUILD_ID?.trim();
  if (!guildId || !messageId) return undefined;
  return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}

function fallback(error?: string): DiscordPhotoFeed {
  return {
    configured: Boolean(process.env.DISCORD_MEDIA_BOT_TOKEN && process.env.DISCORD_MEDIA_CHANNEL_ID),
    photos: [],
    lastCheckedAt: new Date().toISOString(),
    source: 'fallback',
    error,
  };
}

export async function getDiscordPhotos(): Promise<DiscordPhotoFeed> {
  const token = process.env.DISCORD_MEDIA_BOT_TOKEN?.trim();
  const channelId = process.env.DISCORD_MEDIA_CHANNEL_ID?.trim();

  if (!token || !channelId) {
    return fallback('Flux Discord non configure.');
  }

  const limit = Math.min(Math.max(Number(process.env.DISCORD_MEDIA_LIMIT || 30), 5), 50);
  const endpoint = `${DISCORD_API_BASE}/channels/${encodeURIComponent(channelId)}/messages?limit=${limit}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        accept: 'application/json',
        authorization: `Bot ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return fallback(`Discord a repondu ${response.status}.`);
    }

    const messages = (await response.json()) as DiscordMessage[];
    const photos: DiscordPhoto[] = [];

    for (const message of messages) {
      const authorName = cleanText(message.author?.global_name || message.author?.username, 'Survivant Discord');
      const postedAt = message.timestamp || new Date().toISOString();

      for (const attachment of message.attachments || []) {
        if (!isImageAttachment(attachment) || !attachment.url) continue;

        photos.push({
          id: attachment.id || `${message.id}-${photos.length}`,
          messageId: message.id || '',
          url: attachment.url,
          filename: cleanText(attachment.filename, 'photo-discord', 120),
          width: attachment.width,
          height: attachment.height,
          authorName,
          postedAt,
          messageUrl: messageUrl(channelId, message.id),
        });
      }

      for (const embed of message.embeds || []) {
        const image = embed.image || embed.thumbnail;
        if (!image?.url || !IMAGE_EXTENSION_RE.test(image.url)) continue;

        photos.push({
          id: `${message.id}-embed-${photos.length}`,
          messageId: message.id || '',
          url: image.url,
          filename: 'image-discord',
          width: image.width,
          height: image.height,
          authorName,
          postedAt,
          messageUrl: messageUrl(channelId, message.id),
        });
      }
    }

    return {
      configured: true,
      photos: photos.slice(0, 18),
      lastCheckedAt: new Date().toISOString(),
      source: 'discord-channel',
    };
  } catch {
    return fallback('Lecture Discord impossible pour le moment.');
  }
}
