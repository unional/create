import a from 'assertron'
import { setupCommandTest } from 'clibuilder'
import { some } from 'satisfier'
import { initCommand } from './initCommand'

describe('assert installed dependencies', () => {
  let actualPackages: string[]

  const { cli, argv } = setupCommandTest(initCommand, {
    context: {
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
    await cli.parse(argv)
  })

  test('install @unional/dev as dev dependency', async () => {
    a.satisfies(actualPackages, some('@unional/devpkg-node'))
  })
  test('install assertron as dev dependency directly so that it can be importable by TS', async () => {
    a.satisfies(actualPackages, some('assertron'))
  })
})
