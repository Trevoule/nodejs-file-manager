import { rm, stat, unlink } from 'node:fs/promises';
import { handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleFsRm (pathToRemove){
  try {
    const stats = await stat(pathToRemove);

    if (stats.isDirectory()) {
      await rm(pathToRemove, { recursive: true });
    } else {
      await unlink(pathToRemove);
    }
    console.log(OPERATION_SUCCESS_USER_MESSAGE);
  } catch (err) {
    handleError(err);
  }
}

export { handleFsRm };