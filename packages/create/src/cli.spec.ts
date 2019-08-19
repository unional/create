import t from 'assert';
import { generateDisplayedMessage, setupCliTest } from 'clibuilder';
import { cli } from './cli';
import { pkg } from './pkg';

test('cli name is "uni-create"', () => {
  t.strictEqual(cli.name, 'uni-create')
})

test('cli version is current version', () => {
  t.strictEqual(cli.version, pkg.version)
})

test(`no config will search for 'uni-devpkg'`, async () => {
  jest.setTimeout(10000)
  const { argv, ui } = setupCliTest(cli, ['list'])
  await cli.parse(argv)
  const message = generateDisplayedMessage(ui.display.infoLogs)
  expect(message).toBe(`no package of 'uni-devpkg' is found`)
})
