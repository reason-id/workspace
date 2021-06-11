import { join } from 'path';
import { BuildExecutorSchema } from '../executors/build/schema';

type Bin = {
  rfmt: string;
  bsc: string;
  bsb: string;
};

let isRescript = (compilerVersion: BuildExecutorSchema['compilerVersion']) =>
  compilerVersion === '912';

export function getBsbBinPath(
  compilerVersion: BuildExecutorSchema['compilerVersion']
): Bin {
  let nodePath = `node_modules/rescript-${compilerVersion}`;

  return {
    rfmt: join(nodePath, 'bsrfmt'),
    bsc: join(nodePath, 'bsc'),
    bsb: join(nodePath, isRescript(compilerVersion) ? 'rescript' : 'bsb'),
  };
}
