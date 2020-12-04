import { DEFAULT_QUESTIONS } from '../src/settings.js';
import { coinToss, smoothValue, generateRandomNumber } from '../src/utils.js';

const DEFAULT_MAX_ANSWER = 50;

const gameIntro = 'Find the greatest common divisor of given numbers.';
const gameName = 'Greatest Common Divisor';

/**
 * instead of a factorization of random numbers we gonna generate random coprime pairs instead
 * this evens out the distribution of answers throughout the number spectrum
 * https://en.wikipedia.org/wiki/Coprime_integers#Generating_all_coprime_pairs
 */

const coprimeBranches = [
  (a, b) => [2 * a - b, a],
  (a, b) => [2 * a + b, a],
  (a, b) => [2 * b + a, b],
];

const generateCorpimeNumbers = (iterations = 3) => {
  let pair = coinToss() ? [3, 1] : [2, 1];
  if (!Number.isFinite(iterations) || iterations <= 1) return pair;
  for (let i = 0; i < iterations; i += 1) {
    const branch = coprimeBranches[generateRandomNumber(0, coprimeBranches.length - 1)];
    pair = branch(pair[0], pair[1]);
  }
  // since by design first number is always greater than the second
  return coinToss() ? pair : pair.reverse();
};

/**
 * @param {Number} numQuestions - amount of questions to create
 * @param {Number} maxNumber - maximum possible common divisor
 * @returns {[Challenge]} An array of tuples [question, answer]
 */
const createChallenges = (
  numQuestions,
  maxNumber = DEFAULT_MAX_ANSWER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const challenges = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const expectedAnswer = generateRandomNumber(1, maxNumber);
    // the bigger the GCD is, the lesser values generated are, to reduce game difficulty
    // exponential smoothing is used to compensate for faster growth at bigger numbers
    const iterations = smoothValue(1 - expectedAnswer / maxNumber, 0, 2, 0.25);
    const [multiplier1, multiplier2] = generateCorpimeNumbers(iterations);
    const question = `${multiplier1 * expectedAnswer} ${multiplier2 * expectedAnswer}`;
    challenges.push([question, expectedAnswer]);
  }
  return challenges;
};

/**
 * @param {Number} numQuestions - amount of questions in a game
 * @returns {Game} Game definition [title, [question,answer][]]
 */
const createGame = (numQuestions = DEFAULT_QUESTIONS) => [
  gameIntro,
  createChallenges(numQuestions, DEFAULT_MAX_ANSWER),
];

export {
  createGame,
  createChallenges,
  gameIntro,
  gameName,
};
