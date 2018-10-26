import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import colors from './colors';

export default {
  async list() {
    const results = await helper.getJson('deployment');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      const availableReplicas = _.get(item, 'status.availableReplicas');
      const replicas = _.get(item, 'status.replicas');
      const isFull = availableReplicas === replicas;
      const color = isFull ? colors.deployment : colors.pending;
      const prefix = isFull ? '' : '';
      const name = chalk.ansi256(color)(
        truncate(`${prefix} ${rawName} (${availableReplicas}/${replicas})`, 30)
      );

      const containers = _.map(
        _.get(item, 'spec.template.spec.containers'),
        container => chalk.blue(truncate(container.name, 20))
      );

      const labels = helper.columnLabels(item, 'spec.selector.matchLabels');

      const age = helper.columnDate(_.get(item, 'metadata.creationTimestamp'));
      return {
        type: chalk.ansi256(colors.deployment)('dplm'),
        name,
        containers,
        labels,
        age,
      };
    });
    return helper.columnify(items);
  },
};
