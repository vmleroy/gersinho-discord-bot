import {
  GuildMember,
  SlashCommandBuilder,
  type GuildTextBasedChannel,
} from "discord.js";
import { type Command } from "@/interfaces";
import { DISTUBE_CLIENT as distube } from "@/config/clients";
import { userVoiceChannel } from "@/utils/voice-channel";
import { canPlayMusic } from "@/utils/music";

const Play: Command = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Searches for a song and plays it")
    .addStringOption((option) =>
      option.setName("song").setDescription("Song to play").setRequired(true)
    ),
  run: async (interaction) => {
    if (!canPlayMusic(interaction)) return;
    await interaction.deferReply();

    const voiceChannel = userVoiceChannel(interaction);
    const songUrlOrName = interaction.options?.data
    .find((option) => option.name === "song")
      ?.value?.toString()
      .trim() as string;
    
    await distube.play(voiceChannel, songUrlOrName, {
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
