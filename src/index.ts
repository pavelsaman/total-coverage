import path from 'path';
import { CoverageType, TotalCoverage } from './models';
import parse from './parser';
import { calculateTotalCoverage, testFileExistsAndIsReadable } from './utils';

export default function totalCoverage(pathToLcovFile: string): TotalCoverage {
  const normalizedPath = path.normalize(pathToLcovFile);
  testFileExistsAndIsReadable(normalizedPath);
  const detailCoverage = parse(normalizedPath);

  return {
    totalLineCov: calculateTotalCoverage(CoverageType.Lines, detailCoverage),
    totalBranchCov: calculateTotalCoverage(CoverageType.Branches, detailCoverage),
    totalFunctionCov: calculateTotalCoverage(CoverageType.Functions, detailCoverage),
  };
}
