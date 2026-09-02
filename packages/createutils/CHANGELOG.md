# @unional/createutils

## 1.1.4

### Patch Changes

- 8c5f489: Fix two CodeQL findings in the git helpers.
  
  `getGitConfig` built its command as a template string and ran it through a shell,
  so the `key` argument reached the shell unescaped
  (`js/shell-command-constructed-from-input`). It now uses `execFileSync` with an
  argument array, which never involves a shell.
  
  `getGitRepositoryName` used two unanchored regexes whose `.*` groups backtracked
  polynomially on hostile input (`js/polynomial-redos`). Both are now anchored with
  bounded character classes. Recognized remote URLs parse the same way.
- 0a1b238: Rebuild with TypeScript 7. The emitted output changes: the CJS build now targets
  ES2022 under `module: node16` instead of downlevelling to ES5, and the ESM build
  targets ES2022 as well. `target: es5` and `moduleResolution: node10` were both
  removed in TypeScript 7, so the previous settings no longer compile.
  
  No public API changes, and the published file list is unchanged.

## 1.1.3

### Patch Changes

- 17b668c: Release through npm trusted publishing.
  
  The release pipeline moved from lerna + a repo `NPM_TOKEN` to changesets publishing over GitHub OIDC, so these packages are published with provenance and no long-lived credential. `@unional/createutils` also stops shipping its own `*.spec.ts` files.

## 1.1.2 (2021-02-12)

**Note:** Version bump only for package @unional/createutils





## 1.1.1 (2021-02-12)

**Note:** Version bump only for package @unional/createutils





# 1.1.0 (2021-02-12)


### Bug Fixes

* add .yarnrc ([524418d](https://github.com/unional/create/commit/524418d3eecafa25858c285ec3236434e1c8f0de))


### Features

* add createutils project ([c2b85eb](https://github.com/unional/create/commit/c2b85eb387a4b1d98747ec389d5da82b2e653251))
* rename git functions ([97a1a13](https://github.com/unional/create/commit/97a1a13262e0af2b4bb5d90cbfe69f57bf53e15e))
