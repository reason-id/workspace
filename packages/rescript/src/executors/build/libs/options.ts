import { BuildExecutorSchema } from '../schema';

interface Options extends BuildExecutorSchema {}

export function createOptions(schema: BuildExecutorSchema) {
  return {
    ...schema,
    compilerVersion: schema.compilerVersion || '912',
  };
}
