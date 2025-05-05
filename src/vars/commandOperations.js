export const COMMAND_OPERATION = {
  navigation: 'navigation',
  fs: 'fs',
  os: 'os',
  hash: 'hash',
  zlib: 'zlib',
};

export const COMMAND = {
  [COMMAND_OPERATION.navigation]: {
    up: 'up',
    cd: 'cd',
    ls: 'ls',
  },
  [COMMAND_OPERATION.fs]: {
    cat: 'cat',
    add: 'add',
    mkdir: 'mkdir',
    rn: 'rn',
    cp: 'cp',
    mv: 'mv',
    rm: 'rm',
  },
  [COMMAND_OPERATION.os]: {
    eol: 'os --EOL',
    cpus: 'os --cpus',
    homedir: 'os --homedir',
    username: 'os --username',
    architecture: 'os --architecture',
  },
  [COMMAND_OPERATION.hash]: {
    hash: 'hash',
  },
  [COMMAND_OPERATION.zlib]: {
    compress: 'compress',
    decompress: 'decompress',
  },

  general: {
    exit: '.exit',
  }
};

export const FULL_COMMAND_LIST = {
  [COMMAND_OPERATION.navigation]: {
    up: 'up',
    cd: 'cd path_to_directory',
    ls: 'ls',
  },
  [COMMAND_OPERATION.fs]: {
    cat: 'cat path_to_file',
    add: 'add new_file_name',
    mkdir: 'mkdir new_directory_name',
    rn: 'rn path_to_file new_filename',
    cp: 'cp path_to_file path_to_new_directory',
    mv: 'mv path_to_file path_to_new_directory',
    rm: 'rm path_to_file',
  },
  [COMMAND_OPERATION.os]: {
    eol: 'os --EOL',
    cpus: 'os --cpus',
    homedir: 'os --homedir',
    username: 'os --username',
    architecture: 'os --architecture',
  },
  [COMMAND_OPERATION.hash]: {
    hash: 'hash path_to_file',
  },
  [COMMAND_OPERATION.zlib]: {
    compress: 'compress path_to_file path_to_destination',
    decompress: 'decompress path_to_file path_to_destination',
  },

  general: {
    exit: '.exit',
  }
};

const COMMAND_OPERATION_TITLE = {
  [COMMAND_OPERATION.navigation]: 'Navigation & working directory (nwd)',
  [COMMAND_OPERATION.fs]: 'Basic operations with files',
  [COMMAND_OPERATION.os]: 'Operating system info',
  [COMMAND_OPERATION.hash]: 'Hash calculation',
  [COMMAND_OPERATION.zlib]: 'Compress and decompress operations',
};

const navigationCommands = [
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.navigation].up, description: 'Go upper from current directory' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.navigation].cd, description: 'Go to dedicated folder from current directory' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.navigation].ls, description: 'Print in console list of all files and folders in current directory' },
];

const fsCommands = [
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.fs].cat, description: 'Read file and print its content in console' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.fs].add, description: 'Create empty file in current working directory' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.fs].mkdir, description: 'Create new directory in current working directory' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.fs].rn, description: 'Rename file' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.fs].cp, description: 'Copy file' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.fs].mv, description: 'Move file' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.fs].rm, description: 'Delete file' },
];

const osCommands = [
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.os].eol, description: 'Get EOL' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.os].cpus, description: 'Get host machine CPUs info' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.os].homedir, description: 'Get home directory and print it to console' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.os].username, description: 'Get current system user name' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.os].architecture, description: 'Get CPU architecture' },
];

const hashCommands = [
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.hash].hash, description: 'Calculate hash for file and print it into console' }
];

const zlibCommands = [
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.zlib].compress, description: 'Compress file' },
  { command: FULL_COMMAND_LIST[COMMAND_OPERATION.zlib].decompress, description: 'Decompress file' },
];

export const COMMAND_OPERATIONS = {
  [COMMAND_OPERATION.navigation]: {
    title: COMMAND_OPERATION_TITLE.navigation,
    commands: navigationCommands,
  },
  [COMMAND_OPERATION.fs]: {
    title: COMMAND_OPERATION_TITLE.fs,
    commands: fsCommands,
  },
  [COMMAND_OPERATION.os]: {
    title: COMMAND_OPERATION_TITLE.os,
    commands: osCommands,
  },
  [COMMAND_OPERATION.hash]: {
    title: COMMAND_OPERATION_TITLE.hash,
    commands: hashCommands,
  },
  [COMMAND_OPERATION.zlib]: {
    title: COMMAND_OPERATION_TITLE.zlib,
    commands: zlibCommands,
  },
};
