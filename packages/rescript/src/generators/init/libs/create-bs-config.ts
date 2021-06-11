import { readJson, readWorkspaceConfiguration, Tree } from '@nrwl/devkit';
import { Options } from './options';

const BS_CONFIG_BASE = {
  sources: [
    {
      dir: 'src',
      subdirs: true,
    },
  ],
  'package-specs': [
    {
      module: 'commonjs',
      'in-source': true,
    },
  ],
  suffix: '.bs.js',
  'bs-dependencies': [],
  'ppx-dependecies': [],
};

export function createBsConfig(tree: Tree, options: Options) {
  if (!tree.exists('bsconfig.json')) {
    let name = readJson(tree, 'package.json').name;
    tree.write(
      'bsconfig.json',
      JSON.stringify({
        name,
        ...BS_CONFIG_BASE,
        genType: options.genType
          ? {
              language: 'ts',
              shims: {},
              debug: {
                all: false,
                basic: false,
              },
            }
          : undefined,
      })
    );
  }
}
