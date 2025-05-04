import { join } from 'node:path';
import os from 'node:os';

import { COMMAND_OPERATIONS } from '../vars/commandOperations.js';

export function handleCurrentPath(currentDirectory, nextDirectory) {
  const rootDir = os.homedir() + '/';
  const newDirectory = join(currentDirectory, nextDirectory);

  if (newDirectory.length > rootDir.length) return newDirectory;
  if (rootDir === currentDirectory) return rootDir;
  return newDirectory;
};

export function printCommandsInfo(operation) {
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

