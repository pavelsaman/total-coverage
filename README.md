# Total coverage

Parse LCOV file and return total line, branch, and function coverage.

[![Test and Build](https://github.com/pavelsaman/total-coverage/actions/workflows/test-and-build.yaml/badge.svg?branch=master)](https://github.com/pavelsaman/total-coverage/actions/workflows/test-and-build.yaml)

## Usage

```ts
import totalCoverage from 'total-coverage';

const { totalLineCov, totalBranchCov, totalFunctionCov } = totalCoverage('path/to/lcov.info');
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
