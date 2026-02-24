import { REST } from 'discord.js';
import { config } from '@/config';

export const Rest = new REST({ version: '10' }).setToken(config.token);
