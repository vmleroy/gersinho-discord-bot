import 'dotenv/config';

export const config = {
  token: process.env.DISCORD_BOT_TOKEN!,
  clientId: process.env.DISCORD_APPLICATION_ID!,
  guildId: process.env.DISCORD_GUILD_DEV_ID!,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};
