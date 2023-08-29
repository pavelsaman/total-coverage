"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineType = exports.TotalCoverageType = exports.CoverageType = exports.CoverageCounter = void 0;
var CoverageCounter;
(function (CoverageCounter) {
    CoverageCounter["Found"] = "found";
    CoverageCounter["Hit"] = "hit";
})(CoverageCounter || (exports.CoverageCounter = CoverageCounter = {}));
var CoverageType;
(function (CoverageType) {
    CoverageType["Lines"] = "lines";
    CoverageType["Branches"] = "branches";
    CoverageType["Functions"] = "functions";
})(CoverageType || (exports.CoverageType = CoverageType = {}));
var TotalCoverageType;
(function (TotalCoverageType) {
    TotalCoverageType["TotalLineCov"] = "totalLineCov";
    TotalCoverageType["TotalBranchCov"] = "totalBranchCov";
    TotalCoverageType["TotalFunctionCov"] = "totalFunctionCov";
})(TotalCoverageType || (exports.TotalCoverageType = TotalCoverageType = {}));
var LineType;
(function (LineType) {
    LineType["NumberOfLinesFound"] = "LF";
    LineType["NumberOfLinesHit"] = "LH";
    LineType["NumberOfFunctionsFound"] = "FNF";
    LineType["NumberOfFunctionsHit"] = "FNH";
    LineType["NumberOfBranchesFound"] = "BRF";
    LineType["NumberOfBranchesHit"] = "BRH";
})(LineType || (exports.LineType = LineType = {}));
