#!/usr/bin/env node
import { runGame } from '../src/index.js';
import { createGame } from '../games/calc.js';

runGame(createGame()).catch(console.error);
