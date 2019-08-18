import cp from 'child_process'
import { isGitRepo } from './isGitRepo';

export function getRemote(cwd = process.cwd()) {
  if (!isGitRepo(cwd)) return undefined

  try {
    const remote = cp.execSync('git remote -v', { cwd }).toString()
    const match = /origin\s*(.*) \(fetch\)/.exec(remote)
    if (match) return match[1]
    return undefined
  }
  catch {
    return undefined
  }
}
