#!/usr/bin/env node
import { createGame } from '../src/games/prime.js';
import { runGame } from '../src/engine/index.js';

runGame(createGame()).catch(console.error);
