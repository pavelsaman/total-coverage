"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const models_1 = require("./models");
const parser_1 = __importDefault(require("./parser"));
const utils_1 = require("./utils");
function totalCoverage(pathToLcovFile, sourceFiles) {
    const normalizedPath = path_1.default.normalize(pathToLcovFile);
    (0, utils_1.testFileExistsAndIsReadable)(normalizedPath);
    const detailCoverage = (0, parser_1.default)(normalizedPath, sourceFiles ?? []);
    const files = {};
    Object.entries(detailCoverage.files).forEach(([file, detailFileCov]) => {
        files[file] = {
            totalLineCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Lines, detailFileCov),
            totalBranchCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Branches, detailFileCov),
            totalFunctionCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Functions, detailFileCov),
        };
    });
    return {
        totalLineCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Lines, detailCoverage),
        totalBranchCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Branches, detailCoverage),
        totalFunctionCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Functions, detailCoverage),
        files,
    };
}
exports.default = totalCoverage;
