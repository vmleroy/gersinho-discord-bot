import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";
import { GuildIdResolvable } from "distube";

const Stop: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_stop")
    .setDescription("Stops the current music queue!"),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    try {
      if (queue?.playing) {
        await distube.stop(interaction.guildId as GuildIdResolvable);
        const embed = mAction();
        embed
          .setTitle("🎶 Stopped")
          .setDescription(`Stopped and cleared the current queue!`);
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      const embed = mError();
      embed.setDescription("An error occurred while trying to stop the song!");
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Stop!", error);
    }
  },
};

export default Stop;
