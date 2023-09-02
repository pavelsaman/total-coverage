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

const sourceFilesToGetCoverageFor = [
  'apps/api/src/a.ts',
  'apps/api/src/b.ts',
];
const {
  totalLineCov,
  totalBranchCov,
  totalFunctionCov,
  files,
} = totalCoverage('path/to/lcov.info', sourceFilesToGetCoverageFor);

// files property is not present if no concrete source files were passed 
// or no such source files were found in the lcov file
//
// {
//   "totalLineCov": 60.8,
//   "totalBranchCov": 51.1,
//   "totalFunctionCov": 60.4,
//   "files": {
//     "apps/api/src/c.ts": {
//       "totalLineCov": 85.7,
//       "totalBranchCov": 59.7,
//       "totalFunctionCov": 70
//     },
//     "apps/api/src/b.ts": {
//       "totalLineCov": 31.9,
//       "totalBranchCov": 28.4,
//       "totalFunctionCov": 38.5
//     },
//     "apps/api/src/a.ts": {
//       "totalLineCov": 67.5,
//       "totalBranchCov": 59.4,
//       "totalFunctionCov": 68
//     }
//   }
// }
```

Or as a command line tool:

```bash
# global install
$ npm install --global total-coverage
$ total-coverage lcov.info
{"totalLineCov":61.3,"totalBranchCov":51.2,"totalFunctionCov":55.1}
# ask for coverage for concrete source files
$ total-coverage lcov.info apps/api/src/a.ts apps/api/src/b.ts | jq
{
  "totalLineCov": 60.8,
  "totalBranchCov": 51.1,
  "totalFunctionCov": 60.4,
  "files": {
    "apps/api/src/b.ts": {
      "totalLineCov": 31.9,
      "totalBranchCov": 28.4,
      "totalFunctionCov": 38.5
    },
    "apps/api/src/a.ts": {
      "totalLineCov": 67.5,
      "totalBranchCov": 59.4,
      "totalFunctionCov": 68
    }
  }
}

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
