"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(_pathToLcovFile) {
    return {
        lines: {
            found: 0,
            hit: 0,
            details: [
                {
                    line: 1,
                    hit: 5,
                },
            ],
        },
        functions: {
            hit: 0,
            found: 0,
            details: [
                {
                    name: 'test',
                    line: 5,
                },
            ],
        },
        branches: {
            hit: 0,
            found: 0,
            details: [
                {
                    block: 1,
                    branch: 1,
                    line: 1,
                    taken: 2,
                },
            ],
        },
    };
}
exports.default = parse;
