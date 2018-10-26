import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import colors from './colors';

export default {
  async list() {
    const results = await helper.getJson('cronjob');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      const schedule = _.get(item, 'spec.schedule');
      const isSuspended = _.get(item, 'spec.suspend');
      const color = isSuspended ? colors.pending : colors.cronjob;
      const prefix = isSuspended ? '' : '';
      const name = chalk.ansi256(color)(`${prefix} ${rawName} (${schedule})`);

      const containers = _.map(
        _.get(item, 'spec.jobTemplate.spec.template.spec.containers'),
        container => chalk.blue(truncate(container.name, 20))
      );

      const age = helper.columnDate(_.get(item, 'metadata.creationTimestamp'));
      return {
        type: chalk.ansi256(colors.cronjob)('cron'),
        name,
        containers,
        age,
      };
    });
    return helper.columnify(_.compact(items));
  },
};
