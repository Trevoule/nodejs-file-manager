import os from 'node:os';
import process from 'node:process';
import { createReadStream } from 'node:fs';
import fs, { access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

import { handleError } from '../../utils/index.js';
import { MESSAGE_COLORS } from '../../vars/userMessages.js';

async function handleFsCat(fileToReadPath){
    try {
      await access(fileToReadPath, fs.constants.F_OK | fs.constants.W_OK);
      const readStream = createReadStream(fileToReadPath, { encoding: 'utf-8' });
      
      console.log(`\n${MESSAGE_COLORS.CYAN}File content: ${MESSAGE_COLORS.RESET}\n`);

      readStream.on('end', () => process.stdout.write(os.EOL));

      await pipeline(readStream, process.stdout, { end: false });
    } catch (err) {
      handleError(err);
    }
};

export { handleFsCat };