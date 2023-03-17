import fs from "fs";
import path from "path";

import { ICommand } from "../interfaces";

const getCommands = () => {
  const list = [];
  const commandsPath = [
    path.join(__dirname, "./"),
    path.join(__dirname, "./music/"),
  ];

  for (const cmdPath of commandsPath) {
    const commandFiles = fs
      .readdirSync(cmdPath)
      .filter(
        (file) =>
          file.endsWith(".ts") &&
          file !== "_CommandList.ts" &&
          file !== "index.ts"
      );
    for (const file of commandFiles) {
      const command = require(path.join(cmdPath, file)).default;
      if ("data" in command && "run" in command) {
        list.push(command);
      } else {
        console.log(
          `[WARNING] Command ${file} is not valid! Is missing "data" or "run" property.`
        );
      }
    }
  }

  return list;
};

export const CommandList: ICommand[] = getCommands();
