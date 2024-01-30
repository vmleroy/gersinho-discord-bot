import {
  GuildMember,
  SlashCommandBuilder,
  type GuildTextBasedChannel,
} from "discord.js";
import { type Command } from "@/interfaces";
import { DISTUBE_CLIENT as distube } from "@/config/clients";
import { userVoiceChannel } from "@/utils/voice-channel";
import { canPlayMusic } from "@/utils/music";
import isUrlHttp from "is-url-http";

const Play: Command = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Searches for a song and plays it")
    .addStringOption((option) =>
      option.setName("song").setDescription("Song to play")
    )
    .addStringOption((option) =>
      option.setName("url").setDescription("URL of the song or live stream to play")
    ),
  run: async (interaction) => {
    if (!canPlayMusic(interaction)) return;
    await interaction.deferReply();

    const voiceChannel = userVoiceChannel(interaction);

    const song = interaction.options?.data
      .find((option) => option.name === "song")
      ?.value?.toString()
      .trim() as string;
    const url = interaction.options?.data
      .find((option) => option.name === "url")
      ?.value?.toString()
      .trim() as string;
    const songOrUrl = song || url;

    if (!songOrUrl) {
      interaction.followUp("❌ Please provide a song name or url!");
      return;
    }
    if (song) {
      if (isUrlHttp(song)) {
        interaction.followUp("❌ Please provide a song name, not a url!");
        return;
      }
      await interaction.followUp(`Searching for ${song}...`);
    }
    if (url) {
      if (!isUrlHttp(url)) {
        interaction.followUp("❌ Please provide a valid url!");
        return;
      }
      await interaction.followUp(`Searching for ${url}...`);
    }

    await distube
      .play(voiceChannel, songOrUrl, {
      textChannel: interaction.channel as GuildTextBasedChannel,
      member: interaction.member as GuildMember,
    })
      .catch(async (error) => {
        await interaction.followUp(`❌ An error occured while trying to play the song: ${error.message}`);
        console.log("[ERROR] An error ocurred at Play!", error);
      });
    await interaction.followUp("Song added to queue!");
  },
};

export default Play;
