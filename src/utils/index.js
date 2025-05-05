import { join } from 'node:path';
import os from 'node:os';

import { COMMAND_OPERATIONS } from '../vars/commandOperations.js';
import { INVALID_FILE_NAME_ERROR_MESSAGE, MESSAGE_COLORS } from '../vars/userMessages.js';

function handleCurrentPath(currentDirectory, nextDirectory) {
  const rootDir = os.homedir() + '/';
  const newDirectory = join(currentDirectory, nextDirectory);

  if (newDirectory.length > rootDir.length) return newDirectory;
  return rootDir;
};

function printCommandsInfo(operation) {
  const { title, commands } = COMMAND_OPERATIONS[operation];

  const commandOperationTitle = `${title}: \n`;
  const commandOperationCommands = commands.map(({ command, description }) => {
  const maxCommandLength = Math.max(...commands.map(c => c.command.length));
  const paddedCommand = command.padEnd(maxCommandLength);
  return `  ${paddedCommand}\t${description}`;
  }).join('\n');

  console.log(commandOperationTitle);
  console.log(`${commandOperationCommands} \n`);
}

function checkIsValidFileName(fileName) {
  return /^[^\/\\:*?"<>|]+\.[a-zA-Z0-9]+$/.test(fileName);
}

function handleError(error) {
  const { code } = error;

  if (code === 'SYMBOLS_NOT_ALLOWED') {
    console.error(INVALID_FILE_NAME_ERROR_MESSAGE);
    return;
  }

  console.error(`\n${MESSAGE_COLORS.RED}${error}${MESSAGE_COLORS.RESET}`);
}

export { handleCurrentPath,  printCommandsInfo, checkIsValidFileName, handleError };
