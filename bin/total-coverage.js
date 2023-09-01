#!/usr/bin/env node

const totalCoverage = require('../lib').default;

const args = process.argv;
if (args.length <= 2) {
  console.error('No LCOV provided');
  process.exit(1);
}

const pathToFile = args[args.length - 1];
console.log(JSON.stringify(totalCoverage(pathToFile)));
