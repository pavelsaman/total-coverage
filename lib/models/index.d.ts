export declare enum CoverageCounter {
    Found = "found",
    Hit = "hit"
}
type CoverageCounterType = {
    [K in CoverageCounter]: number;
};
export declare enum CoverageType {
    Lines = "lines",
    Branches = "branches",
    Functions = "functions"
}
export declare enum TotalCoverageType {
    TotalLineCov = "totalLineCov",
    TotalBranchCov = "totalBranchCov",
    TotalFunctionCov = "totalFunctionCov"
}
export type OmitFrom<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type FileTotalCoverage = {
    [K in string]: OmitFrom<TotalCoverage, keyof TotalFiles>;
};
type TotalFiles = {
    files?: FileTotalCoverage;
};
export type TotalCoverage = TotalFiles & {
    [K in TotalCoverageType]: number;
};
type FileDetailCoverage = {
    [K in string]: OmitFrom<DetailCoverage, keyof DetailFiles>;
};
export type DetailFiles = {
    files: FileDetailCoverage;
};
export type DetailCoverage = DetailFiles & {
    [K in CoverageType]: CoverageCounterType;
};
export declare enum LineType {
    NumberOfLinesFound = "LF",
    NumberOfLinesHit = "LH",
    NumberOfFunctionsFound = "FNF",
    NumberOfFunctionsHit = "FNH",
    NumberOfBranchesFound = "BRF",
    NumberOfBranchesHit = "BRH",
    SourceFilename = "SF"
}
export {};
