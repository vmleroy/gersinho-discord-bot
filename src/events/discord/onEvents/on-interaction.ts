import { type Interaction } from "discord.js";
import { CommandList } from "@/commands";

const commandNotToDefer = ["ping", "reload-command"];

export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  for (const command of CommandList) {
    if (interaction.commandName === command.data.name) {
      command.run(interaction);
    }
  }
}