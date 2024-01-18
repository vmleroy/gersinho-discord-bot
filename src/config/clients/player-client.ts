import { Player } from 'discord-player';
import { BOT_CLIENT } from './bot-client';

let client: Player | null = null

export const PLAYER_CLIENT: Player = (() => {
  if (!client) {
    client = new Player(BOT_CLIENT)
  }
  return client
})()