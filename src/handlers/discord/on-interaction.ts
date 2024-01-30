import type { Interaction } from "discord.js";
import { getCommands } from "@/commands";

export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  const { commands } = getCommands();
  for (const command of commands) {
    if (interaction.commandName === command.data.name) {
      command.run(interaction);
    }
  }
}