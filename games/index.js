import {
  greet, askName, selectOption,
} from '../src/cli.js';

import * as gcd from './gcd.js';
import * as prime from './prime.js';
import * as even from './even.js';
import * as calc from './calc.js';
import * as progression from './progression.js';
import { runGame } from '../src/index.js';

const games = [
  ['Number parity', even.createGame],
  ['Calculations', calc.createGame],
  ['Greatest common divisor', gcd.createGame],
  ['Progression', progression.createGame],
  ['Prime numbers', prime.createGame],
];

export const pickGame = async () => {
  greet();
  const userName = await askName();
  const gameDefinition = await selectOption('Please pick a game to play.', games);
  await runGame(gameDefinition(), userName, true);
};

export default pickGame;
