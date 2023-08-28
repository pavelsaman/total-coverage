import fs from 'fs';
import path from 'path';
import { Coverage, DetailCoverage } from './models';
import parse from './parser';

function testFileExistsAndIsReadable(path: string) {
  if (!fs.existsSync(path)) {
    throw new Error('LCOV file not found.');
  }

  if (!fs.lstatSync(path).isFile()) {
    throw new Error('LCOV file is not a regular file.');
  }

  try {
    fs.accessSync(path, fs.constants.R_OK);
  } catch {
    throw new Error('LCOV file is not readable.');
  }
}

function calculateTotalCoverage(type: Coverage, detailCoverage: DetailCoverage): number {
  return (detailCoverage[type].hit / detailCoverage[type].found) * 100;
}

export default function totalCoverage(pathToLcovFile: string) {
  const normalizedPath = path.normalize(pathToLcovFile);
  testFileExistsAndIsReadable(normalizedPath);
  const detailCoverage = parse(normalizedPath);

  return {
    totalLineCov: calculateTotalCoverage(Coverage.Lines, detailCoverage),
    totalBranchCov: calculateTotalCoverage(Coverage.Branches, detailCoverage),
    totalFunctionCov: calculateTotalCoverage(Coverage.Functions, detailCoverage),
  };
}
