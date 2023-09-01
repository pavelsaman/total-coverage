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

export type DetailFiles = {
  files: FileCoverage;
};

export type FileCoverage = {
  [K in string]: Omit<DetailCoverage, keyof DetailFiles>;
};

export type FileTotalCoverage = {
  [K in string]: Omit<TotalCoverage, keyof TotalFiles>;
};

type TotalFiles = {
  files?: FileTotalCoverage;
};

export type TotalCoverage = TotalFiles & {
  [K in TotalCoverageType]: number;
};

export type DetailCoverage = DetailFiles & {
  [K in CoverageType]: CoverageCounterType;
};

export enum LineType {
  NumberOfLinesFound = 'LF',
  NumberOfLinesHit = 'LH',
  NumberOfFunctionsFound = 'FNF',
  NumberOfFunctionsHit = 'FNH',
  NumberOfBranchesFound = 'BRF',
  NumberOfBranchesHit = 'BRH',
  SourceFilename = 'SF',
}
