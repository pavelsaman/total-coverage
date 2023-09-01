import { CoverageType, DetailCoverage, DetailFiles } from '../models';
export declare function testFileExistsAndIsReadable(path: string): void;
export declare function calculateTotalCoverage(type: CoverageType, detailCoverage: Omit<DetailCoverage, keyof DetailFiles>): number;
export declare function returnWholeNumber(numAsStr: string): number;
