/* istanbul ignore file */
import { getGitConfig, getGitRemote, getGitRepositoryName, isGitRepo } from '@unional/createutils'
import { createPluginCommand, PromptPresenter } from 'clibuilder'
import Enquirer from 'enquirer'
import { copyArtifacts } from '../devpkg-io'
import { initializeFolder } from '../io'
import { installDev } from '../npm'

export const initCommand = createPluginCommand({
  name: 'init',
  description: 'setup an existing repository',
  options: {
    string: {
      name: {
        description: 'The NPM package name',
      },
      repo: {
        description: 'The github repository name including organization (e.g. user/repo)',
      },
    },
  },
  context: {
    copyArtifacts,
    getInputs,
    initializeFolder,
    installDev
  },
  async run(args) {
    const inputs = await this.getInputs(this, args as any)

    this.ui.info('Initializing folder...')
    await this.initializeFolder(inputs)

    this.ui.info('Installing @unional/devpkg-node assertron...')
    await this.installDev('@unional/devpkg-node', 'assertron')

    this.ui.info('Copying files...')
    await this.copyArtifacts('@unional/devpkg-node', 'simple')

    this.ui.info(`Ready!`)
    this.ui.info(``)
    this.ui.info(`Remember to:`)
    this.ui.info(`  update your package description in package.json and README.md`)
    this.ui.info(`  configure Github setting and branch protection`)
    this.ui.info(`  enable project in CircleCI, Codecov, Greenkeeper`)
    this.ui.info(`  optionaly Travis, Coveralls, and Codacy`)
    this.ui.info(`  for Codacy code coverage, add CODACY_PROJECT_TOKEN to Travis env`)
  },
})

async function getInputs({ ui }: { ui: PromptPresenter }, args: { name?: string, repo?: string }) {
  const inputs: any = { year: new Date().getFullYear() }
  const questions: Enquirer.prompt.Question[] = []
  if (args.name) {
    inputs.name = args.name
  }
  else {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'The NPM package name',
    })
  }
  if (args.repo) {
    inputs.repo = args.repo
  }
  else {
    inputs.isGitRepo = isGitRepo()
    if (inputs.isGitRepo) {
      const repo = inputs.repository = getGitRepositoryName(getGitRemote())
      if (!repo) {
        inputs.noRemote = true
      }
    }
    if (!inputs.isGitRepo || inputs.noRemote) {
      questions.push({
        name: 'host',
        type: 'select',
        choices: [
          { name: 'GitHub', value: 'github.com' },
          { name: 'GitLab', value: 'gitlab.com' },
        ],
        message: 'Select hosting service',
      })
      questions.push({
        type: 'input',
        name: 'repository',
        message: 'The repository name including organization (e.g. user/repo)',
      })
    }
  }

  const gitUsername = inputs.gitUsername = getGitConfig('user.name')
  if (!gitUsername) {
    questions.push({
      type: 'input',
      name: 'gitUsername',
      message: 'Your git username',
    })
  }
  const gitEmail = inputs.gitEmail = getGitConfig('user.email')
  if (!gitEmail) {
    questions.push({
      type: 'input',
      name: 'gitEmail',
      message: 'Your git email',
    })
  }
  if (questions.length === 0) return inputs
  const answers = await ui.prompt(questions)
  return { ...inputs, ...answers }
}
