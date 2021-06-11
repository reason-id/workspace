import {
  addDependenciesToPackageJson,
  formatFiles,
  GeneratorCallback,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { setDefaultCollection } from '@nrwl/workspace/src/utilities/set-default-collection';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

import {
  GENTYPE_VERSION,
  NX_VERSION,
  RESCRIPT_VERSION,
} from '../utils/versions';
import { createOptions, Options } from './libs/options';
import { InitSchema } from './schema';
import { jestInitGenerator } from '@nrwl/jest';
import { createBsConfig } from './libs/create-bs-config';

function updateDependencies(tree: Tree, options: Options) {
  // make sure always using the latest version of this plugins
  updateJson(tree, 'package.json', (json) => {
    if (json.dependencies['@reason-id/rescript']) {
      delete json.dependencies['@reason-id/rescript'];
      return json;
    }
    return json;
  });

  return addDependenciesToPackageJson(
    tree,
    {},
    {
      '@reason-id/rescript': NX_VERSION,
      'bs-platform': RESCRIPT_VERSION,
      genType: options.genType ? GENTYPE_VERSION : undefined,
    }
  );
}

export async function initGenerator(tree: Tree, schema: InitSchema) {
  let options = createOptions(schema);
  let tasks: Array<GeneratorCallback> = [];

  setDefaultCollection(tree, '@reason-id/rescript');

  if (options.unitTestRunner === 'jest') {
    let jestTask = await jestInitGenerator(tree, {});
    tasks.push(jestTask);
  }

  let installTasks = await updateDependencies(tree, options);
  tasks.push(installTasks);

  createBsConfig(tree, options);

  if (!options.skipFormatting) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}
