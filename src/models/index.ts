export enum CoverageCounter {
  Found = 'found',
  Hit = 'hit',
}

type CoverageCounterType = {
  [K in CoverageCounter]: number;
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
  [K in CoverageType]: CoverageCounterType;
};

export enum LineType {
  NumberOfLinesFound = 'LF',
  NumberOfLinesHit = 'LH',
  NumberOfFunctionsFound = 'FNF',
  NumberOfFunctionsHit = 'FNH',
  NumberOfBranchesFound = 'BRF',
  NumberOfBranchesHit = 'BRH',
}
