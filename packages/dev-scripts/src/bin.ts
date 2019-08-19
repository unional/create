#!/usr/bin/env node
import updateNotifier from 'update-notifier';
import {cli} from './cli';
import { pkg } from './pkg';

// istanbul ignore file
updateNotifier({ pkg }).notify();

cli.parse(process.argv)
  .catch((err: any) => {
    console.error(err)
  })
