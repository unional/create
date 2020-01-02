import { promptFolderName, promptCreatePackageConfirmation, promptNpmPackageName, initGitRepo } from '@unional/createutils'
import chalk from 'chalk'
import { PluginCli } from 'clibuilder'
import path from 'path'
import { initCommand, listCommand, searchCommand } from '../commands'
import { CLI_NAME, version } from '../pkg'
import { UniConfig } from '../types'

export const cli = new PluginCli<UniConfig>({
  name: CLI_NAME,
  version,
  defaultConfig: { devpkgKeywords: ['uni-devpkg'] },
  commands: [initCommand, listCommand, searchCommand],
  arguments: [{
    name: 'package-name',
  }],
  options: {
    boolean: {
      ask: {
        description: 'ask for input even if the information is available'
      }
    }
  },
  async run(args) {
    try {
      const packageName = await promptNpmPackageName(this, args as any)
      const folderName = await promptFolderName(this, { ...args, packageName } as any)

      if (!await promptCreatePackageConfirmation(this, { packageName, folderName })) return

      const packagePath = path.resolve(packageName)
      this.ui.info(`Creating a new project in ${chalk.green(packagePath)}`)

      await initGitRepo(packagePath)
    }
    catch (e) {
      this.ui.error(e.message)
    }
  },
})
