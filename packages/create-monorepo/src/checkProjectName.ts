import validatePackageName from 'validate-npm-package-name'
import { InvalidPackageName } from './errors.js'

export function assertPackageNameIsValid(packageName: string) {
	const { validForNewPackages, errors = [], warnings = [] } = validatePackageName(packageName)
	if (!validForNewPackages) {
		throw new InvalidPackageName(packageName, [...errors, ...warnings])
	}
}
