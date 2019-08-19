import findup from 'find-up'

export function isGitRepo(cwd = process.cwd()) {
  return !!findup.sync('.git', { cwd, type: 'directory' })
}
