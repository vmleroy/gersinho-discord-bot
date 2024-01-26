import chalk from "chalk";
import { REST, Routes } from "discord.js";
import { getCommands } from "@/commands";

export const getCommandFiles = () => {
  const { files } = getCommands();
  return files;
}

export const FetchCommands = async () => {
  const CommandList = getCommands().commands;
  const CommandListData = CommandList.map((cmd) => cmd.data.toJSON());

  console.log(`[${chalk.blue("INFO")}] Registering ${CommandListData.length} ${CommandListData.length > 1 ? "commands" : "command"}...`)

  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN as string);;
  await rest.put(
    Routes.applicationCommands(process.env.APPLICATION_ID as string),
    { body: CommandListData }
  );

  console.log(`[${chalk.blue("INFO")}] ${CommandListData.length} ${CommandListData.length > 1 ? "commands" : "command"} has been loaded!`)
  console.log(`[${chalk.blue("INFO")}] ${CommandListData.length > 1 ? "Commands" : "Command"}: ${chalk.italic(CommandListData.map((cmd) => cmd.name).join(", "))}`)
}