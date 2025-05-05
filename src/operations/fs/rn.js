import fs, { access, rename } from 'node:fs/promises';
import { join } from 'node:path';

import { handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleFsRn(pathToFile, newFileName) {
  const newPathToFile = join(pathToFile, '../', newFileName);
  
    try {
      await access(pathToFile, fs.constants.F_OK | fs.constants.W_OK);
      await rename(pathToFile, newPathToFile);

      console.log(OPERATION_SUCCESS_USER_MESSAGE);
    } catch (err) {
      handleError(err);
    }
}

export { handleFsRn };