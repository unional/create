import chalk from 'chalk'
import { createCommand } from 'clibuilder'
import { findByKeywords } from 'find-installed-packages'

export const initCommand = createCommand({
  name: 'init',
  description: 'initialize the repo',
  config: { keywords: [] as string[] },
  async run() {
    const packages = await findByKeywords(this.config.keywords, this.context)
    if (packages.length === 0) {
      this.ui.error(`
Could not locate any installed plugin.
Please use ${chalk.green('create')} to install plugins.
`)
    }
  },
})
