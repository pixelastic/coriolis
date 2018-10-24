import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import colors from './colors';

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

      const rawContainers = [];
      const rawPorts = [];
      _.each(_.get(item, 'spec.containers'), container => {
        _.each(container.ports, port => {
          rawPorts.push(port.containerPort);
        });
        rawContainers.push(container.name);
      });
      const containers = chalk.blue(truncate(rawContainers.join(' '), 20));
      const ports = chalk.ansi256(colors.port)(
        _.map(rawPorts, port => `:${port}`).join(' ')
      );

      const age = helper.columnDate(_.get(item, 'status.startTime'));
      return {
        type: chalk.ansi256(colors.pod)('pod'),
        name,
        ip,
        labels,
        containers,
        ports,
        age,
      };
    });
    const config = {
      columns: ['type', 'name', 'containers', 'ports', 'labels', 'ip', 'age'],
      config: {
        age: { align: 'right' },
      },
    };
    return helper.columnify(items, config);
  },
};
