import t from 'node:assert'
import { pkg } from '../pkg.js'
import { cli } from './cli.js'

test('cli name is "uni-create"', () => {
	t.strictEqual(cli.name, 'uni-create')
})

test('cli version is current version', () => {
	t.strictEqual(cli.version, pkg.version)
})
