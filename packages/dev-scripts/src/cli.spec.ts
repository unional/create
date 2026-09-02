import { cli } from './cli'

test('version matches package verion', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const pkg = require('../package.json')
	expect(cli.version).toBe(pkg.version)
})
