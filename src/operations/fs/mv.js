import os from 'node:os';
import process from 'node:process';
import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { handleFsRm } from './rm.js';

async function handleFsMv (pathToFile, pathToNewDirectory) {
  const newPathToFile = join(pathToFile, '../', pathToNewDirectory);

  // TO DO: add error handling for not existing path
  try {
    const readStreamPath = createReadStream(pathToFile);
    const writeStreamPath = createWriteStream(newPathToFile);

    readStreamPath.on('data', () => process.stdout.write(os.EOL));
    readStreamPath.on('error', (err) => {
      console.error('Error reading the directory:', err.message);
    })
    readStreamPath.on('end', async () => {
      await handleFsRm(pathToFile);
    })
    await pipeline(readStreamPath, writeStreamPath, { end: false });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('ENOENT: no such file or directory');
      return;
    }
    console.error(err);
  }
};

export { handleFsMv };