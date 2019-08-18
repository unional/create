import chalk from 'chalk';
import { CliCommand } from 'clibuilder';
import { findByKeywords } from 'find-installed-packages';
import { CliConfig } from '../interfaces';

export const initCommand: CliCommand<CliConfig> = {
  name: 'init',
  async run() {
    const packages = await findByKeywords(this.config.keywords, this.context)
    if (packages.length === 0) {
      this.ui.error(`
Could not locate any installed plugin.
Please use ${chalk.green('create')} to install plugins.
`)
    }
  },
}
