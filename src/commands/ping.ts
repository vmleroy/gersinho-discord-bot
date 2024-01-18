import { type Command } from "@/interfaces";
import { SlashCommandBuilder } from "discord.js";

export const Ping: Command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async run(interaction) {
        await interaction.reply("Pong!");
    },
};