import path from 'node:path'
import { PackageNotFound } from './errors'

export function tryResolve(packageName: string) {
	try {
		const indexPath = require.resolve(packageName, { paths: [process.cwd()] })
		return path.dirname(indexPath)
	} catch (e) {
		// Node reports this as MODULE_NOT_FOUND / "Cannot find module". The old test
		// for "Cannot resolve module" never matched any Node version.
		if ((e as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
			throw new PackageNotFound(packageName)
		}
		// istanbul ignore next
		throw e
	}
}
