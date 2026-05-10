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
  diagnostics?: {
    messagesChecked: number;
    attachmentsChecked: number;
    imageAttachmentsChecked: number;
    embedsChecked: number;
    imageEmbedsChecked: number;
    newestMessageAt?: string;
  };
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

function isLikelyImageUrl(value?: string) {
  return typeof value === 'string' && IMAGE_EXTENSION_RE.test(value);
}

function isImageAttachment(attachment: DiscordAttachment) {
  if (attachment.content_type?.toLowerCase().startsWith('image/')) return true;
  if (attachment.width && attachment.height) return true;
  return isLikelyImageUrl(attachment.url) || isLikelyImageUrl(attachment.proxy_url);
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
    diagnostics: {
      messagesChecked: 0,
      attachmentsChecked: 0,
      imageAttachmentsChecked: 0,
      embedsChecked: 0,
      imageEmbedsChecked: 0,
    },
  };
}

export async function getDiscordPhotos(): Promise<DiscordPhotoFeed> {
  const token = process.env.DISCORD_MEDIA_BOT_TOKEN?.trim();
  const channelId = process.env.DISCORD_MEDIA_CHANNEL_ID?.trim();

  if (!token || !channelId) {
    return fallback('Flux Discord non configure.');
  }

  const limit = Math.min(Math.max(Number(process.env.DISCORD_MEDIA_LIMIT || 100), 5), 100);
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
    if (!Array.isArray(messages)) {
      return fallback('Reponse Discord inattendue.');
    }

    const photos: DiscordPhoto[] = [];
    const diagnostics = {
      messagesChecked: messages.length,
      attachmentsChecked: 0,
      imageAttachmentsChecked: 0,
      embedsChecked: 0,
      imageEmbedsChecked: 0,
      newestMessageAt: messages.find((message) => message.timestamp)?.timestamp,
    };

    for (const message of messages) {
      const authorName = cleanText(message.author?.global_name || message.author?.username, 'Survivant Discord');
      const postedAt = message.timestamp || new Date().toISOString();

      for (const attachment of message.attachments || []) {
        diagnostics.attachmentsChecked += 1;
        const imageUrl = attachment.url || attachment.proxy_url;
        if (!isImageAttachment(attachment) || !imageUrl) continue;

        diagnostics.imageAttachmentsChecked += 1;

        photos.push({
          id: attachment.id || `${message.id}-${photos.length}`,
          messageId: message.id || '',
          url: imageUrl,
          filename: cleanText(attachment.filename, 'photo-discord', 120),
          width: attachment.width,
          height: attachment.height,
          authorName,
          postedAt,
          messageUrl: messageUrl(channelId, message.id),
        });
      }

      for (const embed of message.embeds || []) {
        diagnostics.embedsChecked += 1;
        const image = embed.image || embed.thumbnail;
        if (!image?.url || (!isLikelyImageUrl(image.url) && !(image.width && image.height))) continue;

        diagnostics.imageEmbedsChecked += 1;

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
      diagnostics,
    };
  } catch {
    return fallback('Lecture Discord impossible pour le moment.');
  }
}
