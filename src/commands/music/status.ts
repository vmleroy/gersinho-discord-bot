import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../interfaces";
import * as music from "../../utils/music";
import { mAction, mError } from "../../embeds";

const Status: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_status")
    .setDescription("Get the current status of the music player"),
  run: async (interaction) => {
    if (!music.checkIfCanUseMusicCommands(interaction)) return;
    const queue = music.getQueue(interaction);

    try {

      const currentSong = queue.songs[0];
      const currentSongDuration = currentSong.formattedDuration;
      const currentSongName = currentSong.name;
      const currentSongThumbnail = currentSong.thumbnail as string;
  
      const autoplay = queue.autoplay ? "✅" : "❌";
      const repeatMode = queue.repeatMode;
      let repeatModeText = "";
      switch (repeatMode) {
        case 0:
          repeatModeText = "Off";
          break;
        case 1:
          repeatModeText = "🔂 Repeat a song";
          break;
        case 2:
          repeatModeText = "🔁 Repeat all queue";
          break;
      }
      const volume = queue.volume;
  
      const currentSongEmbed = mAction();
      currentSongEmbed.setTitle(`🎶 Music status:`).addFields([
        {
          name: "Current song:",
          value: `${currentSongName}`,
        },
        {
          name: "Current song duration:",
          value: `${currentSongDuration}`,
        },
        {
          name: "Autoplay:",
          value: `${autoplay}`,
          inline: true,
        },
        {
          name: "Repeat mode:",
          value: `${repeatModeText}`,
          inline: true,
        },
        {
          name: "Volume:",
          value: `${volume}%`,
          inline: true,
        },
      ]);
  
      if (currentSongThumbnail) {
        currentSongEmbed.setThumbnail(currentSongThumbnail);
      }
  
      await interaction.editReply({ embeds: [currentSongEmbed] });
    } catch (error) {
      const embed = mError();
      embed.setDescription("An error occurred while trying to get the status!");
      await interaction.editReply({ embeds: [embed] });
      console.log("[ERROR] An error ocurred at Status!", error);
    }
  },
};

export default Status;
