#!/usr/bin/env node
import { greeting } from '../src/cli.js';

console.info('Welcome to the Brain Games!');
/*
 * "Cannot use keyword 'await' outside an async function"
 * seems to be outdated, as top-level await works perfectly as of NodeJS 14
 *
 * So let's make it an abomination to fulfil that rule
*/
(async () => {
  const userName = await greeting(); // eslint-disable-line
})();
