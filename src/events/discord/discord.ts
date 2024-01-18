import { Client, Events } from 'discord.js';	
import { onInteraction, onReady } from '@/events/discord';	

export const discordEvents = (bot: Client) => {	
  bot.once(Events.ClientReady, (c) => {	
    console.log('Ready! Logged in as ' + c.user.tag);	
    onReady();	
  });	

  bot.on(Events.InteractionCreate, async (interaction) => {	
    await onInteraction(interaction);	
  });
}