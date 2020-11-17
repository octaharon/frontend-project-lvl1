#!/usr/bin/env node
import { createGame } from '../games/prime.js';
import { runGame } from '../src/index.js';

runGame(createGame()).catch(console.error);
