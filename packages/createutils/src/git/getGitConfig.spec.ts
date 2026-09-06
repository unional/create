import t from 'node:assert'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { dirSync } from 'tmp'
import { getGitConfig } from './index.js'

const execp = promisify(exec)
test('result is free of newline', async () => {
	const tmp = dirSync()
	const cwd = tmp.name
	await execp('git init', { cwd })
	await execp('git config --add user.name "abc\n"', { cwd })
	const actual = getGitConfig('user.name', tmp.name)
	t.strictEqual(actual, 'abc')
})
