import { createCli } from 'clibuilder'
import { pkg } from './pkg'

export const cli = createCli({
  name: 'dev-scripts',
  version: pkg.version,
  commands: [],
})
