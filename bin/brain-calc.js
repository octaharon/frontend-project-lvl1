#!/usr/bin/env node
import { game } from '../src/index.js';
import { createGame } from '../games/calc.js';

(async () => {
  await game(...createGame());
})().catch(console.error);
