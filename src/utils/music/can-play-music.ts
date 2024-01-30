import type { CommandInteraction } from "discord.js";
import { botVoiceChannel, userVoiceChannel } from "@/utils/voice-channel";

export const canPlayMusic = async (interaction: CommandInteraction) => {

  const userChannel = userVoiceChannel(interaction);
  const botChannel = botVoiceChannel(interaction);

  if (!userChannel) {
    await interaction.reply("You need to be in a voice channel to play music!");
    return false
  }
  if (botChannel && botChannel !== userChannel) {
    await interaction.reply(`I am already in a voice channel! Please join ${botVoiceChannel.name} to play music!`);
    return false
  }
  return true;
};