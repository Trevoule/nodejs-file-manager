import { join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

async function handleFsCp(pathToFile, pathToNewDirectory){
  const newPathToFile = join(pathToFile, '../', pathToNewDirectory);
  
  try {
    const readFileStream = createReadStream(pathToFile, { encoding: 'utf-8' });
    const writeFileStream = createWriteStream(newPathToFile);
  
    readFileStream.on('error', (err) => {
      console.error('Error reading the file:', err.message);
    });

    await pipeline(readFileStream, writeFileStream);
  } catch (err) {
    console.error(err);
  }
}

export { handleFsCp };