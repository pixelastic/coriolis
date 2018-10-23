import firost from 'firost';
import chalk from 'chalk';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
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
  columnStatus(name, status) {
    if (status === 'Running') {
      return chalk.ansi256('34')(` ${name}`);
    }
    if (status === 'Pending') {
      return chalk.ansi256('241')(`[Pending]  ${name}`);
    }
    if (status === 'Creating') {
      return chalk.ansi256('184')(`[Creating]  ${name}`);
    }
    return `[${status}] ${name}`;
  },
  columnDate(inputDate) {
    const relativeDate = dayjs().to(dayjs(inputDate));
    return chalk.ansi256('241')(relativeDate);
  },
};
