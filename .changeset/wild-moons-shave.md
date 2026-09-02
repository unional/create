---
'@unional/monorepo-scripts': patch
'@unional/createutils': patch
'@unional/devpkg-node': patch
---

Rebuild with TypeScript 7. The emitted output changes: the CJS build now targets
ES2022 under `module: node16` instead of downlevelling to ES5, and the ESM build
targets ES2022 as well. `target: es5` and `moduleResolution: node10` were both
removed in TypeScript 7, so the previous settings no longer compile.

No public API changes, and the published file list is unchanged.
