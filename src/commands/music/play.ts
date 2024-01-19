import { type Command } from "@/interfaces";
import { canPlayMusic } from "@/utils/music";
import { userVoiceChannel } from "@/utils/voice-channel";
import { useMainPlayer } from "discord-player";
import { SlashCommandBuilder } from "discord.js";

const Play: Command = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption((option) =>
      option.setName("song")
        .setDescription("The song to play")
        .setRequired(true)
    ),

  run: async (interaction) => {
    if (!canPlayMusic(interaction)) return;

    const player = useMainPlayer();
    const channel = userVoiceChannel(interaction);
    const query = interaction.options.data.find((opt) => opt.name === "song")?.value?.toString().trim() as string;
    if (!query) await interaction.reply("Please provide a song to play!");

    await interaction.deferReply();

    try {
      const { track } = await player.play(channel, query);
      await interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
      // let's return error if something failed
      await interaction.followUp(`Something went wrong: ${e}`);
    }
  }
};

export default Play;