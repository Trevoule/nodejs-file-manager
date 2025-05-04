import os from 'node:os';
import process from 'node:process';
import { createReadStream } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

async function handleFsCat(fileToReadPath){
    try {
      await access(fileToReadPath, constants.F_OK | constants.W_OK);
      const readStream = createReadStream(fileToReadPath, { encoding: 'utf-8' });
      readStream.on('end', () => process.stdout.write(os.EOL));

      readStream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
      }); 
    
      await pipeline(readStream, process.stdout, { end: false });
    } catch (err) {
      console.error(err);
      console.error('\nENOENT: no such file or directory')
    }
};

export { handleFsCat };