// $ lcov --rc branch_coverage=1 --summary fixtures/lcov.info
// Summary coverage rate:
//   lines......: 60.8% (163 of 268 lines)
//   functions..: 60.4% (29 of 48 functions)
//   branches...: 51.1% (166 of 325 branches)

import assert from 'node:assert/strict';
import { test } from 'node:test';
import totalCoverage from '../src';
import { TotalCoverageType } from '../src/models';
import { fixtureLcov } from './utils';

for (const coverageType in TotalCoverageType) {
  test(`totalCoverage(): "${TotalCoverageType[coverageType]}" should be in return value`, () => {
    const coverage = totalCoverage(fixtureLcov, []);
    assert(TotalCoverageType[coverageType] in coverage);
  });
}

test(`totalCoverage(): empty "files" should be in return value when no source files were passed`, () => {
  const coverage = totalCoverage(fixtureLcov, []);
  assert('files' in coverage);
});

test('totalCoverage() returns correct total coverages', () => {
  const coverage = totalCoverage(fixtureLcov, []);
  assert.strictEqual(coverage.totalLineCov, 60.8);
  assert.strictEqual(coverage.totalFunctionCov, 60.4);
  assert.strictEqual(coverage.totalBranchCov, 51.1);
});
