import { ICommand } from '@/interfaces/command';
import { SlashCommandBuilder } from 'discord.js';

export const PlayCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube')
    .addStringOption((option) =>
      option.setName('url').setDescription('The URL of the video').setRequired(true),
    ),
  async execute(interaction) {
    const url = interaction.options.getString('url', true);
    // Lógica para tocar a música usando a URL fornecida
    await interaction.reply(`Tocando a música do YouTube: ${url}`);
  },
};
