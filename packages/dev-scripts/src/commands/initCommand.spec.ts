import chalk from 'chalk';
import { generateDisplayedMessage, setupCliCommandTest } from 'clibuilder';
import { initCommand } from './initCommand';

test('No plugins installed should show error message', async () => {
  const { cmd, args, argv, ui } = setupCliCommandTest(initCommand, [], { keywords: ['some-key'] })
  cmd.context.cwd = 'fixtures/no-plugins'

  await cmd.run(args, argv)
  const message = generateDisplayedMessage(ui.display.errorLogs)
  expect(message).toEqual(`
Could not locate any installed plugin.
Please use ${chalk.green('create')} to install plugins.
`)
})
