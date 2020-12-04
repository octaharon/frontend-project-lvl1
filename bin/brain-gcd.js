#!/usr/bin/env node
import { runGame } from '../src/index.js';
import { createGame } from '../games/gcd.js';

runGame(createGame()).catch(console.error);
