import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { mAction } from "../../embeds/Message";
import { ICommand } from "../../interfaces";

const ServerInfo: ICommand = {
  data: new SlashCommandBuilder()
    .setName("server_info")
    .setDescription("Get info about the server"),
  run: async (interaction: CommandInteraction) => {
    const embed = mAction();
    embed
      .setTitle("Server info")
      .setDescription(
        `Name: ${interaction.guild?.name}
            ID: ${interaction.guild?.id}
            Total members: ${interaction.guild?.memberCount}`
      )
      .setTimestamp();
    await interaction.reply({ ephemeral: true, embeds: [embed] });
  },
};

export default ServerInfo;
