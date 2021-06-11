import { Tree, updateJson } from '@nrwl/devkit';
import { reactInitGenerator } from '@nrwl/react';
import { REASON_REACT } from '../../utils/versions';
import { createBsConfig } from './libs/create-bscofig-json';
import { createOptions } from './libs/options';
import { Schema } from './schema';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { rescriptInitGenerator } from '@broerjuang/rescript';

export async function generator(tree: Tree, schema: Schema) {
  // Normalization and validation --> atd | decco
  let options = createOptions(schema);

  let reactTask = await reactInitGenerator(tree, {});
  let rescriptTask = await rescriptInitGenerator(tree, {});

  updateJson(tree, 'package.json', (json) => {
    json.dependencies['reason-react'] = REASON_REACT;
    return json;
  });
  createBsConfig(tree, options);
  return runTasksInSerial(reactTask, rescriptTask);
}
