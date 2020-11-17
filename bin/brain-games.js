#!/usr/bin/env node
import { pickGame } from '../games/index.js';

pickGame().catch(console.error);
