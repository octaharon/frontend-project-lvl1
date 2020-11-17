import { DEFAULT_QUESTIONS } from '../src/index.js';
import { coinToss, smoothValue, generateRandomNumber } from '../src/utils.js';

const DEFAULT_MAX_ANSWER = 50;

export const gameIntro = 'Find the greatest common divisor of given numbers.';

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
 * @param {Number} numQuestions amount of questions to create
 * @param {Number} maxNumber maximum possible common divisor
 * @returns {Array<Array<string,string>>} An array of tuples [question, answer]
 */
export const createQuestions = (
  numQuestions,
  maxNumber = DEFAULT_MAX_ANSWER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const gcd = generateRandomNumber(1, maxNumber);
    // the bigger the GCD is, the lesser values generated are, to reduce game difficulty
    // exponential smoothing is used to compensate for faster growth at bigger numbers
    const iterations = smoothValue(1 - gcd / maxNumber, 0, 2, 0.25);
    const [mult1, mult2] = generateCorpimeNumbers(iterations);
    const question = `${mult1 * gcd} ${mult2 * gcd}`;
    questions.push([question, gcd]);
  }
  return questions;
};

/**
 * @returns {Array<String,Array<String,String>>} Game [title,<question,answer>[]]
 */
export const createGame = () => [
  gameIntro,
  createQuestions(DEFAULT_QUESTIONS, DEFAULT_MAX_ANSWER),
];

export default createGame;
