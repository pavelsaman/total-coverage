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
import { CoverageType } from '../src/models';
import parse from '../src/parser';
import { fixtureLcov } from './utils';

for (const coverageType in CoverageType) {
  test(`parse(): "${CoverageType[coverageType]}" should be in return value`, () => {
    const coverage = parse(fixtureLcov, []);
    assert(CoverageType[coverageType] in coverage);
  });
}

test(`parse(): empty "files" should be in return value when no source files were passed`, () => {
  const coverage = parse(fixtureLcov, []);
  assert('files' in coverage);
  assert.strictEqual(Object.keys(coverage.files).length, 0);
});

test('parse() returns correct coverage counters', () => {
  const coverage = parse(fixtureLcov, []);
  assert.strictEqual(coverage.lines.found, 268);
  assert.strictEqual(coverage.lines.hit, 163);
  assert.strictEqual(coverage.functions.found, 48);
  assert.strictEqual(coverage.functions.hit, 29);
  assert.strictEqual(coverage.branches.found, 325);
  assert.strictEqual(coverage.branches.hit, 166);
});

test(`parse(): "files" should contain correct coverage counters when source files were passed`, () => {
  const sourceFile = 'apps/api/src/a.ts';
  const coverage = parse(fixtureLcov, [sourceFile]);

  assert.strictEqual(coverage.lines.found, 268);
  assert.strictEqual(coverage.lines.hit, 163);
  assert.strictEqual(coverage.functions.found, 48);
  assert.strictEqual(coverage.functions.hit, 29);
  assert.strictEqual(coverage.branches.found, 325);
  assert.strictEqual(coverage.branches.hit, 166);

  assert('files' in coverage);
  assert.strictEqual(coverage.files[sourceFile].lines.found, 154);
  assert.strictEqual(coverage.files[sourceFile].lines.hit, 104);
  assert.strictEqual(coverage.files[sourceFile].functions.found, 25);
  assert.strictEqual(coverage.files[sourceFile].functions.hit, 17);
  assert.strictEqual(coverage.files[sourceFile].branches.found, 165);
  assert.strictEqual(coverage.files[sourceFile].branches.hit, 98);
});

test('parse(): calculate total coverage counters and coverage counters for two source files', () => {
  const sourceFileA = 'apps/api/src/a.ts';
  const sourceFileC = 'apps/api/src/c.ts';
  const coverage = parse(fixtureLcov, [sourceFileA, sourceFileC]);

  assert.strictEqual(coverage.lines.found, 268);
  assert.strictEqual(coverage.lines.hit, 163);
  assert.strictEqual(coverage.functions.found, 48);
  assert.strictEqual(coverage.functions.hit, 29);
  assert.strictEqual(coverage.branches.found, 325);
  assert.strictEqual(coverage.branches.hit, 166);

  assert('files' in coverage);
  assert.strictEqual(coverage.files[sourceFileA].lines.found, 154);
  assert.strictEqual(coverage.files[sourceFileA].lines.hit, 104);
  assert.strictEqual(coverage.files[sourceFileA].functions.found, 25);
  assert.strictEqual(coverage.files[sourceFileA].functions.hit, 17);
  assert.strictEqual(coverage.files[sourceFileA].branches.found, 165);
  assert.strictEqual(coverage.files[sourceFileA].branches.hit, 98);

  assert.strictEqual(coverage.files[sourceFileC].lines.found, 42);
  assert.strictEqual(coverage.files[sourceFileC].lines.hit, 36);
  assert.strictEqual(coverage.files[sourceFileC].functions.found, 10);
  assert.strictEqual(coverage.files[sourceFileC].functions.hit, 7);
  assert.strictEqual(coverage.files[sourceFileC].branches.found, 72);
  assert.strictEqual(coverage.files[sourceFileC].branches.hit, 43);
});
