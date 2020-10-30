import { createCli } from 'clibuilder'
import { pkg } from './pkg'

export const cli = createCli({
  name: Object.keys(pkg.bin)[0],
  version: pkg.version,
  commands: [],
  run(args, argv) {
    this.ui.info(`cwd`, process.cwd())
    this.ui.info('args', args)
    this.ui.info('argv', argv)
    this.ui.showHelp(this)
  },
})
