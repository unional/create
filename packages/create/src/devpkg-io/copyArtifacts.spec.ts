import t from 'assert';
import a from 'assertron';
import fs from 'fs';
import { dirSync } from 'tmp';
import { copyArtifacts, FolderNotFoundInPackage, PackageNotFound } from '.';

test('not exist package throws PackageNotFound', async () => {
  const err = await a.throws(() => copyArtifacts('not-exist-package', 'something'), PackageNotFound)

  t.strictEqual(err.packageName, 'not-exist-package')
})

test.only('not exist directory throws FolderNotFoundInPackage', async () => {
  const err = await a.throws(() => copyArtifacts('@unional/devpkg-node', 'not-exist'), FolderNotFoundInPackage)

  t.strictEqual(err.packageName, '@unional/devpkg-node')
  t.strictEqual(err.folder, 'not-exist/artifacts')
})

test('copy files to cwd', async () => {
  const tmp = dirSync()
  await copyArtifacts('@unional/devpkg-node', 'simple', tmp.name)
  const dirs = fs.readdirSync(tmp.name)
  t(dirs.length > 0, 'cwd is empty')
})

test('_gitignore is renamed to .gitignore', async () => {
  const tmp = dirSync()
  await copyArtifacts('@unional/devpkg-node', 'simple', tmp.name)
  const dirs = fs.readdirSync(tmp.name)
  t.strictEqual(dirs.indexOf('_gitignore'), -1)
  t(dirs.indexOf('.gitignore') > 0)
})
