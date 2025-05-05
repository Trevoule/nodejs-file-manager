import { join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleFsCp(pathToFile, pathToNewDirectory){
  const newPathToFile = join(pathToFile, '../', pathToNewDirectory);
  
  try {
    const readFileStream = createReadStream(pathToFile, { encoding: 'utf-8' });
    const writeFileStream = createWriteStream(newPathToFile, { flags: 'wx' });
  
    await pipeline(readFileStream, writeFileStream);
    console.log(OPERATION_SUCCESS_USER_MESSAGE);
    
  } catch (err) {
    handleError(err);
  }
}

export { handleFsCp };