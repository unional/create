# @unional/monorepo-scripts

## 0.1.4

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

## 0.1.3

### Patch Changes

- 17b668c: Release through npm trusted publishing.
  
  The release pipeline moved from lerna + a repo `NPM_TOKEN` to changesets publishing over GitHub OIDC, so these packages are published with provenance and no long-lived credential. `@unional/createutils` also stops shipping its own `*.spec.ts` files.

## 0.1.2 (2021-02-12)

**Note:** Version bump only for package @unional/monorepo-scripts





## 0.1.1 (2021-02-12)

**Note:** Version bump only for package @unional/monorepo-scripts





# 0.1.0 (2021-02-12)


### Bug Fixes

* add .yarnrc ([524418d](https://github.com/unional/create/commit/524418d3eecafa25858c285ec3236434e1c8f0de))
* eslint and depcheck ([cac3842](https://github.com/unional/create/commit/cac38423520cbc43d485ebedba10e6d611cb6d4a))
* improve eslint pattern ([ff09a3b](https://github.com/unional/create/commit/ff09a3bf317bf437667f1e540b1ede82e88153b5))
* rename dc to depcheck ([ce32064](https://github.com/unional/create/commit/ce32064cd37afc38f88905fea0a02dd9ec1e61f6))
* update deps ([eddf8c3](https://github.com/unional/create/commit/eddf8c32bf798ab900e01fa727710b6693804e74))


### Features

* add monorepo-scripts package ([4c7b58c](https://github.com/unional/create/commit/4c7b58c8e0b31ad63d09fbee865941c6c4233492))
* add singlerepo-scripts ([879e590](https://github.com/unional/create/commit/879e59011a009fcb62cce5297d602ff11e4717c9))
