import { createCli } from 'clibuilder'
import { pkg } from './pkg'

export const cli = createCli({
  name: 'uni-dev-scripts',
  version: pkg.version,
  config: { keywords: [] as string[] },
  commands: []
})
