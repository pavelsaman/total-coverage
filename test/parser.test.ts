// $ lcov --rc branch_coverage=1 --summary fixtures/lcov.info
// Summary coverage rate:
//   lines......: 60.8% (163 of 268 lines)
//   functions..: 60.4% (29 of 48 functions)
//   branches...: 51.1% (166 of 325 branches)

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CoverageType } from '../src/models';
import parse from '../src/parser';
import { fixtureLcov } from './utils';

for (const coverageType in CoverageType) {
  test(`parse(): "${CoverageType[coverageType]}" should be in return value`, () => {
    const coverage = parse(fixtureLcov);
    assert(CoverageType[coverageType] in coverage);
  });
}
