import { access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { handleFsMkdir } from './mkdir.js';

async function handleFsAdd(currentPath, newFileName) {
  const newFilePath = join(currentPath, newFileName);
  const newFilePathFolder = join(currentPath, newFileName, '../');

  // TO DO: add error handling for not existing path
  try {
    await access(newFilePathFolder);

    try {
        await writeFile(newFilePath, '', { flag: 'wx' });
      } catch (err) {
        if (err.code === 'EEXIST') {
          console.error('\nEEXIST: file already exists');
        } 
      } 
  } catch (err) {
    if (err.code === 'ENOENT') {
      await handleFsMkdir(currentPath, newFilePathFolder);

      console.error('\nENOENT: no such file or directory');

    }
  }
} 

export { handleFsAdd };