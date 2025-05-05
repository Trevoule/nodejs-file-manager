import process from 'node:process';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import { join } from 'node:path';
import os from 'node:os';

import { printCommandsInfo } from './utils/index.js';
import { COMMAND, COMMAND_OPERATION } from './vars/commandOperations.js';
import {
  AVAILABLE_COMMANDS_USER_MESSAGE,
  CLOSE_USER_MESSAGE,
  CURRENT_PATH_USER_MESSAGE,
  DEFAULT_PRINT_COMMAND_MESSAGE,
  EXIT_OPTION_MESSAGE,
  GREETINGS_USER_MESSAGE,
  INVALID_INPUT_MESSAGE,
} from './vars/userMessages.js';

import { handleNavigationCd, handleNavigationLs, handleNavigationUp } from './operations/navigation/index.js';
import { handleFsAdd, handleFsCat, handleFsCp, handleFsMkdir, handleFsMv, handleFsRm, handleFsRn } from './operations/fs/index.js';
import { handleOsArchitecture, handleOsCpus, handleOsEol, handleOsHomedir, handleOsUsername } from './operations/os/index.js';
import { handleHash } from './operations/hash/index.js';
import { handleCompress, handleDecompress } from './operations/zlib/index.js';

const homedir = os.homedir();

const fileManager = async () => {
  // STARTING DIRECTORY - ROOT FOLDER
  let currentPath = homedir;

  console.log(GREETINGS_USER_MESSAGE);
  console.log(AVAILABLE_COMMANDS_USER_MESSAGE);

  printCommandsInfo(COMMAND_OPERATION.navigation);
  printCommandsInfo(COMMAND_OPERATION.fs);
  printCommandsInfo(COMMAND_OPERATION.os);
  printCommandsInfo(COMMAND_OPERATION.hash);
  printCommandsInfo(COMMAND_OPERATION.zlib);

  const terminalInterface = readline.createInterface({ input, output });

  const promptTerminalInterface = (msg = DEFAULT_PRINT_COMMAND_MESSAGE) => {
    console.log(`\n${CURRENT_PATH_USER_MESSAGE} ${currentPath}`);
    console.log(EXIT_OPTION_MESSAGE);
    
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
        
      case COMMAND[COMMAND_OPERATION.fs].cat: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        await handleFsCat(pathToFile);

        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.fs].add: {
        const newFileName = output.split(' ')[1];
        await handleFsAdd(currentPath, newFileName);

        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.fs].mkdir: {
        const newDirectoryName = output.split(' ')[1];
        await handleFsMkdir(currentPath, newDirectoryName);
        
        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.fs].rn: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const newFileName = output.split(' ')[2];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        await handleFsRn(pathToFile, newFileName);
        
        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.fs].cp: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const pathToNewDirectory = output.split(' ')[2];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        await handleFsCp(pathToFile, pathToNewDirectory);
        
        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.fs].mv: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const pathToNewDirectoryFromCurrentPath = output.split(' ')[2];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        const pathToNewDirectory = join(currentPath, pathToNewDirectoryFromCurrentPath);
        await handleFsMv(pathToFile, pathToNewDirectory);
        
        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.fs].rm: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        await handleFsRm(pathToFile);
        
        promptTerminalInterface();
        break;
      }
        
      case COMMAND_OPERATION.os: {
        switch (output) {
          case COMMAND[COMMAND_OPERATION.os].eol: {
            handleOsEol();

            break;
          }

          case COMMAND[COMMAND_OPERATION.os].cpus: {
            handleOsCpus();

            break;
          }

          case COMMAND[COMMAND_OPERATION.os].homedir: {
            handleOsHomedir();

            break;
          }

          case COMMAND[COMMAND_OPERATION.os].username: {
            handleOsUsername();

            break;
          }

          case COMMAND[COMMAND_OPERATION.os].architecture: {
            handleOsArchitecture();

            break;
          }
        }

        promptTerminalInterface();
        break;
      }
        
      case COMMAND[COMMAND_OPERATION.hash].hash: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        await handleHash(pathToFile);

        promptTerminalInterface();
        break;
      }

      case COMMAND[COMMAND_OPERATION.zlib].compress: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const pathToDestinationFromCurrentPath = output.split(' ')[2];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        const pathToDestination = join(currentPath, pathToDestinationFromCurrentPath);

        await handleCompress(pathToFile, pathToDestination);

        promptTerminalInterface();
        break;
      }
        
      case COMMAND[COMMAND_OPERATION.zlib].decompress: {
        const pathToFileFromCurrentPath = output.split(' ')[1];
        const pathToDestinationFromCurrentPath = output.split(' ')[2];
        const pathToFile = join(currentPath, pathToFileFromCurrentPath);
        const pathToDestination = join(currentPath, pathToDestinationFromCurrentPath);

        await handleDecompress(pathToFile, pathToDestination);

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