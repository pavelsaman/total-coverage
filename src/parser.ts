import LineByLine from 'n-readlines';
import { CoverageCounter, CoverageType, DetailCoverage, LineType } from './models';
import { deepClone, returnWholeNumber } from './utils';

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

export default function parse(pathToLcovFile: string, sourceFiles: string[]): DetailCoverage {
  const coverageCounters = {
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
  const detailCoverage: DetailCoverage = {
    ...deepClone(coverageCounters),
    files: {},
  };

  const readLiner = new LineByLine(pathToLcovFile);
  let line;
  let currentSourceFile = '';
  // biome-ignore lint/suspicious/noAssignInExpressions: valid use with readLiner and while here
  while ((line = readLiner.next())) {
    const [instruction, value] = line.toString().trim().split(':');
    const instructionUpper = instruction.toUpperCase();

    if (instructionUpper === LineType.SourceFilename) {
      currentSourceFile = value;
      if (sourceFiles.includes(value)) {
        detailCoverage.files = {
          [value]: deepClone(coverageCounters),
          ...detailCoverage.files,
        };
      }
    }

    const coverageType = instructionToCoverageTypeMapping.get(instructionUpper as LineType);
    const hitOrFound = instructionToFoundOrHitMapping.get(instructionUpper as LineType);

    if (coverageType && hitOrFound) {
      detailCoverage[coverageType][hitOrFound] += returnWholeNumber(value);
      if (currentSourceFile in detailCoverage.files) {
        detailCoverage.files[currentSourceFile][coverageType][hitOrFound] += returnWholeNumber(value);
      }
    }
  }

  return detailCoverage;
}
