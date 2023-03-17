import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";

const Queue: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_queue")
    .setDescription("Shows the current music queue")
    .addIntegerOption((option) =>
      option.setName("page").setDescription("Select the page of the queue").setRequired(false)
    ),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    try {
      const embed = mAction();
      embed.setTitle("🎶 Queue");

      const page =
        ((interaction?.options?.data.find((option) => option.name === "page")
          ?.value as number) || 1) - 1;
      const totalPages = Math.ceil(queue.songs.length / 10);

      if (page > totalPages)
        await interaction.editReply(
          `🎶 There are only ${totalPages} pages in the queue!`
        );

      const songsPerPage = page * 10;
      const songs = `${queue.songs
        .slice(songsPerPage, songsPerPage + 10)
        .map((song, id) => {
          let index = songsPerPage + id;
          return `**${index ? index : "Playing"}.** \`[${
            song.formattedDuration
          }] - ${song.name}\` - *Requested: \`@${song.user?.username}\`*`;
        })
        .join("\n")}`;
      embed.setDescription(songs).setFooter({
        text: `Page ${page + 1} of ${totalPages} | ${
          queue.songs.length
        } songs in total`,
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const embed = mError();
      embed.setDescription("An error occurred while trying to show the queue");
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Queue!", error);
    }

  },
};

export default Queue;
