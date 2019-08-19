import cp from 'child_process'

export function getGitConfig(key: string, cwd = process.cwd()) {
  return cp.execSync(`git config ${key}`, { cwd }).toString().trim()
}
