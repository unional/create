import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const pkg = require('../package.json')
export const CLI_NAME = Object.keys(pkg.bin)[0]
export const version = pkg.version
