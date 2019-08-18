import findup from 'find-up'

export function isGitRepo(cwd = process.cwd()) {
  return findup('.git', { cwd }).then(value => !!value)
}
