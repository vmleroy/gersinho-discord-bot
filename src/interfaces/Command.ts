import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export interface ICommand {
    data: Omit <SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandBuilder | SlashCommandSubcommandsOnlyBuilder, 
    run: (interaction: CommandInteraction) => Promise<void>
}