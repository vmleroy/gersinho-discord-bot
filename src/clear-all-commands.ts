import { clearAllCommands } from './config/slash-commands';

(async () => {
  await clearAllCommands();
  process.exit(0);
})();
