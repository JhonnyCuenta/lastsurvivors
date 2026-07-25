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
    pagesChecked: number;
    messagesChecked: number;
    attachmentsChecked: number;
    imageAttachmentsChecked: number;
    embedsChecked: number;
    imageEmbedsChecked: number;
    newestMessageAt?: string;
    oldestMessageAt?: string;
    hasMore: boolean;
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
const DISCORD_USER_AGENT = 'DiscordBot (https://lastsurvivor.fr, 1.0)';
const DEFAULT_DISCORD_MEDIA_CHANNEL_ID = '1518644775761350777';
const DEFAULT_DISCORD_GUILD_ID = '1427655279352484065';
const IMAGE_EXTENSION_RE = /\.(png|jpe?g|webp|gif)(\?.*)?$/i;

function boundedInteger(value: string | undefined, fallback: number, minimum: number, maximum: number) {
  const parsed = Number.parseInt(value || '', 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, minimum), maximum);
}

function discordBotToken() {
  const rawToken = process.env.DISCORD_MEDIA_BOT_TOKEN;
  if (!rawToken) return undefined;

  let token = rawToken
    .trim()
    .replace(/^DISCORD_MEDIA_BOT_TOKEN\s*=\s*/i, '')
    .trim();

  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'"))
  ) {
    token = token.slice(1, -1).trim();
  }

  return token.replace(/^Bot\s+/i, '').trim() || undefined;
}

function discordMediaChannelId() {
  return process.env.DISCORD_MEDIA_CHANNEL_ID?.trim() || DEFAULT_DISCORD_MEDIA_CHANNEL_ID;
}

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
  const guildId = process.env.DISCORD_GUILD_ID?.trim() || DEFAULT_DISCORD_GUILD_ID;
  if (!guildId || !messageId) return undefined;
  return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}

function fallback(error?: string): DiscordPhotoFeed {
  return {
    configured: Boolean(discordBotToken()),
    photos: [],
    lastCheckedAt: new Date().toISOString(),
    source: 'fallback',
    error,
    diagnostics: {
      pagesChecked: 0,
      messagesChecked: 0,
      attachmentsChecked: 0,
      imageAttachmentsChecked: 0,
      embedsChecked: 0,
      imageEmbedsChecked: 0,
      hasMore: false,
    },
  };
}

export async function getDiscordPhotos(): Promise<DiscordPhotoFeed> {
  const token = discordBotToken();
  const channelId = discordMediaChannelId();

  if (!token || !channelId) {
    return fallback('Flux Discord non configure.');
  }

  const pageSize = boundedInteger(process.env.DISCORD_MEDIA_LIMIT, 100, 5, 100);
  const maxPages = boundedInteger(process.env.DISCORD_MEDIA_SCAN_PAGES, 5, 1, 10);
  const maxPhotos = boundedInteger(process.env.DISCORD_MEDIA_MAX_PHOTOS, 60, 18, 120);

  try {
    const photos: DiscordPhoto[] = [];
    const diagnostics = {
      pagesChecked: 0,
      messagesChecked: 0,
      attachmentsChecked: 0,
      imageAttachmentsChecked: 0,
      embedsChecked: 0,
      imageEmbedsChecked: 0,
      newestMessageAt: undefined as string | undefined,
      oldestMessageAt: undefined as string | undefined,
      hasMore: false,
    };
    let before: string | undefined;

    for (let pageIndex = 0; pageIndex < maxPages && photos.length < maxPhotos; pageIndex += 1) {
      const query = new URLSearchParams({ limit: String(pageSize) });
      if (before) query.set('before', before);

      const endpoint = `${DISCORD_API_BASE}/channels/${encodeURIComponent(channelId)}/messages?${query}`;
      const response = await fetch(endpoint, {
        headers: {
          accept: 'application/json',
          authorization: `Bot ${token}`,
          'user-agent': DISCORD_USER_AGENT,
        },
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (diagnostics.pagesChecked === 0) {
          return fallback(`Discord a répondu ${response.status}.`);
        }
        break;
      }

      const messages = (await response.json()) as DiscordMessage[];
      if (!Array.isArray(messages)) {
        if (diagnostics.pagesChecked === 0) {
          return fallback('Réponse Discord inattendue.');
        }
        break;
      }

      diagnostics.pagesChecked += 1;
      diagnostics.messagesChecked += messages.length;
      diagnostics.newestMessageAt ||= messages.find((message) => message.timestamp)?.timestamp;
      diagnostics.oldestMessageAt = [...messages].reverse().find((message) => message.timestamp)?.timestamp
        || diagnostics.oldestMessageAt;

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

          if (photos.length >= maxPhotos) break;
        }

        if (photos.length >= maxPhotos) break;

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

          if (photos.length >= maxPhotos) break;
        }

        if (photos.length >= maxPhotos) break;
      }

      const oldestMessageId = messages.at(-1)?.id;
      const pageWasFull = messages.length === pageSize;
      diagnostics.hasMore = Boolean(oldestMessageId && pageWasFull);
      if (!diagnostics.hasMore || !oldestMessageId) break;
      before = oldestMessageId;
    }

    return {
      configured: true,
      photos,
      lastCheckedAt: new Date().toISOString(),
      source: 'discord-channel',
      diagnostics,
    };
  } catch {
    return fallback('Lecture Discord impossible pour le moment.');
  }
}
