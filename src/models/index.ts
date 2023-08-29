type CoverageCounter = {
  found: number;
  hit: number;
};

export enum CoverageType {
  Lines = 'lines',
  Branches = 'branches',
  Functions = 'functions',
}

export enum TotalCoverageType {
  TotalLineCov = 'totalLineCov',
  TotalBranchCov = 'totalBranchCov',
  TotalFunctionCov = 'totalFunctionCov',
}

export type TotalCoverage = {
  [K in TotalCoverageType]: number;
};

export type DetailCoverage = {
  [K in CoverageType]: CoverageCounter;
};
