import os from 'node:os';
import process from 'node:process';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { handleFsRm } from './rm.js';
import { handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleFsMv (pathToFile, pathToNewDirectory) {
  try {
    const readStreamPath = createReadStream(pathToFile);
    const writeStreamPath = createWriteStream(pathToNewDirectory, { flags: 'wx' });

    readStreamPath.on('data', () => process.stdout.write(os.EOL));
    writeStreamPath.on('end', () => {
      console.log('File transfer completed');
    });
    
    await pipeline(readStreamPath, writeStreamPath);
    await handleFsRm(pathToFile);
    
  } catch (err) {
    handleError(err);
  }
};

export { handleFsMv };