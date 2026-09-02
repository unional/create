export function getGitRepositoryName(remote: string | undefined) {
	if (remote) {
		return getFromHttpUrl(remote) || getFromSshUrl(remote)
	}
	return undefined
}

function getFromHttpUrl(url: string) {
	// Anchored and with a bounded character class: the previous `(.*)` between two
	// unanchored literals backtracked polynomially (js/polynomial-redos).
	const match = /^https?:\/\/(?:github|gitlab)\.com\/([^\s]+?)\.git$/.exec(url)
	if (match) return match[1]
}

function getFromSshUrl(url: string) {
	// Anchored, and the host segment excludes `:` so it cannot overlap the path
	// segment — the unanchored `.*:` form was polynomial (js/polynomial-redos).
	const match = /^git@[^:\s]+:([^\s]+?)\.git$/.exec(url)
	if (match) return match[1]
}
