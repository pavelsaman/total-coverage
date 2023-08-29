import fs from 'fs';
import { CoverageType, DetailCoverage } from '../models';

export function testFileExistsAndIsReadable(path: string) {
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

function roundtoOneDecimalPlace(num: number): number {
  return Math.round(num * 10) / 10;
}

export function calculateTotalCoverage(type: CoverageType, detailCoverage: DetailCoverage): number {
  return roundtoOneDecimalPlace((detailCoverage[type].hit / detailCoverage[type].found) * 100);
}
