import { setupCliCommandTest } from 'clibuilder';
import { searchCommand } from './searchCommand';

test('if config with devPkgKeywords, that will be used instead', async () => {
  let actual: string[] = []
  const { cmd, args, argv } = setupCliCommandTest(searchCommand, [], { devpkgKeywords: ['xx'] }, {
    _dep: {
      searchByKeywords(keywords: string[]) {
        actual = keywords
        return Promise.resolve([])
      },
    },
  })

  await cmd.run(args, argv)

  expect(actual).toEqual(['xx'])
})

test('can specify additional keywords to narrow result', async () => {
  let actual: string[] = []
  const { cmd, args, argv } = setupCliCommandTest(searchCommand, ['a', 'b'], { devpkgKeywords: ['xx'] }, {
    _dep: {
      searchByKeywords(keywords: string[]) {
        actual = keywords
        return Promise.resolve(['xx', 'a', 'b'])
      },
    },
  })

  await cmd.run(args, argv)

  expect(actual).toEqual(['xx', 'a', 'b'])
})
