# Total coverage

Parse LCOV file and return total line, branch, and function coverage.

[![Test and Build](https://github.com/pavelsaman/total-coverage/actions/workflows/test-and-build.yaml/badge.svg?branch=master)](https://github.com/pavelsaman/total-coverage/actions/workflows/test-and-build.yaml)

## Usage

```ts
import totalCoverage from 'total-coverage'

const { totalLineCov, totalBranchCov, totalFunctionCov } = totalCoverage('path/to/lcov.info');
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
