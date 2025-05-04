import process from 'node:process';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { handleNavigationCd, handleNavigationLs, handleNavigationUp } from './operations/navigation/index.js';
import { printCommandsInfo } from './utils.js';
import { COMMAND, COMMAND_OPERATION } from '../src/vars/commandOperations.js';
import {
  CLOSE_USER_MESSAGE,
  CURRENT_PATH_USER_MESSAGE,
  DEFAULT_PRINT_COMMAND_MESSAGE,
  EXIT_OPTION_MESSAGE,
  GREETINGS_USER_MESSAGE,
  INVALID_INPUT_MESSAGE,
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

  const promptTerminalInterface = (msg = DEFAULT_PRINT_COMMAND_MESSAGE) => {
    console.log(`\n${CURRENT_PATH_USER_MESSAGE} ${currentPath}`);
    console.log(`\n${EXIT_OPTION_MESSAGE}\n`);
    
    return terminalInterface.question(msg, handleCommand);
  };

  promptTerminalInterface();

  async function handleCommand(output) {
    const command = output.split(' ')[0];

    switch (command) {
      case COMMAND[COMMAND_OPERATION.navigation].cd: {
        try {
          const pathToDirectory = output.split(' ')[1];
          await handleNavigationCd(currentPath, pathToDirectory, (nextDirectory) => {
            currentPath = nextDirectory;
          });
        } catch (err) {
          console.error(err);
        }

        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.navigation].ls: {
        await handleNavigationLs(currentPath);
        
        promptTerminalInterface();
        break;
      }
        
      case COMMAND[COMMAND_OPERATION.navigation].up: {
        const { path } = await handleNavigationUp(currentPath);
        currentPath = path;

        promptTerminalInterface();
        break;
      }

      case COMMAND.general.exit:
        terminalInterface.close()
        break;
      
      default:
        console.log(INVALID_INPUT_MESSAGE, output);
        promptTerminalInterface();
      }
    }
    
    terminalInterface.on('close', () => {
      console.log(`\n\n${CLOSE_USER_MESSAGE}\n\n`);
      process.exit(0);
    })
};

await fileManager();