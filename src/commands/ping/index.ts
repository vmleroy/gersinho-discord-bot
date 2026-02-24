import { ICommand } from '@/interfaces/command';
import { SlashCommandBuilder } from 'discord.js';

export const PingCommand: ICommand = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Answer with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
