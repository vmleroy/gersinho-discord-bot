import fs from "fs";
import chalk from "chalk";
import { type Command } from "@/interfaces";

const commandsPath = ["dev", "music"];

let CommandList: Command[] = [];

export const getCommands = () => {
  const list: Command[] = [];

  let files: any = []
  for (const commandPath of commandsPath) {
    const path = `${__dirname.replaceAll("\\", "/")}/${commandPath}/`;
    const commandFiles = fs.readdirSync(path).filter((file) =>
      file.endsWith(".ts") &&
      !file.startsWith("command-list") &&
      !file.startsWith("index"));
    for (const file of commandFiles) {
      files.push({ name: file, path: path })
    }
  }

  console.log(`[${chalk.blue("INFO")}] Searching for ${files.length} ${files.length > 1 ? "commands" : "command"}...`)

  for (const file of files) {
    const command = require(`${file.path}${file.name}`).default;
    if ("data" in command && "run" in command) {
      list.push(command);
    } else {
      console.log(`\t[${chalk.yellow("WARNING")}] Command ${file.name} is not valid! Is missing "data" or "run" property.`);
    }
  }

  CommandList = list;
  return {commands: list, files: files};
};

export { CommandList }
