import { Client, Events } from 'discord.js';

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
      if (command.onlyAnswerInGuild && !interaction.guild) {
        await interaction.reply({
          content: 'This command can only be used in a server.',
          ephemeral: true,
        });
        return;
      }

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
