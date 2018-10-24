import firost from 'firost';
import columnify from 'columnify';
import _ from 'lodash';
import chalk from 'chalk';
import truncate from 'cli-truncate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import colors from './colors';
dayjs.extend(relativeTime);

export default {
  async kubectl(args) {
    return await firost.shell(`kubectl ${args}`);
  },
  async get(args) {
    return await this.kubectl(`get ${args}`);
  },
  async getJson(args) {
    try {
      const content = await this.kubectl(`get -o json ${args}`);
      return JSON.parse(content);
    } catch (err) {
      return null;
    }
  },
  columnify(items, userConfig = {}) {
    const config = {
      showHeaders: false,
      truncate: true,
      // maxLineWidth: 'auto',
      columnSplitter: ' ',
      ...userConfig,
    };
    const result = columnify(items, config);
    console.info(result);
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
      Terminating: {
        color: colors.error,
        prefix: '',
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
    const blockList = ['pod-template-hash'];
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
