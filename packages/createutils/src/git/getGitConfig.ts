import cp from 'node:child_process'

export function getGitConfig(key: string, cwd = process.cwd()) {
	// execFileSync, not execSync: `key` reached a shell unescaped
	// (js/shell-command-constructed-from-input).
	return cp.execFileSync('git', ['config', key], { cwd }).toString().trim()
}
