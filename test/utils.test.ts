import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CoverageType, DetailCoverage } from '../src/models';
import { calculateTotalCoverage, returnWholeNumber, testFileExistsAndIsReadable } from '../src/utils';
import { fixtureLcov } from './utils';

test('testFileExistsAndIsReadable() throws when LCOV file is not found', () => {
  assert.throws(() => {
    testFileExistsAndIsReadable('nonexistent');
  });
});

test('testFileExistsAndIsReadable() should not throw when LCOV exists', () => {
  assert.doesNotThrow(() => {
    testFileExistsAndIsReadable(fixtureLcov);
  });
});

[
  {
    name: 'calculateTotalCoverage(): returns correct total coverage 100 %',
    data: {
      lines: {
        hit: 1,
        found: 1,
      },
    },
    result: 100,
  },
  {
    name: 'calculateTotalCoverage(): returns correct total coverage > 100 %',
    data: {
      lines: {
        hit: 8,
        found: 1,
      },
    },
    result: 800,
  },
  {
    name: 'calculateTotalCoverage(): returns correct total coverage 50 %',
    data: {
      lines: {
        hit: 1,
        found: 2,
      },
    },
    result: 50,
  },
  {
    name: 'calculateTotalCoverage(): returns correct total coverage 0 %',
    data: {
      lines: {
        hit: 0,
        found: 2,
      },
    },
    result: 0,
  },
  {
    name: 'calculateTotalCoverage(): returns correct total coverage 37.5 %',
    data: {
      lines: {
        hit: 9,
        found: 24,
      },
    },
    result: 37.5,
  },
  {
    name: 'calculateTotalCoverage(): returns correct total coverage 33.3 % (rounded)',
    data: {
      lines: {
        hit: 1,
        found: 3,
      },
    },
    result: 33.3,
  },
].forEach(({ name, data, result }) => {
  test(name, () => {
    assert.strictEqual(calculateTotalCoverage(CoverageType.Lines, data as DetailCoverage), result);
  });
});

test('calculateTotalCoverage() should return NaN when it cannot calculate the result', () => {
  assert(
    isNaN(
      calculateTotalCoverage(CoverageType.Lines, {
        lines: {
          hit: 0,
          found: 0,
        },
      } as DetailCoverage),
    ),
  );
});

[
  {
    name: 'returnWholeNumber(): returns 0 for NaN input string',
    input: 'NaN',
    result: 0,
  },
  {
    name: 'returnWholeNumber(): returns 0 for non-numeric string',
    input: 'abc',
    result: 0,
  },
  {
    name: 'returnWholeNumber(): returns 0 for empty string',
    input: '',
    result: 0,
  },
  {
    name: 'returnWholeNumber(): returns 0 for string with whitespace',
    input: '  ',
    result: 0,
  },
  {
    name: 'returnWholeNumber(): returns number for valid input',
    input: '5',
    result: 5,
  },
  {
    name: 'returnWholeNumber(): returns number when string contains whitespace',
    input: ' 5  ',
    result: 5,
  },
].forEach(({ name, input, result }) => {
  test(name, () => {
    assert.strictEqual(returnWholeNumber(input), result);
  });
});
