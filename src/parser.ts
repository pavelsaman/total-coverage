import { DetailCoverage } from './models';

export default function parse(_pathToLcovFile: string): DetailCoverage {
  // read file content

  //parse the content
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

  // return results
}
