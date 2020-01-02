import { dirSync } from 'tmp';
import { initGitRepo, isGitRepo } from '.';
import { exec } from 'child_process';
import { promisify } from 'util';

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
