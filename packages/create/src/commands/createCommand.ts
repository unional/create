import { CliCommand } from 'clibuilder';
import { searchByKeywords } from 'search-packages';
import { CLI_NAME } from '../constants';
import { askLanguage, chooseLanguage } from './language';

export const createCommand: CliCommand = {
  name: 'create',
  description: 'Create a new project',
  arguments: [{
    name: 'projectName',
    description: 'Name of the project',
    required: true,
  }],
  async run() {
    let language = await chooseLanguage(this)
    if (language === 'Others') {
      language = await askLanguage(this)
      const langPackages = await searchByKeywords([CLI_NAME, `language-${language}`])
      if (langPackages.length === 0) {
        this.ui.error(`Unable to find package that support langauge ${language}`)
      }
    }
  },
}
