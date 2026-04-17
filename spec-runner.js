const path = require('path');
const {runSpecs} = require('./spec-kit');

const specFiles = [
  path.resolve(__dirname, 'spec', 'employees.spec.js')
];

runSpecs(specFiles).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
