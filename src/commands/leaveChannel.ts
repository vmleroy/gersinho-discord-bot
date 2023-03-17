import {
  CommandInteraction,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { ICommand } from "../interfaces";

import { distube } from "../config";
import { GuildIdResolvable } from "distube";

export const LeaveChannel: ICommand = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave the current voice channel!"),
  run: async (interaction: CommandInteraction) => {
    distube.voices.get(interaction.guildId as GuildIdResolvable)?.leave();
    const channel = interaction.channel as TextChannel;
    await channel.send({ content: "👋 Goodbye!" });
  },
};

export default LeaveChannel;
