import t from 'assert'
import { getVersion } from './version';

test('get version from package.json', () => {
  const actual = getVersion()

  // in real code, it will get from the published package.json thus getting the real version number.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pjson = require('../package.json')
  t.strictEqual(actual, pjson.version)
})
