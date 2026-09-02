import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { isGitRepo } from './isGitRepo'

const execp = promisify(exec)

export async function initGitRepo(cwd: string) {
	if (isGitRepo(cwd)) return

	return execp('git init', { cwd })
}
