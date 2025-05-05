import os from 'node:os';

function handleOsEol() {
  console.log('\nEOL (default system End-Of-Line):', JSON.stringify(os.EOL));
}

function handleOsCpus() {
  const cpus = os.cpus();
  console.log('\nCPU Information:');
  console.log(`Overall amount of CPUs: ${cpus.length}`);
  
  cpus.forEach((cpu, index) => {
    const clockSpeedGHz = cpu.speed / 1000; // Convert MHz to GHz
    console.log(`\nCPU ${index + 1}:`);
    console.log(`\nModel: ${cpu.model}`);
    console.log(`\nClock Rate: ${clockSpeedGHz.toFixed(2)} GHz`);
  });
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