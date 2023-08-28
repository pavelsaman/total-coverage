import { DetailCoverage } from './models';

export default function parse(_pathToLcovFile: string): DetailCoverage {
  // read file content

  //parse the content
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
      hit: 0, // executed
      found: 0, // total
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

  // return results
}
