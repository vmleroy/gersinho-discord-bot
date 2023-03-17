import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";
import { GuildIdResolvable } from "distube";

const Resume: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_resume")
    .setDescription("Resume the current song"),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    try {
      if (!queue?.playing) {
        distube.resume(interaction.guildId as GuildIdResolvable);
        const currentSong = queue.songs[0];
        const embed = mAction();
        embed
          .setTitle('🎶 Resumed')
          .setDescription(
            `\`${currentSong?.name}\` - \`${currentSong?.formattedDuration}\``
          );
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      const embed = mError();
      embed.setDescription('An error occurred while trying to resume the song');
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Resume!", error);
    }

  },
};

export default Resume;
