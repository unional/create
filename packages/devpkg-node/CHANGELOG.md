# @unional/devpkg-node

## 1.6.4

### Patch Changes

- bad2bc7: Narrow the `clibuilder` dependency from `^6.5.1` to `~6.5.1`.
  
  Both packages call `createCli` from clibuilder, and clibuilder 6.6.1 removed that
  export — its `lib/index.d.ts` re-exports only `./errors` and `./parseArgv`, where
  6.5.1 also exported `./create-cli`, `./create-plugin-cli` and `./presenter`. Under
  the old caret range a fresh consumer install resolved 6.6.1 and the CLI threw at
  startup.
  
  The repository was not affected because a `pnpm-workspace.yaml` override pinned
  6.5.1 locally, which is exactly why this went unnoticed: an override binds this
  workspace only and never travels with the published package. The constraint now
  lives in each package's own `dependencies`, and the redundant override is removed.
- 0a1b238: Rebuild with TypeScript 7. The emitted output changes: the CJS build now targets
  ES2022 under `module: node16` instead of downlevelling to ES5, and the ESM build
  targets ES2022 as well. `target: es5` and `moduleResolution: node10` were both
  removed in TypeScript 7, so the previous settings no longer compile.
  
  No public API changes, and the published file list is unchanged.

## 1.6.3

### Patch Changes

- 17b668c: Release through npm trusted publishing.
  
  The release pipeline moved from lerna + a repo `NPM_TOKEN` to changesets publishing over GitHub OIDC, so these packages are published with provenance and no long-lived credential. `@unional/createutils` also stops shipping its own `*.spec.ts` files.

## 1.6.2 (2021-02-12)

**Note:** Version bump only for package @unional/devpkg-node





## 1.6.1 (2021-02-12)

**Note:** Version bump only for package @unional/devpkg-node





# [1.6.0](https://github.com/unional/create/compare/@unional/devpkg-node@1.2.3...@unional/devpkg-node@1.6.0) (2021-02-12)


### Bug Fixes

* isGitRepo ([e9022a0](https://github.com/unional/create/commit/e9022a03d7b60e2b77c55465caf24926e6530186))
* renaem uni-cli to create ([3243725](https://github.com/unional/create/commit/3243725e7870e914514109cbad9f92df65e5dc99))
* update deps ([eddf8c3](https://github.com/unional/create/commit/eddf8c32bf798ab900e01fa727710b6693804e74))
* update to use eslint ([7ccbb66](https://github.com/unional/create/commit/7ccbb662707f3ed4a4376540c0a7fcdda07c2c06))


### Features

* **devpkg-node:** upgrade jest ([7db4ef3](https://github.com/unional/create/commit/7db4ef3a4a9533e6e10141759d4602bcf32264a1))
* add monorepo-scripts package ([4c7b58c](https://github.com/unional/create/commit/4c7b58c8e0b31ad63d09fbee865941c6c4233492))
* rename devpkg-monorepo to create-monorepo ([f7f4624](https://github.com/unional/create/commit/f7f4624c76f2b818c50f6bcf37dead6b3be39081))
* rename uni-cli to create ([486af35](https://github.com/unional/create/commit/486af35111fd79a586b5df57549bf3c9a87ab1c3))



## 1.3.2 (2019-07-13)


### Bug Fixes

* add collectCoverageFrom to jest on CI ([da98263](https://github.com/unional/create/commit/da98263beb93e9c96041899b73e7c40fb85ead32))



## 1.3.1 (2019-07-13)


### Bug Fixes

* **devpkg-node:** disable ts diagnostics in CI build ([b7e44e2](https://github.com/unional/create/commit/b7e44e25b020a6ae7c8ee8c226110c1fdecb5e98))



# 1.3.0 (2019-05-12)


### Features

* **devpkg-node:** add jest-watch-typeahead ([91c9600](https://github.com/unional/create/commit/91c9600633dc494cbe6faac40294f2a1665e5c3a))



## 1.2.5 (2019-02-27)


### Bug Fixes

* **devpkg-node:** update dep ([22fca6a](https://github.com/unional/create/commit/22fca6a7a137a9c574c9ebcee8d000980c85119c))



## 1.2.4 (2019-02-16)


### Bug Fixes

* **node:** update jest ([5ab8c27](https://github.com/unional/create/commit/5ab8c27ae08f47c64ff07c1e82026a97f72558bc))
