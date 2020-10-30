import chalk from 'chalk'
import { generateDisplayedMessage, setupCommandTest } from 'clibuilder'
import { initCommand } from './initCommand'

test('No plugins installed should show error message', async () => {
  const { cli, argv, ui } = setupCommandTest(initCommand, {
    config: { keywords: ['some-key'] },
    context: { cwd: 'fixtures/no-plugins' }
  })

  await cli.parse(argv)
  const message = generateDisplayedMessage(ui.display.errorLogs)
  expect(message).toEqual(`
Could not locate any installed plugin.
Please use ${chalk.green('create')} to install plugins.
`)
})
