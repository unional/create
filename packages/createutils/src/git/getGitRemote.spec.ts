import { getGitRemote } from './getGitRemote';
import t from 'assert'
import { dirSync } from 'tmp'
import cp from 'child_process'

test('Return the remote url', () => {
  const tmp = dirSync()
  cp.execSync('git init', { cwd: tmp.name })
  cp.execSync('git remote add origin https://github.com/unional/global-store.git', { cwd: tmp.name })
  const actual = getGitRemote(tmp.name)
  t(/unional\/global-store/.test(actual!))
})

test('return undefined if not a git repo', () => {
  const tmp = dirSync()
  const actual = getGitRemote(tmp.name)
  t.strictEqual(actual, undefined)
})

test('return undefined if no remote', () => {
  const tmp = dirSync()
  cp.execSync('git init', { cwd: tmp.name })
  const actual = getGitRemote(tmp.name)
  t.strictEqual(actual, undefined)
})
