#!/usr/bin/env node
import updateNotifier from 'update-notifier'
import { cli } from './cli/index.js'
import { pkg } from './pkg.js'

updateNotifier({ pkg }).notify()

cli.parse(process.argv).catch((err) => console.error(err))
