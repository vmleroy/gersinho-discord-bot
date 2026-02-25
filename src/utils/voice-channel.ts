import { ChannelType, Guild, VoiceChannel } from 'discord.js';
import { joinVoiceChannel as discordJoinVoiceChannel, getVoiceConnection } from '@discordjs/voice';

export const getBotVoiceChannel = (guild: Guild): VoiceChannel | null => {
  const voiceChannels = guild.channels.cache.filter(
    (channel) => channel.type === ChannelType.GuildVoice,
  );
  const botVoiceChannel = voiceChannels.find((channel) =>
    channel.members.has(guild.client.user?.id || ''),
  );
  return botVoiceChannel || null;
};

export const getUserVoiceChannel = (guild: Guild, userId: string): VoiceChannel | null => {
  const voiceChannels = guild.channels.cache.filter(
    (channel) => channel.type === ChannelType.GuildVoice,
  );
  const userVoiceChannel = voiceChannels.find((channel) => channel.members.has(userId));
  return userVoiceChannel || null;
};

export const isBotInAVoiceChannel = (guild: Guild): boolean => {
  return getBotVoiceChannel(guild) !== null;
};

export const isUserInAVoiceChannel = (guild: Guild, userId: string): boolean => {
  return getUserVoiceChannel(guild, userId) !== null;
};

export const isUserInSameVoiceChannel = (guild: Guild, userId: string): boolean => {
  return getBotVoiceChannel(guild)?.id === getUserVoiceChannel(guild, userId)?.id;
};

export const joinVoiceChannel = async (
  guild: Guild,
  voiceChannel: VoiceChannel,
): Promise<VoiceChannel | null> => {
  try {
    discordJoinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator as any,
      selfDeaf: false,
    });
    return voiceChannel;
  } catch (error) {
    console.error('Error joining voice channel:', error);
    return null;
  }
};

export const leaveVoiceChannel = (guild: Guild): VoiceChannel | null => {
  const botVoiceChannel = getBotVoiceChannel(guild);
  if (botVoiceChannel) {
    const connection = getVoiceConnection(guild.id);
    connection?.destroy();
  }
  return botVoiceChannel;
};
