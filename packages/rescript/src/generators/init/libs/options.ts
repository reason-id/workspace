import { InitSchema } from '../schema';

export interface Options extends InitSchema {}

export function createOptions(schema: InitSchema) {
  return {
    ...schema,
    unitTestRunner: schema.unitTestRunner ?? 'jest',
    genType: schema.genType ?? false,
  };
}
