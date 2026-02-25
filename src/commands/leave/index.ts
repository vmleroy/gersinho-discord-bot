import { SlashCommandBuilder } from 'discord.js';
import { ICommand } from '@/interfaces/command';
import { isBotInAVoiceChannel, leaveVoiceChannel } from '@/utils/voice-channel';

export const LeaveCommand: ICommand = {
  type: 'public',
  onlyAnswerInGuild: true,

  data: new SlashCommandBuilder().setName('leave').setDescription('Leave the voice channel'),

  async execute(interaction) {
    const guild = interaction.guild!;

    if (!isBotInAVoiceChannel(guild)) {
      await interaction.reply('I am not currently in a voice channel.');
      return;
    }

    try {
      const botVoiceChannel = leaveVoiceChannel(guild);

      if (!botVoiceChannel) {
        await interaction.reply('Could not find the voice channel I am in.');
        return;
      }

      await interaction.reply(`Left the voice channel: ${botVoiceChannel.name}`);
    } catch (error) {
      console.error('Error leaving voice channel:', error);
      await interaction.reply('Failed to leave the voice channel. Please try again later.');
    }
  },
};
