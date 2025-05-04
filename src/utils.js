import { join, resolve } from 'node:path';

import { COMMAND_OPERATIONS } from './vars/commandOperations.js';

export function handleCurrentPath(currentDirectory, nextDirectory) {
  const rootDir = resolve(process.cwd()) + '/';
  const newDirectory = join(currentDirectory, nextDirectory);

  if (rootDir !== currentDirectory) return newDirectory;
  return rootDir;
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

