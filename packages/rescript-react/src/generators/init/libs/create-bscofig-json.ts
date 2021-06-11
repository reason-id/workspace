import { readJson, Tree } from '@nrwl/devkit';
import { Options } from './options';

const BASE_CONFIG = {
  'bsc-flags': ['-bs-super-errors'],
  sources: [
    {
      dir: 'src',
      subdirs: true,
    },
  ],
  'package-specs': [
    {
      module: 'es6',
      'in-source': true,
    },
  ],
  suffix: '.bs.js',
  namespace: true,
  'bs-dependencies': ['reason-react'],
  'ppx-flags': [],
  refmt: 3,
};

export async function createBsConfig(tree: Tree, options: Options) {
  let isBsConfigExist = tree.exists('bsconfig.json');
  let name = readJson(tree, 'package.json').name;
  if (!isBsConfigExist) {
    tree.write(
      'bsconfig.json',
      JSON.stringify({ name, ...BASE_CONFIG }, null, 2)
    );
  }
}
