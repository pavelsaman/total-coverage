"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const n_readlines_1 = __importDefault(require("n-readlines"));
const models_1 = require("./models");
const utils_1 = require("./utils");
const instructionToCoverageTypeMapping = new Map([
    [models_1.LineType.NumberOfLinesFound, models_1.CoverageType.Lines],
    [models_1.LineType.NumberOfLinesHit, models_1.CoverageType.Lines],
    [models_1.LineType.NumberOfFunctionsFound, models_1.CoverageType.Functions],
    [models_1.LineType.NumberOfFunctionsHit, models_1.CoverageType.Functions],
    [models_1.LineType.NumberOfBranchesFound, models_1.CoverageType.Branches],
    [models_1.LineType.NumberOfBranchesHit, models_1.CoverageType.Branches],
]);
const instructionToFoundOrHitMapping = new Map([
    [models_1.LineType.NumberOfLinesFound, models_1.CoverageCounter.Found],
    [models_1.LineType.NumberOfLinesHit, models_1.CoverageCounter.Hit],
    [models_1.LineType.NumberOfFunctionsFound, models_1.CoverageCounter.Found],
    [models_1.LineType.NumberOfFunctionsHit, models_1.CoverageCounter.Hit],
    [models_1.LineType.NumberOfBranchesFound, models_1.CoverageCounter.Found],
    [models_1.LineType.NumberOfBranchesHit, models_1.CoverageCounter.Hit],
]);
function parse(pathToLcovFile, sourceFiles) {
    const coverageCounters = {
        lines: {
            found: 0,
            hit: 0,
        },
        functions: {
            found: 0,
            hit: 0,
        },
        branches: {
            found: 0,
            hit: 0,
        },
    };
    const detailCoverage = {
        ...(0, utils_1.deepClone)(coverageCounters),
        files: {},
    };
    const readLiner = new n_readlines_1.default(pathToLcovFile);
    let line;
    let currentSourceFile = '';
    while ((line = readLiner.next())) {
        const [instruction, value] = line.toString().trim().split(':');
        const instructionUpper = instruction.toUpperCase();
        if (instructionUpper === models_1.LineType.SourceFilename) {
            currentSourceFile = value;
            if (sourceFiles.includes(value)) {
                detailCoverage.files = {
                    [value]: (0, utils_1.deepClone)(coverageCounters),
                    ...detailCoverage.files,
                };
            }
        }
        const coverageType = instructionToCoverageTypeMapping.get(instructionUpper);
        const hitOrFound = instructionToFoundOrHitMapping.get(instructionUpper);
        if (coverageType && hitOrFound) {
            detailCoverage[coverageType][hitOrFound] += (0, utils_1.returnWholeNumber)(value);
            if (currentSourceFile in detailCoverage.files) {
                detailCoverage.files[currentSourceFile][coverageType][hitOrFound] += (0, utils_1.returnWholeNumber)(value);
            }
        }
    }
    return detailCoverage;
}
exports.default = parse;
