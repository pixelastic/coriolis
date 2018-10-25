import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import colors from './colors';

export default {
  async list() {
    const results = await helper.getJson('job');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      const requiredSuccess = _.get(item, 'spec.completions');
      const successCount = _.get(item, 'status.succeeded', 0);
      const isCompleted = successCount === requiredSuccess;
      const color = isCompleted ? colors.success : colors.pending;
      const prefix = isCompleted ? '' : '';
      const name = chalk.ansi256(color)(
        `${prefix} ${rawName} (${successCount}/${requiredSuccess})`
      );

      const containers = _.map(
        _.get(item, 'spec.template.spec.containers'),
        container => chalk.blue(truncate(container.name, 20))
      );

      const labels = helper.columnLabels(_.get(item, 'metadata.labels'));

      const age = helper.columnDate(_.get(item, 'metadata.creationTimestamp'));
      return {
        type: chalk.ansi256(colors.job)('job'),
        name,
        containers,
        labels,
        age,
      };
    });
    const config = {
      columns: ['type', 'name', 'containers', 'labels', 'age'],
      config: {
        name: { minWidth: 10 },
        containers: { minWidth: 15 },
        labels: { minWidth: 15 },
        age: { align: 'right' },
      },
    };
    return helper.columnify(_.compact(items), config);
  },
};
