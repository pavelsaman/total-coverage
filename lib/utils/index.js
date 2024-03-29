"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = exports.returnWholeNumber = exports.calculateTotalCoverage = exports.testFileExistsAndIsReadable = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
function testFileExistsAndIsReadable(path) {
    if (!node_fs_1.default.existsSync(path)) {
        throw new Error('LCOV file not found.');
    }
    if (!node_fs_1.default.lstatSync(path).isFile()) {
        throw new Error('LCOV file is not a regular file.');
    }
    try {
        node_fs_1.default.accessSync(path, node_fs_1.default.constants.R_OK);
    }
    catch {
        throw new Error('LCOV file is not readable.');
    }
}
exports.testFileExistsAndIsReadable = testFileExistsAndIsReadable;
function roundtoOneDecimalPlace(num) {
    return Math.round(num * 10) / 10;
}
function calculateTotalCoverage(type, detailCoverage) {
    const totalCoverage = roundtoOneDecimalPlace((detailCoverage[type].hit / detailCoverage[type].found) * 100);
    return Number.isFinite(totalCoverage) ? totalCoverage : 0;
}
exports.calculateTotalCoverage = calculateTotalCoverage;
function returnWholeNumber(numAsStr) {
    const num = Number(numAsStr.trim());
    return Number.isFinite(num) ? num : 0;
}
exports.returnWholeNumber = returnWholeNumber;
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepClone = deepClone;
