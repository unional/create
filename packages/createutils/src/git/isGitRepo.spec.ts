import t from 'node:assert'
import { exec } from 'node:child_process'
import { mkdir } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { dirSync } from 'tmp'
import { isGitRepo } from '.'

const execp = promisify(exec)
const mkdirp = promisify(mkdir)

test('true if is git repo', async () => {
	const tmp = dirSync()
	await execp('git init', { cwd: tmp.name })
	t.strictEqual(isGitRepo(tmp.name), true)
})

test('true if in sub-folder of a git repo', async () => {
	const tmp = dirSync()
	await execp('git init', { cwd: tmp.name })
	const cwd = path.resolve(tmp.name, 'inner')
	await mkdirp(cwd)
	t.strictEqual(isGitRepo(cwd), true)
})

test('false if not a git repo', async () => {
	const tmp = dirSync()
	t.strictEqual(isGitRepo(tmp.name), false)
})
