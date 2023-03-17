import { EmbedBuilder } from "@discordjs/builders";
import { colors } from "../styles";

export const mAlert = () => {
    return new EmbedBuilder()
    .setColor(colors.yellow)
}

export const mError = () => {
    return new EmbedBuilder()
    .setColor(colors.red)
    .setTitle('❌ Error')
}

export const mAction = () => {
    return new EmbedBuilder()
    .setColor(colors.azoxo)
}

