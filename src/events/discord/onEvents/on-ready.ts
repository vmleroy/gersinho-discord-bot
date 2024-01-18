import { REST, Routes } from "discord.js";
import { CommandList } from "../../../commands";

export const onReady = async () => {
  const rest = new REST({ version: "10" }).setToken(
    process.env.BOT_TOKEN as string
  );

  try {
    const commandData = [];
    for (const Command of CommandList) {
      commandData.push(Command.data.toJSON());
    }
    
    console.log(`[INFO] Loading ${commandData.length} commands... \n   ${commandData.map((cmd) => cmd.name).join(", ")}`)

    await rest.put(
      Routes.applicationCommands(process.env.APPLICATION_ID as string),
      { body: commandData }
    );

    console.log(
      "Successfully registered application commands.\nDiscord API is ready!"
    );
  } catch (error) {
    console.error(error);
  }
};