import { ICommand } from '@/interfaces/command';
import {
  getUserVoiceChannel,
  isUserInAVoiceChannel,
  isUserInSameVoiceChannel,
  joinVoiceChannel,
} from '@/utils/voice-channel';
import { SlashCommandBuilder } from 'discord.js';

export const PlayCommand: ICommand = {
  type: 'public',
  onlyAnswerInGuild: true,

  data: new SlashCommandBuilder().setName('play').setDescription('Play a song'),

  async execute(interaction) {
    const guild = interaction.guild!;

    if (!isUserInAVoiceChannel(guild, interaction.user.id)) {
      await interaction.reply('You need to be in a voice channel to use this command.');
      return;
    }

    if (!isUserInSameVoiceChannel(guild, interaction.user.id)) {
      const voiceChannel = getUserVoiceChannel(guild, interaction.user.id);
      if (!voiceChannel) {
        await interaction.reply('Could not find your voice channel.');
        return;
      }

      try {
        await joinVoiceChannel(guild, voiceChannel);
        await interaction.reply(`Joined your voice channel: ${voiceChannel.name}`);
      } catch (error) {
        console.error('Error joining voice channel:', error);
        await interaction.reply('Failed to join your voice channel. Please try again later.');
      }
    }
  },
};
