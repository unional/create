---
'@unional/monorepo-scripts': patch
'@unional/devpkg-node': patch
---

Narrow the `clibuilder` dependency from `^6.5.1` to `~6.5.1`.

Both packages call `createCli` from clibuilder, and clibuilder 6.6.1 removed that
export — its `lib/index.d.ts` re-exports only `./errors` and `./parseArgv`, where
6.5.1 also exported `./create-cli`, `./create-plugin-cli` and `./presenter`. Under
the old caret range a fresh consumer install resolved 6.6.1 and the CLI threw at
startup.

The repository was not affected because a `pnpm-workspace.yaml` override pinned
6.5.1 locally, which is exactly why this went unnoticed: an override binds this
workspace only and never travels with the published package. The constraint now
lives in each package's own `dependencies`, and the redundant override is removed.
