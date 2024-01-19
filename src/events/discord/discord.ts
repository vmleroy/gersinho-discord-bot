import chalk from 'chalk';

import { Client, Events } from 'discord.js';	
import { onInteraction, onReady } from '@/events/discord';
import { FetchCommands } from '@/commands';

export const discordEvents = (bot: Client) => {	
  bot.once(Events.ClientReady, (c) => {	
    console.log(chalk.green(`\nReady! Logged in as ${chalk.bold(c.user.tag)}\n`));	    
    onReady();	
  });	

  bot.on(Events.InteractionCreate, async (interaction) => {	
    await onInteraction(interaction);	
  });
}