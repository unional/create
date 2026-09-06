---
'@unional/createutils': major
---

`@unional/createutils` is now ESM-only.

The package declares `"type": "module"` and ships a single `exports` map with no
`require` condition, so `require('@unional/createutils')` no longer resolves. The
dual CommonJS (`lib/`) and ESM (`libm/`) outputs are gone; there is one ESM build
in `lib/`, and `main`, `module`, `jsnext:main` and `typings` have been dropped in
favour of `exports` and `types`.

Migration:

- Import the package from an ESM module: `import { initGitRepo } from '@unional/createutils'`.
  Consumers should set `"type": "module"` in their own `package.json`, or use
  `.mjs`/`.mts` files.
- From a CommonJS module that cannot be converted, use a dynamic import:
  `const { initGitRepo } = await import('@unional/createutils')`.
- Deep imports into `libm/` must be repointed at `lib/`. Only the package root is
  exported, so paths outside the `exports` map are no longer reachable.
- TypeScript consumers need `"module"`/`"moduleResolution"` set to `node16`,
  `nodenext`, or `bundler`. Under a CommonJS compilation the import now fails with
  `TS1479`.
