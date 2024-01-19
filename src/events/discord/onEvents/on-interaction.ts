import { type Interaction } from "discord.js";
import { CommandList } from "@/commands";

const commandNotToDefer = ["ping", "reload-command"];

export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  for (const command of CommandList) {
    if (interaction.commandName === command.data.name) {
      if (!commandNotToDefer.includes(command.data.name))
        await interaction.deferReply();
      command.run(interaction);
    }
  }
}