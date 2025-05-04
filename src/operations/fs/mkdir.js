import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

async function handleFsMkdir(currentPath, newDirectory){
  const dest = join(currentPath, newDirectory);

  try {
    await mkdir(dest);
  } catch (err) {
      console.error('\nEEXIST: file already exists');
  }
};

export { handleFsMkdir };