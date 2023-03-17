import { Client, GatewayIntentBits, IntentsBitField } from "discord.js";

const intents = new IntentsBitField();
intents.add(
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.GuildMessageTyping,
  IntentsBitField.Flags.GuildVoiceStates,
  IntentsBitField.Flags.MessageContent
);

export const BOT_CLIENT = new Client({
  intents: intents,
});
