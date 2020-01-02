import { setupCliTest, generateDisplayedMessage } from 'clibuilder';
import { cli } from './cli';

test('invalid project name', async () => {
  const { argv, ui } = setupCliTest(cli, [' leading-space'])

  await cli.parse(argv)
  const message = generateDisplayedMessage(ui.display.errorLogs)
  expect(message).toEqual(`' leading-space' is not a valid npm package name.`)
})
