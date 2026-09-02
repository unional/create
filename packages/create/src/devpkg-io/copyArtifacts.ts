import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { ncp } from 'ncp'
import { FolderNotFoundInPackage } from './errors'
import { tryResolve } from './tryResolve'

export function copyArtifacts(packageName: string, name: string, cwd = process.cwd()) {
	return copyFile(packageName, path.join(name, 'artifacts'), cwd)
}

const ncpp = promisify(ncp)
export async function copyFile(packageName: string, folder: string, destination: string) {
	const basePath = tryResolve(packageName)
	try {
		await ncpp(path.resolve(basePath, folder), destination)
		fs.renameSync(path.resolve(destination, '_gitignore'), path.resolve(destination, '.gitignore'))
	} catch (errors) {
		// ncpp throws an error array...
		const e = (errors as NodeJS.ErrnoException[])[0]
		if (e.code === 'ENOENT') {
			throw new FolderNotFoundInPackage(packageName, folder)
		}
		// istanbul ignore next
		throw errors
	}
}
