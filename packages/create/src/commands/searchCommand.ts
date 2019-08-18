import { CliCommand } from 'clibuilder';
import { searchByKeywords } from 'search-packages';
import { unpartial } from 'unpartial';
import { UniConfig } from '../types';

export const searchCommand: CliCommand<UniConfig> = {
  name: 'search',
  description: 'Search for devpkgs.',
  arguments: [{
    name: 'keywords',
    description: 'additional keywords to narrow search results',
    multiple: true,
  }],
  async run(args) {
    const keywords = this.config.devpkgKeywords
    if (args.keywords) keywords.push(...args.keywords)

    const dep = unpartial({ searchByKeywords }, this.context._dep)

    const packages = await dep.searchByKeywords(keywords)
    if (packages.length === 0) {
      this.ui.info(`no package with keywords '${keywords.join()}' is found`)
    }
    else {
      this.ui.info(`found devpkg${packages.length > 1 ? 's' : ''}`)
      this.ui.info('')
      packages.forEach(p => this.ui.info(`  ${p}`))
    }
  },
}
