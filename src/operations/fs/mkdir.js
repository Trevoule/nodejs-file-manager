import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleFsMkdir(currentPath, newDirectory){
  const dest = join(currentPath, newDirectory);

  try {
    await mkdir(dest);
    console.log(OPERATION_SUCCESS_USER_MESSAGE);
  } catch (err) {
    handleError(err);
  }
};

export { handleFsMkdir };