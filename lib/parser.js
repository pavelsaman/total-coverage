"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(_pathToLcovFile) {
    return {
        lines: {
            hit: 0,
            found: 0,
        },
        functions: {
            hit: 0,
            found: 0,
        },
        branches: {
            hit: 0,
            found: 0,
        },
    };
}
exports.default = parse;
