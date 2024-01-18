import { BOT_CLIENT as client, PLAYER_CLIENT as player } from "../clients"

export const start = () => {
  player.extractors.loadDefault()
}