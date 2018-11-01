import _ from 'lodash';
import chalk from 'chalk';
import helper from './helper';
import firost from 'firost';

export default {
  async rawList() {
    const raw = await firost.shell(`kubectl config get-contexts`);
    const rawContexts = raw.split('\n').slice(1, -1);
    return _.map(rawContexts, context => {
      const split = context.split(/\s+/);
      const isCurrent = split[0] === '*';
      const name = split[1];
      return {
        name,
        isCurrent,
      };
    });
  },
  async list() {
    const contexts = await this.rawList();
    const items = _.map(contexts, context => {
      let name = context.name;
      if (context.isCurrent) {
        name = chalk.green(` ${name}`);
      }

      return {
        type: 'ctx',
        name,
      };
    });

    return helper.columnify(items);
  },
};
