import fs from 'fs';
import path from 'path';
import { Routes, Client, Collection } from 'discord.js';
import { Rest } from '@/config/rest';
import { config } from '@/config';
import { ICommand } from '@/interfaces/command';

const getCommands = () => {
  const commands = new Collection<string, ICommand>();
  const commandsPath = path.join(__dirname, '..', '..', 'commands');

  function findCommandFiles(dir: string) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        findCommandFiles(fullPath);
      }

      if (entry.endsWith('.ts')) {
        const commandModule = require(fullPath);
        const command = commandModule[Object.keys(commandModule)[0]];
        if (command && command.data && typeof command.data.toJSON === 'function') {
          commands.set(command.data.name, command);
        }
      }
    }
  }

  findCommandFiles(commandsPath);
  return commands;
};

export const setupCommands = (client: Client) => {
  console.log('[COMMANDS] | Setting up commands in the client...');
  try {
    const commands = getCommands();
    client.commands = commands;
    console.log('\t✅ | Commands registered in the client!');
  } catch (error) {
    console.error('\t❌ | Error while setting up commands in the client:', error);
  }
};

export const deployCommands = async () => {
  console.log('[COMMANDS] | Deploying commands...');
  try {
    const commands = getCommands();

    if (config.isDevelopment) {
      await Rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
        body: Array.from(commands.values()).map((command) => command.data.toJSON()),
      });
      console.log('\t✅ | Commands registered only for the development guild!');
    } else {
      await Rest.put(Routes.applicationCommands(config.clientId), {
        body: Array.from(commands.values()).map((command) => command.data.toJSON()),
      });
      console.log('\t✅ | Commands registered globally!');
    }
  } catch (error) {
    console.error('\t❌ | Error while registering commands:', error);
  }
};
