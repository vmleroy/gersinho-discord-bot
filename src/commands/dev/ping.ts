import { type Command } from "@/interfaces";
import { SlashCommandBuilder } from "discord.js";

const Ping: Command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
        
    run: async (interaction) => {
        await interaction.reply("Pong!");
    }
};

export default Ping;