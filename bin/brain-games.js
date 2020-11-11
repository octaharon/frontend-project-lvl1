#!/usr/bin/env node
import { greeting, message } from '../src/cli.js';

message();
greeting().catch(console.error);
