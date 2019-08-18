import cp from 'child_process'

export function getConfig(key: string, cwd = process.cwd()) {
  return cp.execSync(`git config ${key}`, { cwd }).toString().trim()
}
