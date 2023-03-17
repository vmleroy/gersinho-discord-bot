import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import * as music from "../../utils/music";
import { mAlert, mError } from "../../embeds";
import { GuildIdResolvable } from "distube";

const Autoplay: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_autoplay")
    .setDescription("Toggle music autoplay"),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;

    try {
      const autoplay = distube.toggleAutoplay(
        interaction.guildId as GuildIdResolvable
      );
      const embed = mAlert();
      embed
        .setTitle('🔁 Autoplay')
        .setDescription(`Set autoplay to ${autoplay ? 'on' : 'off'}`);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const embed = mError();
      embed.setDescription('An error occurred while setting autoplay');
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Autoplay!", error);
    }
  },
};

export default Autoplay;
