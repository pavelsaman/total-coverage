export declare enum Coverage {
    Lines = "lines",
    Branches = "branches",
    Functions = "functions"
}
type CoverageCounter = {
    found: number;
    hit: number;
};
type LinesCoverageDetail = {
    line: number;
    hit: number;
};
type BranchesCoverageDetail = {
    line: number;
    block: number;
    branch: number;
    taken: number;
};
type FunctionsCoverageDetail = {
    name: string;
    line: number;
};
type LinesCoverage = CoverageCounter & {
    details: LinesCoverageDetail[];
};
type BranchesCoverage = CoverageCounter & {
    details: BranchesCoverageDetail[];
};
type FunctionsCoverage = CoverageCounter & {
    details: FunctionsCoverageDetail[];
};
export type DetailCoverage = {
    lines: LinesCoverage;
    branches: BranchesCoverage;
    functions: FunctionsCoverage;
};
export {};
