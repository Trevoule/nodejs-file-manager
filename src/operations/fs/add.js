import { access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleFsAdd(currentPath, newFileName) {
  const newFilePath = join(currentPath, newFileName);

  try {
    await access(currentPath);
    await writeFile(newFilePath, '', { flag: 'wx' });
    console.log(OPERATION_SUCCESS_USER_MESSAGE);
    
  } catch (err) {
    handleError(err);
  }
} 

export { handleFsAdd };