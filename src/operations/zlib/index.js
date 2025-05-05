import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'stream/promises';

import { handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleCompress(pathToFile, pathToDestination) {
  try {
    const pathToDestinationBr = pathToDestination.endsWith('.br') 
      ? pathToDestination
      : `${pathToDestination}.br`;

    const brotli = createBrotliCompress();
    const fileToCompress = pathToFile;
    const archiveBr = pathToDestinationBr;
    
    const sourceStream = createReadStream(fileToCompress);
    const destinationStream = createWriteStream(archiveBr, {flags: 'wx' });
    
    await pipeline(sourceStream, brotli, destinationStream);

    console.log(OPERATION_SUCCESS_USER_MESSAGE);
  } catch (error) {
    handleError(error);
  }
}

async function handleDecompress(pathToFile, pathToDestination) {
  try {
    const validationBrotli = createBrotliDecompress();
    const validationSource = createReadStream(pathToFile);

    await pipeline(validationSource, validationBrotli);
    
    const brotli = createBrotliDecompress();
    const sourceStream = createReadStream(pathToFile);
    const destinationStream = createWriteStream(pathToDestination);
    
    await pipeline(sourceStream, brotli, destinationStream);

    console.log(OPERATION_SUCCESS_USER_MESSAGE);
  } catch (err) {
    handleError(err);
  }
}

export { handleCompress, handleDecompress };