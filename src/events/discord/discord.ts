import { Client, Events } from 'discord.js';	
import { onInteraction, onReady } from '@/handlers/discord';

export const discordEvents = (bot: Client) => {	
  bot.once(Events.ClientReady, (c) => {	    
    onReady(c);	
  });	

  bot.on(Events.InteractionCreate, async (interaction) => {	
    await onInteraction(interaction);	
  });
}