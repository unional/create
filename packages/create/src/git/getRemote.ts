import cp from 'child_process'

export function getRemote(cwd = process.cwd()) {
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
