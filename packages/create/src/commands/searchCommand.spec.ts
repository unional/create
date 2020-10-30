import { setupCommandTest } from 'clibuilder'
import { searchCommand } from './searchCommand'

test('if config with devPkgKeywords, that will be used instead', async () => {
  let actual: string[] = []
  const { cli, argv } = setupCommandTest(searchCommand, {
    config: { devpkgKeywords: ['xx'] },
    context: {
      searchByKeywords(keywords: string[]) {
        actual = keywords
        return Promise.resolve([])
      },
    },
  })

  await cli.parse(argv)

  expect(actual).toEqual(['xx'])
})

test('can specify additional keywords to narrow result', async () => {
  let actual: string[] = []
  const { cli, argv } = setupCommandTest(searchCommand, {
    config: { devpkgKeywords: ['xx'] },
    context: {
      searchByKeywords(keywords: string[]) {
        actual = keywords
        return Promise.resolve(['xx', 'a', 'b'])
      },
    },
  }, 'a', 'b')

  await cli.parse(argv)

  expect(actual).toEqual(['xx', 'a', 'b'])
})
