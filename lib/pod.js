import _ from 'lodash';
import columnify from 'columnify';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';

export default {
  async list() {
    const results = await helper.getJson('pods');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      const rawStatus = _.get(item, 'status.phase');
      const name = helper.columnStatus(rawName, rawStatus);

      const ip = _.get(item, 'status.podIP');

      const containers = _.map(_.get(item, 'spec.containers'), container =>
        truncate(chalk.blue(container.image), 20)
      );

      const age = helper.columnDate(_.get(item, 'status.startTime'));
      return {
        name,
        ip,
        containers,
        age,
      };
    });
    const config = {
      showHeaders: false,
      columns: ['name', 'containers', 'ip', 'age'],
      config: {
        name: { minWidth: 20 },
        containers: { maxWidth: 20 },
        ip: { minWidth: 15, align: 'right' },
        age: { minWidth: 20, align: 'right' },
      },
    };
    const result = columnify(items, config);
    console.info(result);
  },
};
