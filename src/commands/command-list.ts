import fs from "fs";
import path from "path";

import { type Command } from "@/interfaces";

const getCommands = () => {
  const list = [];
  const commandsPath = [
    path.join(__dirname, "./"),
  ];

  for (const commandPath of commandsPath) {
    const commandFiles = fs
      .readdirSync(commandPath)
      .filter(
        (file) =>
          file.endsWith(".ts") &&
          file !== "command-list.ts" &&
          file !== "index.ts"
      );
    console.log(commandFiles)
    for (const file of commandFiles) {
      console.log(`${commandPath}${file}`)
      const command = require(`${commandPath}${file}`).default;
      console.log(command)
      // if ("data" in command && "run" in command) {
      //   list.push(command);
      // } else {
      //   console.log(
      //     `[WARNING] Command ${file} is not valid! Is missing "data" or "run" property.`
      //   );
      // }
    }
  }

  return [];
};

export const CommandList: Command[] = getCommands();
