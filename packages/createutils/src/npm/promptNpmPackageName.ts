import { PromptPresenter, LogPresenter } from 'clibuilder'
import validatePackageName from 'validate-npm-package-name'
import chalk from 'chalk'
import { showInvalidPackageName } from '../ui'

// istanbul ignore next
export async function promptNpmPackageName({ ui }: { ui: LogPresenter & PromptPresenter }, { ask, packageName }: { packageName?: string, ask?: boolean }): Promise<string> {
  if (!ask && packageName) return packageName

  return ui.prompt([{
    type: 'input',
    name: 'packageName',
    message: `${chalk.green('npm')} package name:`,
    validate: packageName => {
      const { validForNewPackages, errors = [], warnings = [] } = validatePackageName(packageName)
      if (!validForNewPackages) {
        showInvalidPackageName({ ui }, packageName, [...errors, ...warnings])
      }

      return validForNewPackages
    },
    initial: packageName
  }]).then(({ packageName }) => packageName)
}
