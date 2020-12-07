#!/usr/bin/env node
import { runGame } from '../src/engine/index.js';
import { createGame } from '../src/games/calc.js';

runGame(createGame()).catch(console.error);
