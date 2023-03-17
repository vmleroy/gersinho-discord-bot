import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import { GuildIdResolvable } from "distube";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";

const Pause: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_pause")
    .setDescription("Pause the current song"),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    try {
      if (queue?.playing) {
        distube.pause(interaction.guildId as GuildIdResolvable);
        const currentSong = queue.songs[0];
        const embed = mAction();
        embed
          .setTitle("🎶 Paused")
          .setDescription(
            `\`${currentSong?.name}\` - \`${currentSong?.formattedDuration}\``
          );
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      const embed = mError();
      embed.setDescription("An error occurred while pausing the song!");
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Pause!", error);
    }
  },
};

export default Pause;
