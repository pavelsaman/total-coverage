export default function totalCoverage(pathToLcovFile: string): {
    totalLineCov: number;
    totalBranchCov: number;
    totalFunctionCov: number;
};
