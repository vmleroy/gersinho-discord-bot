import { CommandInteraction } from "discord.js";
import { GuildIdResolvable, Queue } from "distube";
import { distube } from "../../config";

export const getQueue = (interaction: CommandInteraction) => {
  const queue = distube.queues.get(
    interaction.guildId as GuildIdResolvable
  ) as Queue;
  return queue;
};