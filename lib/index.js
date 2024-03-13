"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const models_1 = require("./models");
const parser_1 = __importDefault(require("./parser"));
const utils_1 = require("./utils");
function totalCoverage(pathToLcovFile, sourceFiles) {
    const normalizedPath = node_path_1.default.normalize(pathToLcovFile);
    (0, utils_1.testFileExistsAndIsReadable)(normalizedPath);
    const detailCoverage = (0, parser_1.default)(normalizedPath, sourceFiles ?? []);
    const files = {};
    for (const [file, detailFileCov] of Object.entries(detailCoverage.files)) {
        files[file] = {
            totalLineCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Lines, detailFileCov),
            totalBranchCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Branches, detailFileCov),
            totalFunctionCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Functions, detailFileCov),
        };
    }
    const totalCoverages = {
        totalLineCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Lines, detailCoverage),
        totalBranchCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Branches, detailCoverage),
        totalFunctionCov: (0, utils_1.calculateTotalCoverage)(models_1.CoverageType.Functions, detailCoverage),
        ...(Object.keys(files).length > 0 ? { files } : undefined),
    };
    return totalCoverages;
}
exports.default = totalCoverage;
