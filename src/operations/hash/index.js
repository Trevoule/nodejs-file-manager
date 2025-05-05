import { createReadStream } from 'node:fs';
import { createHash } from 'crypto';
import { pipeline } from 'node:stream/promises';

import { handleError } from '../../utils/index.js';
import { MESSAGE_COLORS } from '../../vars/userMessages.js';

async function handleHash(fileToCalculatePath) {
  try {
    const hash = createHash('sha256');
    const stream = createReadStream(fileToCalculatePath);

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
      console.log(`\n${MESSAGE_COLORS.BRIGHT_GREEN}File hash: ${MESSAGE_COLORS.RESET}${hash.digest('hex')}`);
    });
    await pipeline(stream, hash);
  } catch (error) {
    handleError(error)
  }

}

export { handleHash };