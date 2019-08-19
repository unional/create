import t from 'assert';
import { getGitRepositoryName } from './getGitRepositoryName';

test('undefined remote gets undefined repo name', () => {
  t.strictEqual(getGitRepositoryName(undefined), undefined)
})

test('can get from https github url', () => {
  const actual = getGitRepositoryName('https://github.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from http github url', () => {
  const actual = getGitRepositoryName('http://github.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from https gitlab url', () => {
  const actual = getGitRepositoryName('https://gitlab.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from http gitlab url', () => {
  const actual = getGitRepositoryName('http://gitlab.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from ssh github url', () => {
  const actual = getGitRepositoryName('git@github.com:user/some-repo.git')
  t.strictEqual(actual, 'user/some-repo')
})


test('can get from ssh gitlab url', () => {
  const actual = getGitRepositoryName('git@gitlab.com:user/some-repo.git')
  t.strictEqual(actual, 'user/some-repo')
})
