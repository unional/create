import { CliCommand } from 'clibuilder';
import { findByKeywords } from 'find-installed-packages';
import { unpartial } from 'unpartial';
import { UniConfig } from '../types';

export const listCommand: CliCommand<UniConfig> = {
  name: 'list',
  alias: ['ls'],
  description: 'List currently installed devpkgs.',
  async run() {
    const keywords = this.config.devpkgKeywords
    const dep = unpartial({ findByKeywords }, this.context._dep)

    const packages = await dep.findByKeywords(keywords, this.context)
    if (packages.length === 0) {
      this.ui.info(`no package of '${keywords.join()}' is found`)
    }
    else {
      this.ui.info(`installed devpkg${packages.length > 1 ? 's' : ''}:`)
      this.ui.info('')
      packages.forEach(p => this.ui.info(`  ${p}`))
    }
  },
}
