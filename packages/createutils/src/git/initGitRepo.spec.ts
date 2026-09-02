import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { dirSync } from 'tmp'
import { initGitRepo, isGitRepo } from '.'

const execp = promisify(exec)

test('init git repo', async () => {
	const tmp = dirSync()
	await initGitRepo(tmp.name)
	expect(isGitRepo(tmp.name)).toBe(true)
})

test('ok if alredy git repo', async () => {
	const tmp = dirSync()
	await execp('git init', { cwd: tmp.name })
	await initGitRepo(tmp.name)
})
