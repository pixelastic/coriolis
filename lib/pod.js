import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import colors from './colors';

export default {
  getStatus(pod) {
    // Terminating pods have a deletion timestamp
    if (_.get(pod, 'metadata.deletionTimestamp')) {
      return 'Terminating';
    }

    const conditions = _.get(pod, 'status.conditions');
    const isReady = Boolean(
      _.find(conditions, { type: 'Ready', status: 'True' })
    );
    if (isReady) {
      return _.get(pod, 'status.phase');
    }

    // Pod started from a job and completed:
    const isCompleted = Boolean(
      _.find(conditions, {
        type: 'Ready',
        status: 'False',
        reason: 'PodCompleted',
      })
    );
    if (isCompleted) {
      return 'Completed';
    }

    // Containers not ready, for any kind of reason
    const areContainersNotReady = Boolean(
      _.find(conditions, {
        type: 'Ready',
        status: 'False',
        reason: 'ContainersNotReady',
      })
    );
    if (areContainersNotReady) {
      const containerStatuses = _.get(pod, 'status.containerStatuses');
      const waitingReason = _.get(
        _.find(containerStatuses, 'state.waiting'),
        'state.waiting.reason'
      );
      const terminatedReason = _.get(
        _.find(containerStatuses, 'state.terminated'),
        'state.terminated.reason'
      );
      return waitingReason || terminatedReason;
    }

    // Returning the phase if we know of it
    const safelist = ['Pending'];
    const phase = _.get(pod, 'status.phase');
    if (_.includes(safelist, phase)) {
      return phase;
    }

    return 'UNKNOWN';
  },
  async list() {
    const results = await helper.getJson('pods');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      const status = this.getStatus(item);
      const name = helper.columnStatus(rawName, status);

      const labels = helper.columnLabels(item, 'metadata.labels');

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
        _.map(rawPorts, port => port).join(' ')
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
    const columns = ['ip', 'ports'];
    return helper.columnify(items, columns);
  },
};
