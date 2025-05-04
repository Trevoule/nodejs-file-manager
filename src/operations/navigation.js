import fs, { access, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path';

import { handleCurrentPath } from '../utils.js';

import { OPERATION_FAILED_ERROR_MESSAGE } from '../vars/userMessages.js';

async function handleNavigationCd(currentPath, directory, handleNextDirectory) {
  const nextDirectory = await handleCurrentPath(currentPath, directory);
  
  try {
    await access(nextDirectory, fs.constants.F_OK | fs.constants.W_OK);
    handleNextDirectory(nextDirectory);
  } catch (err) {
    console.error(`\n${OPERATION_FAILED_ERROR_MESSAGE}\n`);
  }
}

async function handleNavigationLs(currentPath) {
  try {
    const files = await readdir(currentPath);
    
    const filesInfo = await Promise.all(files.map(async (file) => {
      const filePath = join(currentPath, file);
      const stats = await stat(filePath);
      const name = file.split('.')[0];

      return {
        Name: name,
        Type: stats.isDirectory() ? 'directory' : 'file',
      };
    })
  );    
    console.table(filesInfo);
  } catch (err) {
    console.error(err);
  };
}

async function handleNavigationUp(currentPath) {
  const path = await handleCurrentPath(currentPath, '../');
  return { path };
}
  
export { handleNavigationCd, handleNavigationLs, handleNavigationUp };