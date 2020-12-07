import { DEFAULT_QUESTIONS } from '../settings.js';
import { generateRandomNumber } from '../utils.js';

const DEFAULT_MAX_NUMBER = 100;

const gameIntro = 'Answer "yes" if the number is even, otherwise answer "no".';
const gameName = 'Number Parity';

/**
 * Check whether the number is even or odd
 * @param {number} num - a value to check a parity off
 * @returns {boolean}
 */
const isEven = (num) => Number.isFinite(num) && num % 2 === 0;

/**
 * @param {Number} numQuestions - amount of questions to create
 * @param {Number} maxNumber - maximum value in question
 * @returns {Challenge[]} An array of tuples [question, answer]
 */
const createChallenges = (
  numQuestions,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const challenges = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const question = generateRandomNumber(0, maxNumber);
    const expectedAnswer = isEven(question) ? 'yes' : 'no';
    challenges.push([question.toString(), expectedAnswer]);
  }
  return challenges;
};

/**
 * @param {Number} numQuestions - amount of questions in a game
 * @returns {Game} Game definition [title, [question,answer][]]
 */
const createGame = (numQuestions = DEFAULT_QUESTIONS) => [
  gameIntro,
  createChallenges(numQuestions, DEFAULT_MAX_NUMBER),
];

export {
  createChallenges,
  createGame,
  gameIntro,
  gameName,
};
