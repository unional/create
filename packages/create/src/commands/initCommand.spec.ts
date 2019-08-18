import a from 'assertron';
import { setupCliCommandTest } from 'clibuilder';
import { initCommand } from './initCommand';
import { some } from 'satisfier';

describe('assert installed dependencies', () => {
  let actualPackages: string[]

  const { cmd, args, argv } = setupCliCommandTest(initCommand, [], undefined, {
    _dep: {
      getInputs: () => Promise.resolve({}),
      copyArtifacts: () => Promise.resolve(),
      initializeFolder: () => Promise.resolve(),
      installDev: (...packages: string[]) => {
        actualPackages = packages
        return Promise.resolve()
      },
    },
  })

  beforeAll(async () => {
    await cmd.run(args, argv)
  })

  test('install @unional/dev as dev dependency', async () => {
    a.satisfies(actualPackages, some('@unional/devpkg-node'))
  })
  test('install assertron as dev dependency directly so that it can be importable by TS', async () => {
    a.satisfies(actualPackages, some('assertron'))
  })
})
