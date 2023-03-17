import { DisTube } from "distube";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { SpotifyPlugin } from "@distube/spotify";
import { DeezerPlugin } from "@distube/deezer";
import { BOT_CLIENT } from "./BotClient";
import { SoundCloudPlugin } from "@distube/soundcloud";

export const distube = new DisTube(BOT_CLIENT, {
  leaveOnStop: false,
  leaveOnFinish: false,
  leaveOnEmpty: false,
  nsfw: true,
  plugins: 
    [
      new YtDlpPlugin({update: false}),
      new SoundCloudPlugin({}),
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: true,
        api: {
          clientId: process.env.SPOTIFY_APP_CLIENT_ID,
          clientSecret: process.env.SPOITFY_APP_CLIENT_SECRET,
        },
      }),
      new DeezerPlugin({
        parallel: true,
        emitEventsAfterFetching: true,
      })
    ],  
});