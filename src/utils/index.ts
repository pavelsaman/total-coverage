import fs from 'fs';
import { CoverageType, DetailCoverage, DetailFiles, OmitFrom } from '../models';

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

export function calculateTotalCoverage(
  type: CoverageType,
  detailCoverage: OmitFrom<DetailCoverage, keyof DetailFiles>,
): number {
  const totalCoverage = roundtoOneDecimalPlace((detailCoverage[type].hit / detailCoverage[type].found) * 100);
  return isFinite(totalCoverage) ? totalCoverage : 0;
}

export function returnWholeNumber(numAsStr: string): number {
  const num = Number(numAsStr.trim());
  return isFinite(num) ? num : 0;
}

export function omitEmpty<T extends object>(obj: T, prop: keyof T): void {
  if (typeof obj[prop] === 'object' && Object.keys(obj[prop] as object).length === 0) {
    delete obj[prop];
  }
}

export function deepClone<T extends object>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
