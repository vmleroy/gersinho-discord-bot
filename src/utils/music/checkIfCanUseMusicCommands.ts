import { CommandInteraction } from "discord.js";
import { mAlert } from "../../embeds";
import { botVoiceChannel, getVoiceChannel } from "../voiceChannel";
import { getQueue } from "./getQueue";

export const checkIfCanUseMusicCommands = async (
  interaction: CommandInteraction
) => {
  const voiceChannel = getVoiceChannel(interaction);
  const voiceChannel_bot = botVoiceChannel(interaction);

  const queue = getQueue(interaction);

  if (!voiceChannel) {
    const embed = mAlert();
    embed
      .setTitle("🎶 Alert!")
      .setDescription("You need to be in a voice channel to play music!");
    await interaction.editReply({ embeds: [embed] });
    return false;
  }

  if (voiceChannel_bot && voiceChannel !== voiceChannel_bot) {
    const embed = mAlert();
    embed
      .setTitle("🎶 Alert!")
      .setDescription(
        "Im already in a voice channel! Check ${voiceChannel_bot.name}!"
      );
    await interaction.editReply({ embeds: [embed] });
    return false;
  }

  if (interaction.commandName !== "m_play" && !queue) {
    const embed = mAlert();
    embed
      .setTitle("🎶 Alert!")
      .setDescription(
        "There is no music or queue to do the action, so use the `/m_play` command first! Also, make sure that im in a voice channel!"
      );
    await interaction.editReply({ embeds: [embed] });
    return false;
  }

  return true;
};
