import os from 'node:os';

function handleOsEol() {
  console.log('\nEOL', os.EOL);
}

function handleOsCpus() {
  console.info('\ncpus', os.cpus(), '\n');
}

function handleOsHomedir() {
  console.log('\nhomedir:', os.homedir(), '\n');
}

function handleOsUsername() {
  const { username } = os.userInfo();
  console.log('\nusername:', username, '\n');
}

function handleOsArchitecture() {
  console.log('\narchitecture:', os.arch(), '\n');
}

export {
  handleOsEol,
  handleOsCpus,
  handleOsHomedir,
  handleOsUsername,
  handleOsArchitecture
}