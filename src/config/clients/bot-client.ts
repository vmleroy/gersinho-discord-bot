import { Client, IntentsBitField } from 'discord.js';

let client: Client | null = null

const intents = new IntentsBitField();
intents.add(
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.GuildMessageTyping,
  IntentsBitField.Flags.GuildVoiceStates,
  IntentsBitField.Flags.MessageContent
);

export const BOT_CLIENT: Client = (() => {
  if (!client) {
    client = new Client({
      intents: intents,
    })
  }
  return client
})()