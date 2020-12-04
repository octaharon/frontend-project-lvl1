#!/usr/bin/env node
import stubGame from '../src/cli.js';
import pickGame from '../src/menu.js';

const runningMode = process.env.BRAIN_GAMES_MODE || 'default';
switch (runningMode) {
  case 'menu':
    pickGame().catch(console.error);
    break;
  default:
    stubGame().catch(console.error);
}
