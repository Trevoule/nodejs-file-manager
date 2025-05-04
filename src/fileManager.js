import process from 'node:process';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { printCommandsInfo } from './utils.js';
import { COMMAND, COMMAND_OPERATION } from './vars/commandOperations.js';
import {
  CLOSE_USER_MESSAGE,
  CURRENT_PATH_USER_MESSAGE,
  DEFAULT_PRINT_COMMAND_MESSAGE,
  EXIT_OPTION_MESSAGE,
  GREETINGS_USER_MESSAGE,
  INVALID_INPUT,
} from './vars/userMessages.js';

const DIRNAME = dirname(fileURLToPath(import.meta.url));

const fileManager = async () => {
  console.log(GREETINGS_USER_MESSAGE, '\n');
  console.log('Available commands:', '\n');

  let currentPath = DIRNAME;
  
  printCommandsInfo(COMMAND_OPERATION.navigation);
  printCommandsInfo(COMMAND_OPERATION.fs);
  printCommandsInfo(COMMAND_OPERATION.os);
  printCommandsInfo(COMMAND_OPERATION.hash);
  printCommandsInfo(COMMAND_OPERATION.zlib);

  const terminalInterface = readline.createInterface({ input, output });

  const promptTerminalInterface= (msg = DEFAULT_PRINT_COMMAND_MESSAGE) => terminalInterface.question(msg, handleCommand);
  promptTerminalInterface();

  async function handleCommand(output) {
    console.log(`\n${CURRENT_PATH_USER_MESSAGE} ${currentPath}`);
    console.log(`\n${EXIT_OPTION_MESSAGE}\n`);

    const trimmedCommand = output.trim();

    switch (trimmedCommand) {      
      case COMMAND.general.exit:
        terminalInterface.close()
        break;
      
      default:
        console.log(`${INVALID_INPUT}:`, output);
        promptTerminalInterface();
      }
    }
    
    terminalInterface.on('close', () => {
      console.log(`\n\n${CLOSE_USER_MESSAGE}\n\n`);
      process.exit(0);
    })
};

await fileManager();