# Total coverage

Parse LCOV file and return total line, branch, and function coverage as well as coverages for specified source files.

[![Test and Build](https://github.com/pavelsaman/total-coverage/actions/workflows/test-and-build.yaml/badge.svg?branch=master)](https://github.com/pavelsaman/total-coverage/actions/workflows/test-and-build.yaml)

## Usage

```ts
import totalCoverage from 'total-coverage';

const {
  totalLineCov,
  totalBranchCov,
  totalFunctionCov
} = totalCoverage('path/to/lcov.info');

const {
  totalLineCov,
  totalBranchCov,
  totalFunctionCov,
  files,
} = totalCoverage('path/to/lcov.info', ['apps/api/src/a.ts', 'apps/api/src/b.ts']);

// files property is not present if no concrete files were passed or no such files were found in the lcov file
// {
//   "totalLineCov": 90.7,
//   "totalBranchCov": 71.1,
//   "totalFunctionCov": 87.2,
//   "files": {
//     "apps/api/src/a.ts": {
//       "totalLineCov": 76.4,
//       "totalBranchCov": 71.6,
//       "totalFunctionCov": 76.9
//     },
//     "apps/api/src/b.ts": {
//       "totalLineCov": 90.3,
//       "totalBranchCov": 74.5,
//       "totalFunctionCov": 92
//     },
//     // ...
//   }
// }
```

Or as a command line tool:

```bash
# global install
$ npm install --global total-coverage
$ total-coverage lcov.info
{"totalLineCov":61.3,"totalBranchCov":51.2,"totalFunctionCov":55.1}

# or install the package only locally
$ npm install total-coverage
$ npx total-coverage lcov.info
{"totalLineCov":61.3,"totalBranchCov":51.2,"totalFunctionCov":55.1}
```

## Contribution

Initial project install:

```bash
nvm use
make install
```

After changes, format, lint, and build the project:

```bash
make all
```
