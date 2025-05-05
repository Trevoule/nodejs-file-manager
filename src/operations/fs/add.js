import { access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { checkIsValidFileName, handleError } from '../../utils/index.js';
import { OPERATION_SUCCESS_USER_MESSAGE } from '../../vars/userMessages.js';

async function handleFsAdd(currentPath, newFileName) {
  if (!checkIsValidFileName(newFileName)) {
    handleError({ code: 'SYMBOLS_NOT_ALLOWED' })
    return;
  }

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