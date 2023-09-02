#!/usr/bin/env node

const totalCoverage = require('../lib').default;

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('No LCOV provided');
  process.exit(1);
}

const pathToFile = args[0];
console.log(JSON.stringify(totalCoverage(pathToFile, args.slice(1))));
