// eslint-disable-next-line @typescript-eslint/no-var-requires
export const pkg = require('../package.json');
export const CLI_NAME = Object.keys(pkg.bin)[0]
export const version = pkg.version
