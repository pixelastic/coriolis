import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import colors from './colors';

export default {
  async list() {
    const results = await helper.getJson('statefulset');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      const currentReplicas = _.get(item, 'status.currentReplicas');
      const replicas = _.get(item, 'status.replicas');
      const isFull = currentReplicas === replicas;
      const color = isFull ? colors.statefulset : colors.pending;
      const prefix = isFull ? '' : '';
      const name = chalk.ansi256(color)(
        truncate(`${prefix} ${rawName} (${currentReplicas}/${replicas})`, 30)
      );

      const containers = _.map(
        _.get(item, 'spec.template.spec.containers'),
        container => chalk.blue(truncate(container.name, 20))
      );

      const labels = helper.columnLabels(item, 'spec.selector.matchLabels');

      const service = chalk.ansi256(colors.service)(
        _.get(item, 'spec.serviceName')
      );

      const age = helper.columnDate(_.get(item, 'metadata.creationTimestamp'));
      return {
        type: chalk.ansi256(colors.statefulset)('stfl'),
        name,
        containers,
        labels,
        age,
        service,
      };
    });
    return helper.columnify(items, ['service']);
  },
};
