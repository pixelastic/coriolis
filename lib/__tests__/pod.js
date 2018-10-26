import module from '../pod';
import helper from '../test-helper';
const fixture = helper.fixture;

describe('pod', () => {
  describe('getStatus', () => {
    it('should get ContainerCreating status', async () => {
      const input = await fixture('pod/container-creating.json');

      const actual = module.getStatus(input);

      expect(actual).toEqual('ContainerCreating');
    });
    it('should get ContainerCannotRun status', async () => {
      const input = await fixture('pod/container-cannot-run.json');

      const actual = module.getStatus(input);

      expect(actual).toEqual('ContainerCannotRun');
    });
    // it('should get CrashLoopBackOff status', () => {
    // });
    // it('should get Succeeded status', () => {
    // });
    it('should get Pending status', async () => {
      const input = await fixture('pod/pending.json');

      const actual = module.getStatus(input);

      expect(actual).toEqual('Pending');
    });
    it('should get Running status', async () => {
      const input = await fixture('pod/running.json');

      const actual = module.getStatus(input);

      expect(actual).toEqual('Running');
    });
    it('should get Terminating status', async () => {
      const input = await fixture('pod/terminating.json');

      const actual = module.getStatus(input);

      expect(actual).toEqual('Terminating');
    });
    it('should get Completed status', async () => {
      const input = await fixture('pod/completed.json');

      const actual = module.getStatus(input);

      expect(actual).toEqual('Completed');
    });
  });
});
