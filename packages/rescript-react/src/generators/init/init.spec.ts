import { readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { generator } from './init.impl';

describe('init', () => {
  let tree: Tree;
  beforeAll(() => {
    tree = createTreeWithEmptyWorkspace();
  });
  it('should add dependencies', async () => {
    await generator(tree, {});
    let packageJSON = readJson(tree, 'package.json');
    expect(packageJSON.dependencies['reason-react']).toBeDefined();
    expect(packageJSON.devDependencies['bs-platform']).toBeDefined();
    expect(packageJSON.dependencies['react']).toBeDefined();
    expect(packageJSON.dependencies['react-dom']).toBeDefined();
  });

  describe('bsconfig.json', () => {
    it('should generate bsconfig.json', async () => {
      await generator(tree, {});
      let bsconfigJSON = readJson(tree, 'bsconfig.json');
      let packageJSON = readJson(tree, 'package.json');
      expect(tree.exists('bsconfig.json')).toBeTruthy();
      expect(bsconfigJSON.name).toEqual(packageJSON.name);
    });
  });
});
