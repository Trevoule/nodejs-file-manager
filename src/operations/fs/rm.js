import { rm, stat, unlink } from 'node:fs/promises';

async function handleFsRm (pathToRemove){
  try {
    const stats = await stat(pathToRemove);

    if (stats.isDirectory()) {
      await rm(pathToRemove, { recursive: true });
    } else {
      await unlink(pathToRemove);
    }
  } catch (err) {
    console.error(err);
  }
}

export { handleFsRm };