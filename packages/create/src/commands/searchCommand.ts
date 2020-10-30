import { createPluginCommand } from 'clibuilder'
import { searchByKeywords } from 'search-packages'

export const searchCommand = createPluginCommand({
  name: 'search',
  description: 'Search for devpkgs.',
  config: { devpkgKeywords: [] as string[] },
  arguments: [{
    name: 'keywords',
    description: 'additional keywords to narrow search results',
    multiple: true,
  }],
  context: { searchByKeywords },
  async run(args) {
    const keywords = this.config.devpkgKeywords
    if (args.keywords) keywords.push(...(args.keywords as unknown as string[]))

    const packages = await this.searchByKeywords(keywords)
    if (packages.length === 0) {
      this.ui.info(`no package with keywords '${keywords.join()}' is found`)
    }
    else {
      this.ui.info(`found devpkg${packages.length > 1 ? 's' : ''}`)
      this.ui.info('')
      packages.forEach(p => this.ui.info(`  ${p}`))
    }
  },
})
