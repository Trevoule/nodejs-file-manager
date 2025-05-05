import fs, { access, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path';

import { handleCurrentPath, handleError } from '../../utils/index.js';

async function handleNavigationCd(currentPath, directory, handleNextDirectory) {
  try {
    const nextDirectory = await handleCurrentPath(currentPath, directory);
    await access(nextDirectory, fs.constants.F_OK | fs.constants.W_OK);
    handleNextDirectory(nextDirectory);
  } catch (err) {
    handleError(err);
  }
}

async function handleNavigationLs(currentPath) {
  try {
    const files = await readdir(currentPath);
    
    const filesInfo = await Promise.all(files.map(async (file) => {
    const filePath = join(currentPath, file);
    const stats = await stat(filePath);

    return {
      Name: file,
      Type: stats.isDirectory() ? 'directory' : 'file',
      };
    })
  );    
    console.table(filesInfo);
  } catch (err) {
    handleError(err);
  };
}

async function handleNavigationUp(currentPath) {
  const path = await handleCurrentPath(currentPath, '../');
  return { path };
}
  
export { handleNavigationCd, handleNavigationLs, handleNavigationUp };