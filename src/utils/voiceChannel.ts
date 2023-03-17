import { CommandInteraction, VoiceBasedChannel } from "discord.js";

export const getVoiceChannel = (interaction: CommandInteraction) => { 
    const voiceState = interaction.guild?.voiceStates.cache.get(interaction.user.id);
    const voiceChannel = voiceState?.channel as VoiceBasedChannel;
    return voiceChannel;
};

export const botVoiceChannel = (interaction: CommandInteraction) => { 
    const voiceState = interaction.guild?.voiceStates.cache.get(interaction.applicationId);
    const voiceChannel = voiceState?.channel as VoiceBasedChannel;
    return voiceChannel;
}