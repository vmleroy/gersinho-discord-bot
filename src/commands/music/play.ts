import { type Command } from "@/interfaces";
import { SlashCommandBuilder } from "discord.js";

const Play: Command = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption((option) =>
      option.setName("song").setDescription("Song to play").setRequired(true)
    ),

    run: async (interaction) => {
      return;
    }
};

export default Play;