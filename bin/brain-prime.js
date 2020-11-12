#!/usr/bin/env node
import { createGame } from '../games/prime.js';
import { game } from '../src/index.js';

(async () => {
  await game(...createGame());
})().catch(console.error);
