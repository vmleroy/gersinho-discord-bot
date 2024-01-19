import chalk from "chalk";

import { BOT_CLIENT as client, PLAYER_CLIENT as player } from "../clients"
import { FetchCommands } from "@/utils/commands";

export const startBot = async () => {
  try {
    await FetchCommands();
    console.log("Successfully registered application commands.");    
  } catch (error) {
    console.log(`${chalk.red("Failed to register application commands.")}`);
    console.error(error);
  }

  try {
    await player.extractors.loadDefault()
    console.log("Successfully loaded default extractors.");
  } catch (error) {
    console.log(`${chalk.red("Failed to load default extractors.")}`);
    console.error(error);
  }

  
}