import LineByLine from 'n-readlines';
import { CoverageCounter, CoverageType, DetailCoverage, LineType } from './models';
import { returnWholeNumber } from './utils';

const instructionToCoverageTypeMapping = new Map([
  [LineType.NumberOfLinesFound, CoverageType.Lines],
  [LineType.NumberOfLinesHit, CoverageType.Lines],
  [LineType.NumberOfFunctionsFound, CoverageType.Functions],
  [LineType.NumberOfFunctionsHit, CoverageType.Functions],
  [LineType.NumberOfBranchesFound, CoverageType.Branches],
  [LineType.NumberOfBranchesHit, CoverageType.Branches],
]);

const instructionToFoundOrHitMapping = new Map([
  [LineType.NumberOfLinesFound, CoverageCounter.Found],
  [LineType.NumberOfLinesHit, CoverageCounter.Hit],
  [LineType.NumberOfFunctionsFound, CoverageCounter.Found],
  [LineType.NumberOfFunctionsHit, CoverageCounter.Hit],
  [LineType.NumberOfBranchesFound, CoverageCounter.Found],
  [LineType.NumberOfBranchesHit, CoverageCounter.Hit],
]);

export default function parse(pathToLcovFile: string): DetailCoverage {
  const coverageCounters: DetailCoverage = {
    lines: {
      found: 0,
      hit: 0,
    },
    functions: {
      found: 0,
      hit: 0,
    },
    branches: {
      found: 0,
      hit: 0,
    },
  };

  const readLiner = new LineByLine(pathToLcovFile);
  let line;
  // rome-ignore lint/suspicious/noAssignInExpressions: valid use with readLiner and while here
  while ((line = readLiner.next())) {
    const lineParts = line.toString().trim().split(':');
    const instruction = lineParts[0].toUpperCase();

    const coverageType = instructionToCoverageTypeMapping.get(instruction as LineType);
    const hitOrFound = instructionToFoundOrHitMapping.get(instruction as LineType);

    if (coverageType && hitOrFound) {
      coverageCounters[coverageType][hitOrFound] += returnWholeNumber(lineParts[1]);
    }
  }

  return coverageCounters;
}
