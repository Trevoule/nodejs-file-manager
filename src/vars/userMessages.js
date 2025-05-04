import process from 'node:process';

const username = process.argv.find(key => key.startsWith('--username=')).replace('--username=', '');

// USER MESSAGES

export const GREETINGS_USER_MESSAGE = `Welcome to the File Manager, ${username}!`;

export const CLOSE_USER_MESSAGE = `Thank you for using File Manager, ${username}, goodbye!`;

export const EXIT_OPTION_MESSAGE = 'To exit program press ctrl + c or print .exit';

export const CURRENT_PATH_USER_MESSAGE = `You are currently in`;

// COMMAND MESSAGES

export const PRINT_COMMAND_MESSAGE = 'Print command';

export const DEFAULT_PRINT_COMMAND_MESSAGE = `\n${PRINT_COMMAND_MESSAGE}: `;

// ERRORS

export const OPERATION_FAILED_ERROR_MESSAGE = 'Operation failed: no such file or directory';

export const INVALID_INPUT_MESSAGE = '\nInvalid input:';
