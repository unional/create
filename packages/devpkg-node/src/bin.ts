#!/usr/bin/env node
import updateNotifier from 'update-notifier';
import { cli } from './cli';
import { pkg } from './pkg';


updateNotifier({ pkg }).notify();

cli.parse(process.argv)
  .catch(err => {
    console.error(err)
  })
