import process from 'node:process';

const username = process.argv.find(key => key.startsWith('--username=')).replace('--username=', '');

export const MESSAGE_COLORS = {
  CYAN: '\x1b[36m',
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  BLUE: '\x1b[34m',
  YELLOW: '\x1b[33m',
  MAGENTA: '\x1b[35m',
  WHITE: '\x1b[37m',
  BLACK: '\x1b[30m',
  BRIGHT_BLUE: '\x1b[94m',
  BRIGHT_GREEN: '\x1b[92m',
  BRIGHT_RED: '\x1b[91m',

  RESET: '\x1b[0m'
};

// USER MESSAGES

export const GREETINGS_USER_MESSAGE = `${MESSAGE_COLORS.CYAN}Welcome to the File Manager, ${username}!${MESSAGE_COLORS.RESET}\n`;

export const AVAILABLE_COMMANDS_USER_MESSAGE = 'Available commands:\n';

export const CLOSE_USER_MESSAGE = `${MESSAGE_COLORS.BRIGHT_GREEN}Thank you for using File Manager, ${username}, goodbye!${MESSAGE_COLORS.RESET}`;

export const EXIT_OPTION_MESSAGE = `${MESSAGE_COLORS.YELLOW}\nTo exit program press ctrl + c or print .exit;\n${MESSAGE_COLORS.RESET}`

export const CURRENT_PATH_USER_MESSAGE = `${MESSAGE_COLORS.BLUE}You are currently in: ${MESSAGE_COLORS.RESET}`;

export const OPERATION_SUCCESS_USER_MESSAGE = `\n${MESSAGE_COLORS.GREEN}Operations completed successfully${MESSAGE_COLORS.RESET}\n`

// COMMAND MESSAGES

export const DEFAULT_PRINT_COMMAND_MESSAGE = `\nPrint command: `;

// ERRORS

export const ENOENT_ERROR_MESSAGE = `${MESSAGE_COLORS.RED}\nENOENT: no such file or directory${MESSAGE_COLORS.RESET}`;

export const EEXIST_ERROR_MESSAGE = `${MESSAGE_COLORS.RED}\nEEXIST: file already exists${MESSAGE_COLORS.RESET}`;

export const INVALID_FILE_NAME_ERROR_MESSAGE = `${MESSAGE_COLORS.RED}\nInvalid file name. File name must be in format "name.extension" and cannot contain special characters${MESSAGE_COLORS.RESET}`;

export const ERROR_MESSAGE = `${MESSAGE_COLORS.RED}\nerror${MESSAGE_COLORS.RESET}`;

export const INVALID_INPUT_MESSAGE = `${MESSAGE_COLORS.RED}\nInvalid input:${MESSAGE_COLORS.RESET}`;
