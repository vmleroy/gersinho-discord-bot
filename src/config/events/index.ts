import { Client, Events } from 'discord.js';
import { config } from '..';

export const setupClientEvents = (client: Client) => {
  client.once(Events.ClientReady, () => {
    console.log(`[BOT] | Logged in as ${client.user?.tag}`);
    console.log('------------------------------');
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`[EVENTS] ❌ | No command found for ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`[EVENTS] ❌ | Error executing command ${interaction.commandName}:`, error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
        return;
      }
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });
};
