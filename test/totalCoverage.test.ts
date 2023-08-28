// $ lcov --rc branch_coverage=1 --summary fixtures/lcov.info
// Summary coverage rate:
//   lines......: 60.8% (163 of 268 lines)
//   functions..: 60.4% (29 of 48 functions)
//   branches...: 51.1% (166 of 325 branches)

import assert from 'node:assert/strict';
import { test } from 'node:test';
import totalCoverage from '../src';
import { fixtureLcov } from './utils';

test('totalCoverage() gives the right shape', () => {
  const coverage = totalCoverage(fixtureLcov);

  assert('totalLineCov' in coverage);
  assert('totalBranchCov' in coverage);
  assert('totalFunctionCov' in coverage);
});

test('it throws when LCOV file is not found', () => {
  assert.throws(() => {
    totalCoverage('nonexistent');
  });
});
