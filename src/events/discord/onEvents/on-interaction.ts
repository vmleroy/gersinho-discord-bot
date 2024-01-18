import { type Interaction } from "discord.js";
import { CommandList } from "../../../commands";

const commandNotToDefer = ["ping", "server_info"];

export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  for (const Command of CommandList) {
    if (interaction.commandName === Command.data.name) {
      if (!commandNotToDefer.includes(Command.data.name))
        await interaction.deferReply();
      await Command.run(interaction);
      break;
    }
  }
}