export type DiscordAuthStatus = {
  oauthReady: boolean;
  guildCheckReady: boolean;
};

export function getDiscordAuthStatus(): DiscordAuthStatus {
  return {
    oauthReady: Boolean(process.env.AUTH_DISCORD_ID?.trim() && process.env.AUTH_DISCORD_SECRET?.trim()),
    guildCheckReady: Boolean(process.env.DISCORD_GUILD_ID?.trim()),
  };
}
