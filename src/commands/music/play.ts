import {
  GuildMember,
  GuildTextBasedChannel,
  SlashCommandBuilder,
} from "discord.js";
import { ICommand } from "../../interfaces";
import { distube } from "../../config";
import { getVoiceChannel } from "../../utils";
import { checkIfCanUseMusicCommands } from "../../utils/music";

const Play: ICommand = {
  data: new SlashCommandBuilder()
    .setName("m_play")
    .setDescription("Searches for a song and plays it")
    .addStringOption((option) =>
      option.setName("song").setDescription("Song to play").setRequired(true)
    ),
  run: async (interaction) => {
    if (!checkIfCanUseMusicCommands(interaction)) return;

    const songUrlOrName = interaction.options?.data
      .find((option) => option.name === "song")
      ?.value?.toString()
      .trim() as string;
    const voiceChannel = getVoiceChannel(interaction);
    await distube.play(voiceChannel, songUrlOrName, {
      textChannel: interaction.channel as GuildTextBasedChannel,
      member: interaction.member as GuildMember,
    })
    .catch(async (error) => {
      await interaction.editReply(`❌ An error occured while trying to play the song: ${error.message}`);
      console.log("[ERROR] An error ocurred at Play!", error);
    });
    await interaction.editReply("Song added to queue!");
    await interaction.deleteReply();
  },
};

export default Play;
