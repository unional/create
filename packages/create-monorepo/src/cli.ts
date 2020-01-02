import { initGitRepo } from '@unional/createutils';
import chalk from 'chalk';
import { Cli } from 'clibuilder';
import fs from 'fs';
import path from 'path';
import { CLI_NAME } from './constants';
import { pkg } from './pkg';
import { assertPackageNameIsValid } from './checkProjectName';

export const cli = new Cli({
  name: CLI_NAME,
  version: pkg.version,
  arguments: [{
    name: 'project name',
    required: true,
  }],
  commands: [{
    name: 'hello',
    async run() { throw new Error('dsfdsfsdf') },
  }],
  async run({ projectName }) {
    try {
      assertPackageNameIsValid(projectName)
      const projectPath = path.resolve(projectName)

      this.ui.info(`Creating a new project in ${chalk.green(projectPath)}`)

      await initGitRepo(projectPath)
      createEmptyPackageJson(projectPath)
    }
    catch (e) {
      this.ui.error(e.message)
    }
  },
})

function createEmptyPackageJson(projectPath: string) {
  fs.writeFileSync(path.join(projectPath, 'package.json'), '{}')
}
