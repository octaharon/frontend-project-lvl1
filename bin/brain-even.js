#!/usr/bin/env node
import { createGame } from '../games/even.js';
import { runGame } from '../src/index.js';

runGame(createGame()).catch(console.error);
