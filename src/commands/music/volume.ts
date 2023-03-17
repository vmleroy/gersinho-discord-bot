import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import * as music from "../../utils/music";
import { mAlert, mError } from "../../embeds";
import { GuildIdResolvable } from "distube";

const Volume: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_volume")
    .setDescription("Set the volume of the current song")
    .addIntegerOption((option) =>
      option.setName("song").setDescription("Song to play").setRequired(true)
    ),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    try {
      const volume = interaction?.options?.data.find(
        (option) => option.name === 'volume'
      )?.value as number;
      distube.setVolume(interaction.guildId as GuildIdResolvable, volume);
      const embed = mAlert();
      embed
        .setTitle('🔊 Music volume')
        .setDescription(`Set the volume to ${volume}%`);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const embed = mError();
      embed.setDescription('An error occurred while setting the volume');
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Volume!", error);
    }
  },
};

export default Volume;
