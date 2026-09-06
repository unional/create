import fs from 'node:fs'
import path from 'node:path'
import { initGitRepo } from '@unional/createutils'
import chalk from 'chalk'
import { createCli } from 'clibuilder'
import { assertPackageNameIsValid } from './checkProjectName.js'
import { CLI_NAME } from './constants.js'
import { pkg } from './pkg.js'

export const cli = createCli({
	name: CLI_NAME,
	version: pkg.version,
	description: '',
	arguments: [
		{
			name: 'project-name',
			required: true,
		},
	],
	async run(args) {
		try {
			const projectName = args['project-name']!
			assertPackageNameIsValid(projectName)
			const projectPath = path.resolve(projectName)

			this.ui.info(`Creating a new project in ${chalk.green(projectPath)}`)

			await initGitRepo(projectPath)
			createEmptyPackageJson(projectPath)
		} catch (e) {
			this.ui.error((e as Error).message)
		}
	},
})

function createEmptyPackageJson(projectPath: string) {
	fs.writeFileSync(path.join(projectPath, 'package.json'), '{}')
}
