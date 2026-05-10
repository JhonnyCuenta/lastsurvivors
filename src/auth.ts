import NextAuth, { type NextAuthConfig } from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { getDiscordAuthStatus } from '@/lib/auth-config';

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
      },
    });

    if (!response.ok) return false;

    const guilds = (await response.json()) as DiscordGuild[];
    return guilds.some((guild) => guild.id === guildId);
  } catch {
    return false;
  }
}

const authConfig: NextAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || (process.env.NODE_ENV === 'development' ? 'last-survivors-local-dev-secret' : undefined),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/profil',
    error: '/profil',
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
        return '/profil?error=discord-auth';
      }

      if (!getDiscordAuthStatus().guildCheckReady) {
        return true;
      }

      const isGuildMember = await isMemberOfConfiguredGuild(account.access_token);
      return isGuildMember ? true : '/profil?error=discord-guild';
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
