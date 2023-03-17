import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../interfaces";

const Ping: ICommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  run: async (interaction) => {
    await interaction.reply("Pong!");
  }
};

export default Ping;