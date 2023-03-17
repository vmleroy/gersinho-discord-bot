import { BOT_CLIENT } from "./config";
import { discordEvents } from "./events";
import { validateEnv } from "./utils";

(async () => {

  if (!validateEnv()) return;

  console.log('Starting bot...');
  discordEvents(BOT_CLIENT);

  await BOT_CLIENT.login(process.env.BOT_TOKEN);
})();


