import t from 'assert';
import { generateDisplayedMessage, setupCliTest } from 'clibuilder';
import { cli } from './cli';
import { getVersion } from './version';

test('cli name is "uni"', () => {
  t.strictEqual(cli.name, 'uni')
})

test('cli version is current version', () => {
  const version = getVersion()
  t.strictEqual(cli.version, version)
})

test(`no config will search for 'uni-devpkg'`, async () => {
  const { argv, ui } = setupCliTest(cli, ['list'])
  await cli.parse(argv)
  const message = generateDisplayedMessage(ui.display.infoLogs)
  expect(message).toBe(`no package of 'uni-devpkg' is found`)
})
