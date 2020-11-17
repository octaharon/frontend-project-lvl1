#!/usr/bin/env node
import { stubGame } from '../src/cli.js';

stubGame().catch(console.error);
