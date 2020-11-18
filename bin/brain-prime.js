#!/usr/bin/env node
import { runGame, getGame } from '../src/index.js';

runGame(getGame('prime')).catch(console.error);
