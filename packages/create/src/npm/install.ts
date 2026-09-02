import cp from 'node:child_process'
import { promisify } from 'node:util'

const execp = promisify(cp.exec)

export function installDev(...packages: string[]): Promise<void> {
	// istanbul ignore next
	return execp(`npm i -D ${packages.join(' ')}`) as any
}
