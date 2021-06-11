import { exec } from 'child_process';
import { BuildExecutorSchema } from './schema';
import { ExecutorContext, offsetFromRoot } from '@nrwl/devkit';
import { getBsbBinPath } from '../../utils/bsb';
import { createOptions } from './libs/options';

export default async function runExecutor(
  schema: BuildExecutorSchema,
  context: ExecutorContext
) {
  let options = createOptions(schema);
  let bin = getBsbBinPath(options.compilerVersion);

  exec(`${context.root}/${bin.bsb} -h`, console.log);

  return {
    success: true,
  };
}
