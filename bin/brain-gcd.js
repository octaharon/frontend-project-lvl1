#!/usr/bin/env node
import { runGame } from '../src/engine/index.js';
import { createGame } from '../src/games/gcd.js';

runGame(createGame()).catch(console.error);
