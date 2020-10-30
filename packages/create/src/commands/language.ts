import { PromptPresenter } from 'clibuilder';

export function chooseLanguage({ ui }: { ui: PromptPresenter }) {
  return ui.prompt([{
    type: 'select',
    name: 'language',
    message: `Language of the project`,
    choices: ['TypeScript', 'others'],
  }]).then(answers => answers.language)
}

export function askLanguage({ ui }: { ui: PromptPresenter }) {
  return ui.prompt([{
    type: 'input',
    name: 'language',
    message: `Please enter the lanuage you want to use`,
    validate: v => !!v,
  }]).then(answers => answers.language)
}
