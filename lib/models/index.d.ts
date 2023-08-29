type CoverageCounter = {
    found: number;
    hit: number;
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
export type TotalCoverage = {
    [K in TotalCoverageType]: number;
};
export type DetailCoverage = {
    [K in CoverageType]: CoverageCounter;
};
export {};
