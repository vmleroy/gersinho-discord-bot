import { MessageFlags, SlashCommandBuilder } from 'discord.js';
import { deployCommands } from '@/config/slash-commands';
import { ICommand } from '@/interfaces/command';

export const ReloadCommand: ICommand = {
  type: 'private',
  onlyAnswerInGuild: false,

  data: new SlashCommandBuilder()
    .setName('reload_all')
    .setDescription('Reloads all commands and events.'),

  async execute(interaction) {
    console.log('[COMMANDS] | Reloading all commands and events...');
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      await deployCommands();
      await interaction.editReply('✅ All commands and events have been reloaded successfully!');
      console.log('\t✅ | All commands and events reloaded successfully!');
    } catch (error) {
      await interaction.editReply(
        '❌ Failed to reload commands and events. Check the console for details.',
      );
      console.error('\t❌ | Error reloading commands and events:', error);
    }
  },
};
