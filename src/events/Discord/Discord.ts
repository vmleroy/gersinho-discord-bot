import { Client, Events } from 'discord.js';
import { distube } from '../../config';
import { distubeEvents } from '../Distube';
import { onInteraction, onReady } from '../onEvent';

export const discordEvents = (bot: Client) => {
  bot.once(Events.ClientReady, (c) => {
    console.log('Ready! Logged in as ' + c.user.tag);
    distubeEvents(distube);
    onReady(bot);
  });
  
  bot.on(Events.InteractionCreate, async (interaction) => {
    await onInteraction(interaction);
  });
}