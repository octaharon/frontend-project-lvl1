#!/usr/bin/env node
import { createGame } from '../games/progression.js';
import { game } from '../src/index.js';

(async () => {
  await game(...createGame());
})().catch(console.error);
