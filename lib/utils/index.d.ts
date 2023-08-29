import { CoverageType, DetailCoverage } from '../models';
export declare function testFileExistsAndIsReadable(path: string): void;
export declare function calculateTotalCoverage(type: CoverageType, detailCoverage: DetailCoverage): number;
export declare function returnWholeNumber(numAsStr: string): number;
