import chalk from "chalk";

import { DISTUBE_CLIENT as distube } from "@/config/clients"
import { FetchCommands } from "@/utils/commands";
import type { Client } from "discord.js";

export const onReady = async (client: Client) => {
  console.log(chalk.green(`\nReady! Logged in as ${chalk.bold(client.user?.tag)}\n`));	

  try {
    await FetchCommands();
    console.log(`[${chalk.green("SUCCESS")}] Successfully registered application commands.`);    
  } catch (error) {
    console.error(error);
  }

  if (process.env.YOUTUBE_COOKIE) {
    try {
      console.log(`\n[${chalk.blue("INFO")}] Trying to add youtube cookies...`)
      distube.options.youtubeCookie = JSON.parse(process.env.YOUTUBE_COOKIE as string);
      console.log(`[${chalk.green("SUCCESS")}] Successfully added youtube cookies.`)
    } catch (error) {
      console.log(`[${chalk.red("ERROR")}] Failed to parse YouTube cookie. Please check your .env file (YOUTUBE_COOKIE) or check the documentation (distube)`);
      console.error(error);
    }
  }

  console.log(`\n${chalk.green("Discord API is ready!")}`);
}