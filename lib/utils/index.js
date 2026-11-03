"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFileExistsAndIsReadable = testFileExistsAndIsReadable;
exports.calculateTotalCoverage = calculateTotalCoverage;
exports.returnWholeNumber = returnWholeNumber;
exports.deepClone = deepClone;
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
function roundtoOneDecimalPlace(num) {
    return Math.round(num * 10) / 10;
}
function calculateTotalCoverage(type, detailCoverage) {
    const totalCoverage = roundtoOneDecimalPlace((detailCoverage[type].hit / detailCoverage[type].found) * 100);
    return Number.isFinite(totalCoverage) ? totalCoverage : 0;
}
function returnWholeNumber(numAsStr) {
    const num = Number(numAsStr.trim());
    return Number.isFinite(num) ? num : 0;
}
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
