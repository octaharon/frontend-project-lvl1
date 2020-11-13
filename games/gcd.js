import { DEFAULT_QUESTIONS } from '../src/index.js';
import { coinToss, easingFunction, generateRandomNumber } from '../src/utils.js';

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

export const createQuestions = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_ANSWER,
) => {
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const gcd = generateRandomNumber(1, maxNumber);
    // the bigger the GCD is, the lesser values generated are, to reduce game difficulty
    // exponential smoothing is used to compensate for faster growth at bigger numbers
    const iterations = easingFunction(1 - gcd / maxNumber, 0, 2, 0.25);
    const [mult1, mult2] = generateCorpimeNumbers(iterations);
    questions.push([`${mult1 * gcd} ${mult2 * gcd}`, gcd]);
  }
  return questions;
};

export const createGame = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_ANSWER,
) => [gameIntro, createQuestions(numQuestions, maxNumber)];

export default createGame;
