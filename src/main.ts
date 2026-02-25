import { Client, GatewayIntentBits } from 'discord.js';
import { config } from '@/config';
import { Intents } from '@/config/intents';
import { deployCommands, setupCommands } from '@/config/slash-commands';
import { setupClientEvents } from './config/events';

async function startBot() {
  console.log('------------------------------');
  console.log('[BOT] | Starting bot...');
  const client = new Client({ intents: Intents });

  await deployCommands();
  setupCommands(client);
  setupClientEvents(client);

  await client.login(config.token);
}

startBot();
