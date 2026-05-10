export type DiscordAuthStatus = {
  clientIdReady: boolean;
  clientSecretReady: boolean;
  oauthReady: boolean;
  guildCheckReady: boolean;
  missingOAuthEnv: string[];
};

export function getDiscordAuthStatus(): DiscordAuthStatus {
  const clientIdReady = Boolean(process.env.AUTH_DISCORD_ID?.trim());
  const clientSecretReady = Boolean(process.env.AUTH_DISCORD_SECRET?.trim());

  return {
    clientIdReady,
    clientSecretReady,
    oauthReady: clientIdReady && clientSecretReady,
    guildCheckReady: Boolean(process.env.DISCORD_GUILD_ID?.trim()),
    missingOAuthEnv: [
      !clientIdReady ? 'AUTH_DISCORD_ID' : null,
      !clientSecretReady ? 'AUTH_DISCORD_SECRET' : null,
    ].filter((value): value is string => Boolean(value)),
  };
}
