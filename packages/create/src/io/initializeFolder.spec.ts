import { getGitRemote, isGitRepo } from '@unional/createutils';
import t from 'assert';
import fs from 'fs';
import path from 'path';
import { dirSync } from 'tmp';
import { initializeFolder } from '.';

test('copy LICENSE', async () => {
  const tmp = dirSync()
  await initializeFolder({ year: 1234, gitUsername: 'unional', gitEmail: 'abc@def.com', isGitRepo: true }, tmp.name)
  const actual = fs.readFileSync(path.resolve(tmp.name, 'LICENSE'), 'utf-8')
  t(actual.indexOf(`Copyright (c) 1234 unional (abc@def.com)`) > 0)
})

test('copy package.json', async () => {
  const tmp = dirSync()
  await initializeFolder({ name: 'dummy', repository: 'user/dummy', gitUsername: 'unional', gitEmail: 'abc@def.com', isGitRepo: true }, tmp.name)
  const actual = fs.readFileSync(path.resolve(tmp.name, 'package.json'), 'utf-8')
  t(actual.indexOf(`"name": "dummy"`) > 0)
  t(actual.indexOf(`"homepage": "https://github.com/user/dummy"`) > 0)
  t(actual.indexOf(`"url": "https://github.com/user/dummy/issues"`) > 0)
  t(actual.indexOf(`"url": "https://github.com/user/dummy.git"`) > 0)
  t(actual.indexOf(`"name": "unional"`) > 0)
  t(actual.indexOf(`"email": "abc@def.com"`) > 0)
})

test('copy README.md', async () => {
  const tmp = dirSync()
  await initializeFolder({ name: 'dummy-pkg', repository: 'user/dummy', isGitRepo: true }, tmp.name)
  const actual = fs.readFileSync(path.resolve(tmp.name, 'README.md'), 'utf-8')
  t(actual.indexOf(`# dummy-pkg`) === 0)
  t(actual.indexOf(`Description for \`dummy-pkg\``) > 0)
  t(actual.indexOf(`https://circleci.com/gh/user/dummy/tree/master.svg?style=shield`) > 0)
})

test('will do git init if the repo is not a git repo', async () => {
  const tmp = dirSync()
  await initializeFolder({ isGitRepo: false }, tmp.name)
  t.strictEqual(await isGitRepo(tmp.name), true)
})

test('will add remote if input.noRemote is true', async () => {
  const tmp = dirSync()
  await initializeFolder({ repository: 'user/dummy', noRemote: true }, tmp.name)
  const remote = getGitRemote(tmp.name)
  t(/user\/dummy/.test(remote!))
})
