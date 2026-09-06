#!/usr/bin/env node
import updateNotifier from 'update-notifier'
import { cli } from './cli.js'
import { pkg } from './pkg.js'

cli.parse(process.argv).catch((err) => {
	console.error(err)
})

updateNotifier({ pkg }).notify()
