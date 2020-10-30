import { createPluginCommand } from 'clibuilder'
import { findByKeywords } from 'find-installed-packages'

export const listCommand = createPluginCommand({
  name: 'list',
  alias: ['ls'],
  config: { devpkgKeywords: [] as string[] },
  description: 'List currently installed devpkgs.',
  context: {
    findByKeywords
  },
  async run() {
    const keywords = this.config.devpkgKeywords

    const packages = await this.findByKeywords(keywords, this)
    if (packages.length === 0) {
      this.ui.info(`no package of '${keywords.join()}' is found`)
    }
    else {
      this.ui.info(`installed devpkg${packages.length > 1 ? 's' : ''}:`)
      this.ui.info('')
      packages.forEach(p => this.ui.info(`  ${p}`))
    }
  },
})
