#!/usr/bin/env node
import { greet, askName } from '../src/cli.js';

greet();
askName().catch(console.error);
