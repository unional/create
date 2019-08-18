import { PluginCli } from 'clibuilder';
import { initCommand, listCommand, searchCommand } from './commands';
import { CLI_NAME } from './constants';
import { UniConfig } from './types';
import { getVersion } from './version';

export const cli = new PluginCli<UniConfig>({
  name: CLI_NAME,
  version: getVersion(),
  defaultConfig: { devpkgKeywords: ['uni-devpkg'] },
  commands: [initCommand, listCommand, searchCommand],
})
