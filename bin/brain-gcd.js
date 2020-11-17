#!/usr/bin/env node
import { createGame } from '../games/gcd.js';
import { runGame } from '../src/index.js';

runGame(createGame()).catch(console.error);
