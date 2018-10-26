import firost from 'firost';
import columnify from 'columnify';
import _ from 'lodash';
import chalk from 'chalk';
import termSize from 'term-size';
import truncate from 'cli-truncate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import colors from './colors';
import logUpdate from 'log-update';
dayjs.extend(relativeTime);

export default {
  // Return list of kind names
  async completion(kind) {
    const results = await this.getJson(kind);
    return _.map(_.get(results, 'items', {}), 'metadata.name');
  },
  // Wrapper around columnify to share the default config
  columnify(items, userColumns = []) {
    const defaultColumns = ['type', 'name', 'labels', 'containers', 'age'];
    const columns =
      termSize().columns > 90
        ? _.concat(defaultColumns, userColumns)
        : defaultColumns;
    const config = {
      showHeaders: false,
      // truncate: true,
      // maxLineWidth: 'auto',
      columnSplitter: ' ',
      config: {
        type: { minWidth: 4 },
        name: { minWidth: 35 },
        containers: { minWidth: 10, maxWidth: 20 },
        labels: { minWidth: 15 },
        // age: { minWidth: 15, align: 'right' },
        ip: { minWidth: 15 },
      },
      columns,
    };
    return columnify(items, config);
  },
  // Returns a colored status
  columnStatus(inputName, status) {
    const hash = {
      Failed: {
        color: colors.failed,
        prefix: '',
      },
      ContainerCreating: {
        color: colors.creating,
        prefix: '',
      },
      CrashLoopBackOff: {
        color: colors.crash,
        prefix: '',
      },
      Pending: {
        color: colors.pending,
        prefix: '',
      },
      Running: {
        color: colors.pod,
        prefix: '',
      },
      Succeeded: {
        color: colors.success,
        prefix: '',
      },
      Terminating: {
        color: colors.terminating,
        prefix: '',
      },
    };
    const config = hash[status];
    if (!config) {
      return `[${status}] ${inputName}`;
    }
    const name = `${config.prefix} ${inputName}`;
    return chalk.ansi256(config.color)(truncate(name, 30));
  },
  // Returns a colored relative date
  columnDate(inputDate) {
    const relativeDate = dayjs().to(dayjs(inputDate));
    return chalk.ansi256(colors.date)(relativeDate);
  },
  // Returns a colored set of labels
  // Where to find the labels is slightly different for different kinds
  columnLabels(item, labelKey = 'metadata.labels') {
    const rawLabels = _.get(item, labelKey, null);
    const kind = _.get(item, 'kind');
    if (!rawLabels) {
      return null;
    }
    const blockList = ['pod-template-hash', 'controller-uid'];
    if (kind !== 'Pod') {
      blockList.push('job-name');
    }
    const labels = [];
    _.each(rawLabels, (value, key) => {
      if (_.includes(blockList, key)) {
        return;
      }
      labels.push(`${key}:${value}`);
    });

    return chalk.ansi256('202')(labels.join(' '));
  },
  // Quicker alias to run kubectl commands
  async get(args) {
    return await firost.shell(`kubectl get ${args}`);
  },
  // Ask kubernetes about about data in json format
  async getJson(args) {
    try {
      const content = await this.get(`-o json ${args}`);
      return JSON.parse(content);
    } catch (err) {
      return null;
    }
  },
  // Refresh the terminal with the specified method output on a specific rate
  refreshTerminal(userMethod, refreshRate) {
    async function tick() {
      const output = await userMethod();
      console.clear();
      logUpdate(output);
      _.delay(tick, refreshRate);
    }
    tick();
  },
};
