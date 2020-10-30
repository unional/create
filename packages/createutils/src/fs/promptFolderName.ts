import chalk from 'chalk'
import { PromptPresenter, LogPresenter } from 'clibuilder'
import validFilename from 'valid-filename'
import { toFolderName } from './toFolderName'

// istanbul ignore next
export async function promptFolderName({ ui }: { ui: LogPresenter & PromptPresenter }, { ask, packageName }: { packageName: string, ask?: boolean }): Promise<string> {
  const folderName = toFolderName(packageName)
  if (!ask) return folderName

  return ui.prompt([{
    type: 'input',
    name: 'folderName',
    message: `${chalk.green('repository')} folder:`,
    validate: folderName => validFilename(folderName) || 'invalid folder name.',
    initial: folderName
  }]).then(({ folderName }) => folderName.trim())
}
