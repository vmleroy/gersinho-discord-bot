import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";

const SkipTo: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_skip_to")
    .setDescription("Skips the current song!")
    .addIntegerOption((option) =>
      option
        .setName("song_number")
        .setDescription("The song number to skip to!")
        .setRequired(true)
    ),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    const queueSongPos =
      (interaction?.options?.data.find(
        (option) => option.name === "song_number"
      )?.value as number);
    try {
      const song = queue?.songs[queueSongPos];
      await queue?.jump(queueSongPos);
      const embed = mAction();
      embed
        .setTitle("🎶 Skipped")
        .setDescription(`Skipped to song **#${queueSongPos}. ${song.name}**!`);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const embed = mError();
      embed.setDescription(
        "An error occurred while trying to skip to the song!"
      );
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at SkipTo!", error);
    }
  },
};

export default SkipTo;
