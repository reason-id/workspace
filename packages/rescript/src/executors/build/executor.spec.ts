import { BuildExecutorSchema } from './schema';
import executor from './executor';
import { ExecutorContext, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

describe('Build Executor', () => {
  let context: ExecutorContext;
  let tree: Tree;
  let options: BuildExecutorSchema;
  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    context = {
      root: process.cwd(),
      workspace: { version: 2, projects: {} },
      cwd: process.cwd(),
      isVerbose: true,
    };
  });
  it('--compilerVersion 820', async () => {
    const output = await executor({ compilerVersion: '820' }, context);
    expect(output.success).toBe(true);
  });

  it('--compilerVersion 902', async () => {
    const output = await executor({ compilerVersion: '902' }, context);
    expect(output.success).toBe(true);
  });

  it('--compilerVersion 912', async () => {
    const output = await executor({ compilerVersion: '912' }, context);
    expect(output.success).toBe(true);
  });
});
