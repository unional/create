---
'@unional/monorepo-scripts': patch
'@unional/createutils': patch
'@unional/devpkg-node': patch
---

Release through npm trusted publishing.

The release pipeline moved from lerna + a repo `NPM_TOKEN` to changesets publishing over GitHub OIDC, so these packages are published with provenance and no long-lived credential. `@unional/createutils` also stops shipping its own `*.spec.ts` files.
