import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export interface Command {
  data: Omit <SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandBuilder, 
  run: (interaction: CommandInteraction) => Promise<void>
}