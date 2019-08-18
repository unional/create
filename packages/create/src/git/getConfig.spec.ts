import t from 'assert';
import { exec } from 'child_process';
import { dirSync } from 'tmp';
import { promisify } from 'util';
import { getConfig } from './getConfig';

const execp = promisify(exec)
test('result is free of newline', async () => {
  const tmp = dirSync()
  const cwd = tmp.name
  await execp('git init', { cwd })
  await execp('git config --add user.name "abc\n"', { cwd })
  const actual = getConfig('user.name', tmp.name)
  t.strictEqual(actual, 'abc')
})
