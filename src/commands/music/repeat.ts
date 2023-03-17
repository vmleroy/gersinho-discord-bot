import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import * as music from "../../utils/music";
import { mAlert, mError } from "../../embeds";
import { GuildIdResolvable, RepeatMode } from "distube";

const Repeat: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_repeat")
    .setDescription("Repeats the current song")
    .addIntegerOption((option) =>
      option
        .setName("repeat")
        .setDescription("Repeat mode")
        .setRequired(true)
        .addChoices(
          { name: "Off", value: 0 },
          { name: "Repeat a song", value: 1 },
          { name: "Repeat all queue", value: 2 }
        )
    ),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;

    try {
      const option = interaction?.options?.data.find(
        (option) => option.name === "repeat"
      )?.value as number;
      let mode;
      switch (
        distube.setRepeatMode(interaction.guildId as GuildIdResolvable, option)
      ) {
        case RepeatMode.DISABLED:
          mode = "Off";
          break;
        case RepeatMode.SONG:
          mode = "Repeat a song";
          break;
        case RepeatMode.QUEUE:
          mode = "Repeat all queue";
          break;
      }
      const embed = mAlert();
      embed.setTitle("🔁 Repeat").setDescription(`Set repeat mode to ${mode}`);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const embed = mError();
      embed.setDescription("An error occurred while setting repeat mode");
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Repeat!", error);
    }
  },
};

export default Repeat;
