import { TextChannel } from "discord.js";
import { mAlert, mError, mAction } from "../../embeds";
import DisTube from "distube";

export const distubeEvents = async (distube: DisTube) => {
  distube
    .on("initQueue", (queue) => {
      queue.autoplay = false;
      queue.volume = 100;
    })
    .on("playSong", (queue, song) => {
      const embed = mAction();
      embed
        .setTitle("🎶 Now Playing")
        .setDescription(
          `\`${song.name}\` - \`${song.formattedDuration}\`. Requested by: ${song.user}\n`
        );
      const textChannel = queue.textChannel as TextChannel;
      textChannel.send({ embeds: [embed] });
    })
    .on("addSong", (queue, song) => {
      const embed = mAlert();
      if (queue.songs.length > 1) {
        if (song.isLive) {
          embed
            .setTitle("🎶 Live Stream Added")
            .setDescription(
              `\`${song.name}\` - \`${song.formattedDuration}\`. Requested by: ${song.user}\n`
            );
        } else {
          embed
            .setTitle("🎶 Song Added")
            .setDescription(
              `\`${song.name}\` - \`${song.formattedDuration}\`. Requested by: ${song.user}\n`
            );
        }
        const textChannel = queue.textChannel as TextChannel;
        textChannel.send({ embeds: [embed] });
      }
    })
    .on("addList", (queue, playlist) => {
      const embed = mAlert();
      embed
        .setTitle("🎶 Playlist Added")
        .setDescription(
          `\`${playlist.name}\` - \`${playlist.songs.length} songs\`. Requested by: ${playlist.user}\n`
        );
      const textChannel = queue.textChannel as TextChannel;
      textChannel.send({ embeds: [embed] });
    })
    .on("error", async (textChannel, e) => {
      console.error("[ERROR] An error ocurrer at distube", e);
      const embed = mError();
      embed.setDescription(`An error encountered: ${e.message.slice(0, 1979)}`);
      const channel = textChannel as TextChannel;
      await channel?.send({ embeds: [embed] });
    });
};
