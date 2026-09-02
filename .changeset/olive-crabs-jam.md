---
'@unional/createutils': patch
---

Fix two CodeQL findings in the git helpers.

`getGitConfig` built its command as a template string and ran it through a shell,
so the `key` argument reached the shell unescaped
(`js/shell-command-constructed-from-input`). It now uses `execFileSync` with an
argument array, which never involves a shell.

`getGitRepositoryName` used two unanchored regexes whose `.*` groups backtracked
polynomially on hostile input (`js/polynomial-redos`). Both are now anchored with
bounded character classes. Recognized remote URLs parse the same way.
