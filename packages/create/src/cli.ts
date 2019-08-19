import { PluginCli } from 'clibuilder';
import { initCommand, listCommand, searchCommand } from './commands';
import { pkg } from './pkg';
import { UniConfig } from './types';
import { CLI_NAME } from './constants';

export const cli = new PluginCli<UniConfig>({
  name: CLI_NAME,
  version: pkg.version,
  defaultConfig: { devpkgKeywords: ['uni-devpkg'] },
  commands: [initCommand, listCommand, searchCommand],
})
