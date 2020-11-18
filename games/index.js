import * as gcd from './gcd.js';
import * as prime from './prime.js';
import * as even from './even.js';
import * as calc from './calc.js';
import * as progression from './progression.js';

/**
 * @type {Object.<string,ChoiceOption>}
 */
export const games = {
  even: ['Number parity', even.createGame],
  calc: ['Calculations', calc.createGame],
  gcd: ['Greatest common divisor', gcd.createGame],
  progression: ['Arithmetic Progression', progression.createGame],
  prime: ['Prime numbers', prime.createGame],
};

export const getGameGenerator = (gameId) => {
  if (!Object.keys(games).includes(gameId)) throw new Error("Can't find game named `gameId`");
  return games[gameId][1];
};

export default games;
