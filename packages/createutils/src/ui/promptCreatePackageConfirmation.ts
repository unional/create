import chalk from 'chalk'
import { PromptPresenter, LogPresenter } from 'clibuilder'

// istanbul ignore next
export function promptCreatePackageConfirmation({ ui }: { ui: LogPresenter & PromptPresenter }, input: Record<string, any>): Promise<boolean> {
  return ui.prompt([{
    type: 'confirm',
    name: 'createPackage',
    message: `The following package will be created:
${chalk.green('npm')} package name: ${input.packageName}
${chalk.green('repository')} folder: ${input.folderName}
`
  }]).then(({ createPackage }) => createPackage)
}
