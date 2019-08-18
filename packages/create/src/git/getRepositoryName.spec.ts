import t from 'assert';
import { getRepositoryName } from './getRepositoryName';

test('undefined remote gets undefined repo name', () => {
  t.strictEqual(getRepositoryName(undefined), undefined)
})

test('can get from https github url', () => {
  const actual = getRepositoryName('https://github.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from http github url', () => {
  const actual = getRepositoryName('http://github.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from https gitlab url', () => {
  const actual = getRepositoryName('https://gitlab.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from http gitlab url', () => {
  const actual = getRepositoryName('http://gitlab.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('can get from ssh github url', () => {
  const actual = getRepositoryName('git@github.com:user/some-repo.git')
  t.strictEqual(actual, 'user/some-repo')
})


test('can get from ssh gitlab url', () => {
  const actual = getRepositoryName('git@gitlab.com:user/some-repo.git')
  t.strictEqual(actual, 'user/some-repo')
})
