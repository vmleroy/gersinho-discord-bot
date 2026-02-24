import { Routes } from 'discord.js';
import { config } from '@/config';
import { Rest } from '@/config/rest';

export const clearApplicationCommands = async () => {
  console.log('[COMMANDS] | Clearing global commands...');
  try {
    await Rest.put(Routes.applicationCommands(config.clientId), { body: [] });
    console.log('\t✅ | Global commands removed successfully!');
  } catch (error) {
    console.error('\t❌ | Error while clearing global commands:', error);
  }
};

export const clearGuildCommands = async () => {
  console.log('[COMMANDS] | Clearing guild commands...');
  try {
    await Rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: [] });
    console.log('\t✅ | Guild commands removed successfully!');
  } catch (error) {
    console.error('\t❌ | Error while clearing guild commands:', error);
  }
};

export const clearAllCommands = async () => {
  console.log('[COMMANDS] | Clearing all commands...');
  try {
    await clearApplicationCommands();
    await clearGuildCommands();
    console.log('\t✅ | All commands were removed successfully!');
  } catch (error) {
    console.error('\t❌ | Error while removing commands:', error);
  }
};
