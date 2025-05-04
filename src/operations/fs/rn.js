import { access, constants, rename } from 'node:fs/promises';
import { join } from 'node:path';

async function handleFsRn(pathToFile, newFileName){
  const newPathToFile = join(pathToFile, '../', newFileName);
  
    try {
      await access(pathToFile, constants.F_OK | constants.W_OK);
      await rename(pathToFile, newPathToFile);
    } catch (err) {
      console.error('\n', err);
      console.error('\nENOENT: no such file or directory')
    }
}

export { handleFsRn };