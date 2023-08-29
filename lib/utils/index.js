"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalCoverage = exports.testFileExistsAndIsReadable = void 0;
const fs_1 = __importDefault(require("fs"));
function testFileExistsAndIsReadable(path) {
    if (!fs_1.default.existsSync(path)) {
        throw new Error('LCOV file not found.');
    }
    if (!fs_1.default.lstatSync(path).isFile()) {
        throw new Error('LCOV file is not a regular file.');
    }
    try {
        fs_1.default.accessSync(path, fs_1.default.constants.R_OK);
    }
    catch {
        throw new Error('LCOV file is not readable.');
    }
}
exports.testFileExistsAndIsReadable = testFileExistsAndIsReadable;
function calculateTotalCoverage(type, detailCoverage) {
    return Math.round((detailCoverage[type].hit / detailCoverage[type].found) * 100 * 10) / 10;
}
exports.calculateTotalCoverage = calculateTotalCoverage;
