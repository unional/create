import { LogPresenter } from 'clibuilder'

export function showInvalidPackageName({ ui }: { ui: LogPresenter }, packageName: string, reasons: string[]) {
  ui.error(`'${packageName}' is not a valid npm package name.`)
  reasons.forEach(r => ui.error(`  ${r}`))
}
