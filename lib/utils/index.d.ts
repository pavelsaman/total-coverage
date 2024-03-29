import type { CoverageType, DetailCoverage, DetailFiles, OmitFrom } from '../models';
export declare function testFileExistsAndIsReadable(path: string): void;
export declare function calculateTotalCoverage(type: CoverageType, detailCoverage: OmitFrom<DetailCoverage, keyof DetailFiles>): number;
export declare function returnWholeNumber(numAsStr: string): number;
export declare function deepClone<T extends object>(obj: T): T;
