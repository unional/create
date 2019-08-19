import { Cli } from 'clibuilder'
import { pkg } from './pkg'

export const cli = new Cli({
  name: 'monorepo-scripts',
  version: pkg.version,
  commands: [],
  run() {
    console.info('monorepo-scripts executed')
  },
})
