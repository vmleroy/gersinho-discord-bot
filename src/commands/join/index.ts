import { SlashCommandBuilder } from 'discord.js';
import { ICommand } from '@/interfaces/command';
import {
  isBotInAVoiceChannel,
  joinVoiceChannel,
  isUserInAVoiceChannel,
  isUserInSameVoiceChannel,
  getUserVoiceChannel,
} from '@/utils/voice-channel';

export const JoinCommand: ICommand = {
  type: 'public',
  onlyAnswerInGuild: true,

  data: new SlashCommandBuilder().setName('join').setDescription('Join a voice channel'),

  async execute(interaction) {
    const guild = interaction.guild!;

    if (isBotInAVoiceChannel(guild)) {
      await interaction.reply('I am already in a voice channel.');
      return;
    }

    if (!isUserInAVoiceChannel(guild, interaction.user.id)) {
      await interaction.reply('You need to be in a voice channel to use this command.');
      return;
    }

    if (isUserInSameVoiceChannel(guild, interaction.user.id)) {
      await interaction.reply('You are already in the same voice channel as me.');
      return;
    }

    const voiceChannel = getUserVoiceChannel(guild, interaction.user.id);
    const botVoiceChannel = await joinVoiceChannel(guild, voiceChannel!);

    if (!botVoiceChannel) {
      await interaction.reply('Could not join the voice channel.');
      return;
    }

    await interaction.reply(`Joined the voice channel: ${botVoiceChannel.name}`);
  },
};
