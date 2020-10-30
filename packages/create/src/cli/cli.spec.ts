import t from 'assert'
import { pkg } from '../pkg'
import { cli } from './cli'

test('cli name is "uni-create"', () => {
  t.strictEqual(cli.name, 'uni-create')
})

test('cli version is current version', () => {
  t.strictEqual(cli.version, pkg.version)
})
