/* istanbul ignore file */
import { CliCommand, Inquirer } from 'clibuilder';
import { unpartial } from 'unpartial';
import { copyArtifacts } from '../devpkg-io';
import { getRemote, getRepositoryName, isGitRepo } from '../git';
import { getConfig } from '../git/getConfig';
import { initializeFolder } from '../io';
import { installDev } from '../npm';
import { UniConfig } from '../types';
import inquirer = require('inquirer');

export const initCommand: CliCommand<UniConfig, {
  _dep: {
    copyArtifacts: typeof copyArtifacts,
    getInputs(args: any): Promise<object>,
    initializeFolder: typeof initializeFolder,
    installDev: typeof installDev,
  },
}> = {
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
  async run(args) {
    const dep = unpartial({
      copyArtifacts,
      getInputs,
      initializeFolder,
      installDev,
    }, this.context._dep)

    const inputs = await dep.getInputs(this, args as any)

    this.ui.info('Initializing folder...')
    await dep.initializeFolder(inputs)

    this.ui.info('Installing @unional/devpkg-node assertron...')
    await dep.installDev('@unional/devpkg-node', 'assertron')

    this.ui.info('Copying files...')
    await dep.copyArtifacts('@unional/devpkg-node', 'simple')

    this.ui.info(`Ready!`)
    this.ui.info(``)
    this.ui.info(`Remember to:`)
    this.ui.info(`  update your package description in package.json and README.md`)
    this.ui.info(`  configure Github setting and branch protection`)
    this.ui.info(`  enable project in CircleCI, Codecov, Greenkeeper`)
    this.ui.info(`  optionaly Travis, Coveralls, and Codacy`)
    this.ui.info(`  for Codacy code coverage, add CODACY_PROJECT_TOKEN to Travis env`)
  },
}

async function getInputs({ ui }: { ui: Inquirer }, args: { name?: string, repo?: string }) {
  const inputs: any = { year: new Date().getFullYear() }
  const questions: inquirer.QuestionCollection[] = []
  if (args.name) {
    inputs.name = args.name
  }
  else {
    questions.push({
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
      const repo = inputs.repository = getRepositoryName(getRemote())
      if (!repo) {
        inputs.noRemote = true
      }
    }
    if (!inputs.isGitRepo || inputs.noRemote) {
      questions.push({
        name: 'host',
        type: 'list',
        choices: [
          { name: 'GitHub', value: 'github.com' },
          { name: 'GitLab', value: 'gitlab.com' },
        ],
        message: 'Select hosting service',
      })
      questions.push({
        name: 'repository',
        message: 'The repository name including organization (e.g. user/repo)',
      })
    }
  }

  const gitUsername = inputs.gitUsername = getConfig('user.name')
  if (!gitUsername) {
    questions.push({
      name: 'gitUsername',
      message: 'Your git username',
    })
  }
  const gitEmail = inputs.gitEmail = getConfig('user.email')
  if (!gitEmail) {
    questions.push({
      name: 'gitEmail',
      message: 'Your git email',
    })
  }
  if (questions.length === 0) return inputs
  const answers = await ui.prompt(questions)
  return { ...inputs, ...answers }
}
