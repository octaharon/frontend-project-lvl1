#!/usr/bin/env node
import {greeting} from "../src/cli.js";

console.info("Welcome to the Brain Games!");
const userName = await greeting();
