import path from 'node:path'
import { PackageNotFound } from './errors'

export function tryResolve(packageName: string) {
	try {
		const indexPath = require.resolve(packageName, { paths: [process.cwd()] })
		return path.dirname(indexPath)
	} catch (e) {
		if (/Cannot resolve module/.test((e as Error).message)) {
			throw new PackageNotFound(packageName)
		}
		// istanbul ignore next
		throw e
	}
}
