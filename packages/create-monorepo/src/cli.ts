import { Cli } from 'clibuilder'
import chalk from 'chalk'
import { pkg } from './pkg'
import path from 'path'

export const cli = new Cli({
  name: Object.keys(pkg.bin)[0],
  version: pkg.version,
  arguments: [{
     name: 'project name',
     required: true,
  }],
  run(args) {
    const projectName = args.packageName
    const projectPath = path.resolve(projectName)

    this.ui.info(`Creating a new monorepo in ${chalk.green(projectPath)}`)


  },
})
