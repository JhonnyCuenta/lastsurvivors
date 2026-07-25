import { randomBytes } from 'node:crypto';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { getDiscordAuthStatus } from '@/lib/auth-config';

const DISCORD_USER_AGENT = 'DiscordBot (https://lastsurvivor.fr, 1.0)';

type DiscordGuild = {
  id?: string;
};

type DiscordProfile = {
  id?: string;
};

async function isMemberOfConfiguredGuild(accessToken: string) {
  const guildId = process.env.DISCORD_GUILD_ID?.trim();
  if (!guildId) return false;

  try {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      cache: 'no-store',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`,
        'user-agent': DISCORD_USER_AGENT,
      },
    });

    if (!response.ok) return false;

    const guilds = (await response.json()) as DiscordGuild[];
    return guilds.some((guild) => guild.id === guildId);
  } catch {
    return false;
  }
}

const discordAuthStatus = getDiscordAuthStatus();
const authSecret =
  process.env.AUTH_SECRET ||
  (process.env.NODE_ENV === 'development'
    ? 'last-survivors-local-dev-secret'
    : discordAuthStatus.oauthReady
      ? undefined
      : randomBytes(32).toString('hex'));

const authConfig: NextAuthConfig = {
  trustHost: true,
  // Quand OAuth est désactivé, un secret éphémère maintient les pages publiques
  // silencieuses sans créer de session durable ni exposer une valeur prédictible.
  secret: authSecret,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/dashboard',
    error: '/dashboard',
  },
  providers: [
    Discord({
      authorization: {
        params: {
          scope: 'identify guilds',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== 'discord' || !account.access_token) {
        return '/dashboard?error=discord-auth';
      }

      if (!getDiscordAuthStatus().guildCheckReady) {
        return true;
      }

      const isGuildMember = await isMemberOfConfiguredGuild(account.access_token);
      return isGuildMember ? true : '/dashboard?error=discord-guild';
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === 'discord') {
        const discordProfile = profile as DiscordProfile | undefined;
        token.discordId = discordProfile?.id ?? token.sub;
        token.guildVerified = getDiscordAuthStatus().guildCheckReady;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.discordId = typeof token.discordId === 'string' ? token.discordId : undefined;
      session.user.guildVerified = token.guildVerified === true;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
