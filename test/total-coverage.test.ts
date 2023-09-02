// $ lcov --rc branch_coverage=1 --summary test/fixtures/lcov.info
// Summary coverage rate:
//   lines......: 60.8% (163 of 268 lines)
//   functions..: 60.4% (29 of 48 functions)
//   branches...: 51.1% (166 of 325 branches)

// $ lcov --rc branch_coverage=1 --list test/fixtures/lcov.info
// Reading tracefile test/fixtures/lcov.info
//             |Lines       |Functions  |Branches
// Filename    |Rate     Num|Rate    Num|Rate     Num
// ==================================================
// [apps/api/src/]
// a.ts        |67.5%    154|68.0%    25|59.4%    165
// b.ts        |31.9%     72|38.5%    13|28.4%     88
// c.ts        |85.7%     42|70.0%    10|59.7%     72
// ==================================================
//       Total:|60.8%    268|60.4%    48|51.1%    325

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

test(`totalCoverage(): "files" should not be in return value when no source files were passed`, () => {
  const coverage = totalCoverage(fixtureLcov, []);
  assert(!('files' in coverage));
});

test(`totalCoverage(): "files" should not be in return value when the source file was not in LCOV file`, () => {
  const coverage = totalCoverage(fixtureLcov, ['doesNotExistInLCOVFile']);
  assert(!('files' in coverage));
});

test(`totalCoverage(): "files" should be in return value when no source files were passed`, () => {
  const coverage = totalCoverage(fixtureLcov, ['apps/api/src/a.ts']);
  assert('files' in coverage);
});

test('totalCoverage() returns correct total coverages', () => {
  const coverage = totalCoverage(fixtureLcov, []);

  assert.strictEqual(coverage.totalLineCov, 60.8);
  assert.strictEqual(coverage.totalFunctionCov, 60.4);
  assert.strictEqual(coverage.totalBranchCov, 51.1);
});

test('totalCoverage(): returns correct total coverages also for passed source files', () => {
  const sourceFile = 'apps/api/src/a.ts';
  const coverage = totalCoverage(fixtureLcov, [sourceFile]);

  assert.strictEqual(coverage.totalLineCov, 60.8);
  assert.strictEqual(coverage.totalFunctionCov, 60.4);
  assert.strictEqual(coverage.totalBranchCov, 51.1);

  assert('files' in coverage);
  assert.strictEqual(coverage.files?.[sourceFile].totalLineCov, 67.5);
  assert.strictEqual(coverage.files?.[sourceFile].totalFunctionCov, 68);
  assert.strictEqual(coverage.files?.[sourceFile].totalBranchCov, 59.4);
});

test('totalCoverage(): calculate total coverage and coverage for two source files', () => {
  const sourceFileA = 'apps/api/src/a.ts';
  const sourceFileC = 'apps/api/src/c.ts';
  const coverage = totalCoverage(fixtureLcov, [sourceFileA, sourceFileC]);

  assert.strictEqual(coverage.totalLineCov, 60.8);
  assert.strictEqual(coverage.totalFunctionCov, 60.4);
  assert.strictEqual(coverage.totalBranchCov, 51.1);

  assert('files' in coverage);
  assert.strictEqual(coverage.files?.[sourceFileA].totalLineCov, 67.5);
  assert.strictEqual(coverage.files?.[sourceFileA].totalFunctionCov, 68);
  assert.strictEqual(coverage.files?.[sourceFileA].totalBranchCov, 59.4);

  assert.strictEqual(coverage.files?.[sourceFileC].totalLineCov, 85.7);
  assert.strictEqual(coverage.files?.[sourceFileC].totalFunctionCov, 70);
  assert.strictEqual(coverage.files?.[sourceFileC].totalBranchCov, 59.7);
});
