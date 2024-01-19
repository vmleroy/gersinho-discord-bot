import { startBot } from "@/config/start-bot";
import chalk from "chalk";


export const onReady = async () => {
  await startBot();
  console.log(`\n${chalk.green("Discord API is ready!")}`);
};