import a from 'assertron';
import { InMemoryPresenter } from 'clibuilder';
import { ListQuestion, InputQuestion } from 'inquirer';
import { has } from 'satisfier';
import { chooseLanguage, askLanguage } from './language';

describe('chooseLanguage()', () => {
  test('by default supports TypeScript', async () => {
    let actual: ListQuestion
    const ui = new InMemoryPresenter({ name: 'm' }, {
      'language': (q: ListQuestion) => actual = q,
    })

    await chooseLanguage({ ui })
    a.satisfies(actual!.choices, has('TypeScript'))
  })

  test('return the choosen language', async () => {
    const ui = new InMemoryPresenter({ name: 'm' }, { 'language': 'TypeScript' })

    expect(await chooseLanguage({ ui })).toBe('TypeScript')
  })
})

describe('askLanguage()', () => {
  test('ask for language', async () => {
    const ui = new InMemoryPresenter({ name: 'm' }, { 'language': 'Python' })

    expect(await askLanguage({ ui })).toBe('Python')
  })

  test('answer cannot be empty', async () => {
    const ui = new InMemoryPresenter(
      { name: 'm' },
      {
        'language': (q: InputQuestion) => expect(q.validate!('')).toBe(false),
      })

    await askLanguage({ ui })
  })
})
