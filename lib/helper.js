import firost from 'firost';
import columnify from 'columnify';
import _ from 'lodash';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import colors from './colors';
import logUpdate from 'log-update';
dayjs.extend(relativeTime);

export default {
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
  // Wrapper around columnify to share the default config
  columnify(items, userConfig = {}) {
    const config = {
      showHeaders: false,
      truncate: true,
      // maxLineWidth: 'auto',
      columnSplitter: ' ',
      ...userConfig,
    };
    return columnify(items, config);
  },
  // Refresh the terminal with the specified method output on a specific rate
  refreshTerminal(userMethod, refreshRate) {
    console.clear();
    async function tick() {
      const output = await userMethod();
      logUpdate(output);
      _.delay(tick, refreshRate);
    }
    tick();
  },
  // Returns a colored status
  columnStatus(inputName, status) {
    const hash = {
      Running: {
        color: colors.pod,
        prefix: '',
      },
      Pending: {
        color: colors.pending,
        prefix: '',
      },
      Failed: {
        color: colors.failed,
        prefix: '',
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
    return chalk.ansi256('241')(relativeDate);
  },
  // Returns a colored set of labels
  columnLabels(inputLabels) {
    if (!inputLabels) {
      return null;
    }
    const blockList = ['pod-template-hash', 'controller-uid'];
    const labels = [];
    _.each(inputLabels, (value, key) => {
      if (_.includes(blockList, key)) {
        return;
      }
      labels.push(`${key}:${value}`);
    });

    return chalk.ansi256('202')(labels.join(' '));
  },
};
