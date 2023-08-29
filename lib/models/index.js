"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalCoverageType = exports.CoverageType = void 0;
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
