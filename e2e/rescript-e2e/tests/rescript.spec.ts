import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('rescript e2e', () => {
  it('should create rescript', async (done) => {
    const plugin = uniq('rescript');
    ensureNxProject('@reason-id/rescript', 'dist/packages/rescript');
    await runNxCommandAsync(`generate @reason-id/rescript:rescript ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('rescript');
      ensureNxProject('@reason-id/rescript', 'dist/packages/rescript');
      await runNxCommandAsync(
        `generate @reason-id/rescript:rescript ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('rescript');
      ensureNxProject('@reason-id/rescript', 'dist/packages/rescript');
      await runNxCommandAsync(
        `generate @reason-id/rescript:rescript ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
