import { Schema } from '../schema';

export interface Options extends Schema {}

export function createOptions(schema: Schema) {
  return {
    ...schema,
    unitTestRunner: schema.unitTestRunner || 'jest',
    e2eTestRunner: schema.e2eTestRunner || 'cypress',
  };
}
