import _ from 'lodash';
import helper from './helper';
import chalk from 'chalk';
import colors from './colors';

export default {
  async list() {
    const results = await helper.getJson('service');
    const items = _.map(results.items, item => {
      const rawName = _.get(item, 'metadata.name');
      if (rawName === 'kubernetes') {
        return null;
      }
      const name = chalk.ansi256(colors.service)(` ${rawName}`);

      const ip = _.get(item, 'spec.clusterIP');

      const rawPorts = _.map(_.get(item, 'spec.ports'), port => {
        const from = port.port;
        const to = port.targetPort;
        if (to === from) {
          return to;
        }
        return `${port.port}:${port.targetPort}`;
      });
      const ports = chalk.ansi256(colors.port)(rawPorts);

      const labels = helper.columnLabels(item, 'spec.selector');

      const age = helper.columnDate(_.get(item, 'metadata.creationTimestamp'));
      return {
        type: chalk.ansi256(colors.service)('srvc'),
        name,
        ip,
        ports,
        labels,
        age,
      };
    });
    const columns = ['ip', 'ports'];
    return helper.columnify(_.compact(items), columns);
  },
};
