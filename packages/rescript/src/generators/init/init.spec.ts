import { readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { initGenerator } from './init.impl';

describe('init', () => {
  let tree: Tree;
  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });
  it('should add bsconfig to root project', async () => {
    await initGenerator(tree, {});
    expect(tree.exists('bsconfig.json')).toBeTruthy();
    let content = tree.read('bsconfig.json', 'utf-8');
    expect(content).toContain('name');
  });

  it('should add dependencies', async () => {
    await initGenerator(tree, {});
    let packageJson = readJson(tree, 'package.json');
    let bsconfig = readJson(tree, 'bsconfig.json');
    expect(packageJson.devDependencies['bs-platform']).toBeDefined();
    expect(bsconfig.genType).toBeUndefined();
  });

  it('--genType', async () => {
    await initGenerator(tree, { genType: true });
    let packageJson = readJson(tree, 'package.json');
    let bsconfig = readJson(tree, 'bsconfig.json');
    expect(packageJson.devDependencies['bs-platform']).toBeDefined();
    expect(bsconfig.genType).toBeDefined();
  });
});
