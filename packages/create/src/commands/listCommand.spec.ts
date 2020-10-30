import { setupCommandTest } from 'clibuilder'
import { listCommand } from './listCommand'

test('if config with devPkgKeyword, that will be used instead', async () => {
  let actual: string[] = []
  const { cli, argv } = setupCommandTest(listCommand, {
    config: { devpkgKeywords: ['xx'] },
    context: {
      findByKeywords(keywords: string[]) {
        actual = keywords
        return Promise.resolve([])
      },
    }
  })

  await cli.parse(argv)

  expect(actual).toEqual(['xx'])
})
