import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";
import { GuildIdResolvable } from "distube";

const Skip: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_skip")
    .setDescription("Skips the current song!"),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    try {
      const embed = mAction();
      embed.setTitle("🎶 Skipped");
      if (queue?.songs?.length > 1) {
        await distube.skip(interaction.guildId as GuildIdResolvable);
        embed.setDescription(`Skipped the current song!`);
        await interaction.editReply({ embeds: [embed] });
      } else if (queue?.songs?.length === 1) {
        embed.setDescription(`There is no next song to skip to!`);
        await interaction.editReply({ embeds: [embed] });
      } else {
        embed.setDescription(`There is no song to skip!`);
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      const embed = mError();
      embed.setDescription("An error occurred while trying to skip the song!");
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Skip!", error);
    }
  },
};

export default Skip;
