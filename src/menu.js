/**
 * @typedef ChoiceOption
 * @type {[string,any]}
 * @property {string} 0 - option text
 * @property {any} 1 - option return value
 */

import { loadGames } from './gamesLoader.js';
import {
  message, welcome, prompt, askName, runGame,
} from './index.js';
import { DEFAULT_QUESTIONS } from './settings.js';

/**
 * @param {string} title - Choice description
 * @param {[ChoiceOption]} options - A list of tuples [message, return value]
 * @returns {Promise<*>}
 */
const selectOption = async (title, options) => {
  if (!Array.isArray(options) || !options.length) throw new Error('Invalid option list provided');
  if (options.length === 1) return options[0];
  message(title);
  for (let i = 0; i < options.length; i += 1) message(`${i + 1}: ${options[i][0]}`);
  let choice = 0;
  while (choice <= 0) {
    choice = parseInt(await prompt(`Choose an option (1-${options.length}): `), 10);
    if (!Number.isFinite(choice) || choice < 0 || choice > options.length) {
      message('Invalid option provided, please make another choice!');
      choice = 0;
    }
  }
  return options[choice - 1][1];
};

const pickGame = async () => {
  welcome();
  const userName = await askName();
  const gamesList = await loadGames();
  const gameDefinition = await selectOption(
    'Please pick a game to play.',
    gamesList,
  );
  await runGame(gameDefinition(DEFAULT_QUESTIONS), userName, true);
};

export default pickGame;
