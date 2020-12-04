#!/usr/bin/env node
import { createGame } from '../games/progression.js';
import { runGame } from '../src/index.js';

runGame(createGame()).catch(console.error);
