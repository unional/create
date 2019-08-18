import { Cli } from 'clibuilder'
import { pkg } from './pkg'

export const cli = new Cli({
  name: 'dev-scripts',
  version: pkg.version,
  commands: [],
})
