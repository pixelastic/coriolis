import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';

export default {
  async list() {
    const results = await helper.getJson('pods');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      // Status Running/Pending is available through status.phase. To check for
      // pods terminating, we need to check the deletionTimestamp
      const rawStatus = _.get(item, 'status.phase');
      const deletionTimestamp = _.get(item, 'metadata.deletionTimestamp');
      const status = deletionTimestamp ? 'Terminating' : rawStatus;
      const name = helper.columnStatus(rawName, status);

      const labels = helper.columnLabels(_.get(item, 'metadata.labels'));

      const ip = _.get(item, 'status.podIP');

      const containers = _.map(_.get(item, 'spec.containers'), container =>
        chalk.blue(truncate(container.name, 20))
      );

      const age = helper.columnDate(_.get(item, 'status.startTime'));
      return {
        type: chalk.green('⎈'),
        name,
        ip,
        labels,
        containers,
        age,
      };
    });
    const config = {
      columns: ['type', 'name', 'containers', 'labels', 'ip', 'age'],
      config: {
        age: { align: 'right' },
      },
    };
    helper.columnify(items, config);
  },
};
