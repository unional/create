import cp from 'child_process';
import { promisify } from 'util';
const execp = promisify(cp.exec)

export function installDev(...packages: string[]): Promise<void> {
  // istanbul ignore next
  return execp(`npm i -D ${packages.join(' ')}`) as any
}
