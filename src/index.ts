import path from 'node:path';
import { CoverageType, type FileTotalCoverage, type TotalCoverage } from './models';
import parse from './parser';
import { calculateTotalCoverage, testFileExistsAndIsReadable } from './utils';

export default function totalCoverage(pathToLcovFile: string, sourceFiles?: string[]): TotalCoverage {
  const normalizedPath = path.normalize(pathToLcovFile);
  testFileExistsAndIsReadable(normalizedPath);

  const detailCoverage = parse(normalizedPath, sourceFiles ?? []);
  const files: FileTotalCoverage = {};
  for (const [file, detailFileCov] of Object.entries(detailCoverage.files)) {
    files[file] = {
      totalLineCov: calculateTotalCoverage(CoverageType.Lines, detailFileCov),
      totalBranchCov: calculateTotalCoverage(CoverageType.Branches, detailFileCov),
      totalFunctionCov: calculateTotalCoverage(CoverageType.Functions, detailFileCov),
    };
  }

  const totalCoverages = {
    totalLineCov: calculateTotalCoverage(CoverageType.Lines, detailCoverage),
    totalBranchCov: calculateTotalCoverage(CoverageType.Branches, detailCoverage),
    totalFunctionCov: calculateTotalCoverage(CoverageType.Functions, detailCoverage),
    ...(Object.keys(files).length > 0 ? { files } : undefined),
  };
  return totalCoverages;
}
