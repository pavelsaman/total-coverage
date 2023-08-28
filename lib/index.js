"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const models_1 = require("./models");
const parser_1 = __importDefault(require("./parser"));
function testFileExistsAndIsReadable(path) {
    if (!fs_1.default.existsSync(path)) {
        throw new Error('LCOV file not found.');
    }
    if (!fs_1.default.lstatSync(path).isFile()) {
        throw new Error('LCOV file is not an ordinary file.');
    }
    try {
        fs_1.default.accessSync(path, fs_1.default.constants.R_OK);
    }
    catch {
        throw new Error('LCOV file is not readable.');
    }
}
function calculateTotalCoverage(type, detailCoverage) {
    return (detailCoverage[type].hit / detailCoverage[type].found) * 100;
}
function totalCoverage(pathToLcovFile) {
    const normalizedPath = path_1.default.normalize(pathToLcovFile);
    testFileExistsAndIsReadable(normalizedPath);
    const detailCoverage = (0, parser_1.default)(normalizedPath);
    return {
        totalLineCov: calculateTotalCoverage(models_1.Coverage.Lines, detailCoverage),
        totalBranchCov: calculateTotalCoverage(models_1.Coverage.Branches, detailCoverage),
        totalFunctionCov: calculateTotalCoverage(models_1.Coverage.Functions, detailCoverage),
    };
}
exports.default = totalCoverage;
//# sourceMappingURL=index.js.map