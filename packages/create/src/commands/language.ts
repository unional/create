import { Inquirer } from 'clibuilder';

export function chooseLanguage({ ui }: { ui: Inquirer }) {
  return ui.prompt([{
    name: 'language',
    message: `Language of the project`,
    choices: ['TypeScript', 'others'],
  }]).then(answers => answers.language)
}

export function askLanguage({ ui }: { ui: Inquirer }) {
  return ui.prompt([{
    name: 'language',
    message: `Please enter the lanuage you want to use`,
    validate: v => !!v,
  }]).then(answers => answers.language)
}
