import readlineSync from 'readline-sync';
import { WELCOME_MESSAGE } from '../settings.js';

export const prompt = (msg) => readlineSync.question(msg);

export const message = (msg) => console.log(msg);

export const askName = async () => {
  const name = await prompt('May I have your name, please: ');
  message(`Hello ${name}!`);
  return name;
};
export const welcome = () => message(WELCOME_MESSAGE);

/**
 * @param {string} question - The question
 * @param {string} correctAnswer - Expected answer (lowercased)
 * @returns {Promise<boolean>}
 */
const challengePlayer = async (question, correctAnswer) => {
  message(`Question: ${question}`);
  let response = '';
  while (!response.length) {
    response = String(await prompt('Your answer: ')).toLowerCase().trim();
  }
  if (response === String(correctAnswer)) {
    message('Correct!');
    return true;
  }
  message(`'${response}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
  return false;
};

/**
 * @typedef Challenge
 * @type {Array}
 * @property {string} 0 - Question text
 * @property {string|number} 1 - Expected answer
 */

/**
 * Check if a challenge is correctly typed
 * @param {Challenge} challenge
 * @return {boolean}
 */
const validateChallenge = (challenge) => Array.isArray(challenge)
    && challenge.length === 2
    && (typeof challenge[0] === 'string')
    && ((typeof challenge[1] === 'string') || (typeof challenge[1] === 'number'));

/**
 * @typedef Game
 * @type {[string,Challenge[]]}
 * @property {string} 0 - Game assignment text
 * @property {[Challenge]} 1 - A list of questions and answers
 */

/**
 * @param {Game} game - A game definition [title,[question,answer][]]
 * @param {string|null} userName - String if not provided, it will be requested
 * @param {boolean} skipGreeting - whether to skip welcome message
 * @returns {Promise<boolean>} Whether a game was won
 */
export const runGame = async (game, userName = null, skipGreeting = false) => {
  const [title, challengeList] = game;
  if (
    !Array.isArray(challengeList)
      || !challengeList.length
      || !challengeList.every(validateChallenge)
  ) {
    throw new Error(`Invalid challenge set is provided for a game: ${JSON.stringify(challengeList)}`);
  }
  if (!skipGreeting) welcome();
  const uName = (userName !== null && typeof userName === 'string') ? userName : await askName();
  if (String(title).length) message(title);
  // eslint-disable-next-line no-restricted-syntax
  for (const challenge of challengeList) {
    const result = await challengePlayer(challenge[0], challenge[1]);
    if (!result) {
      message(`Let's try again, ${uName}!`);
      return false;
    }
  }
  message(`Congratulations, ${uName}!`);
  return true;
};
