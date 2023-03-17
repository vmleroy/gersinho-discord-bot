import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";
import { GuildIdResolvable } from "distube";

const Resume: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_shuffle")
    .setDescription("Shuffles the music queue"),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;

    try {
      distube.shuffle(interaction.guildId as GuildIdResolvable);
      const embed = mAction();
      embed
        .setTitle("🎶 Queue shuffled")
        .setDescription(`The queue has been shuffled!`);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const embed = mError();
      embed.setDescription(
        "An error occurred while trying to shuffle the queue!"
      );
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Shuffle!", error);
    }
  },
};

export default Resume;
