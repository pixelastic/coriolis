import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import colors from './colors';

export default {
  // Return an array of all pod names
  async allPodNames() {
    const results = await helper.getJson('pods');
    return _.map(_.get(results, 'items', {}), 'metadata.name');
  },
  getStatus(pod) {
    // Some specific status are not available through status.phase
    if (_.get(pod, 'metadata.deletionTimestamp')) {
      return 'Terminating';
    }
    // Are containers ready?
    const conditions = _.get(pod, 'status.conditions');
    const containersReady = Boolean(
      _.find(conditions, { type: 'ContainersReady', status: 'True' })
    );
    if (!containersReady) {
      const containerStatuses = _.get(pod, 'status.containerStatuses');
      const failedContainer = _.find(containerStatuses, status =>
        _.has(status, 'state.waiting')
      );
      const stateWaitingReason = _.get(failedContainer, 'state.waiting.reason');
      return stateWaitingReason;
    }

    return _.get(pod, 'status.phase');
  },
  async list() {
    const results = await helper.getJson('pods');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      // Status Running/Pending is available through status.phase. To check for
      // pods terminating, we need to check the deletionTimestamp
      const status = this.getStatus(item);
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
