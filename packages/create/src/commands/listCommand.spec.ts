import { setupCliCommandTest } from 'clibuilder';
import { listCommand } from './listCommand';

test('if config with devPkgKeyword, that will be used instead', async () => {
  let actual: string[] = []
  const { cmd, args, argv } = setupCliCommandTest(listCommand, [], { devpkgKeywords: ['xx'] }, {
    _dep: {
      findByKeywords(keywords: string[]) {
        actual = keywords
        return Promise.resolve([])
      },
    },
  })

  await cmd.run(args, argv)

  expect(actual).toEqual(['xx'])
})
