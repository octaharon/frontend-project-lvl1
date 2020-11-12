const DEFAULT_MAX_ANSWER = 50;
const DEFAULT_QUESTIONS = 3;

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
  let pair = Math.random() > 0.5 ? [3, 1] : [2, 1];
  if (!Number.isFinite(iterations) || iterations <= 1) return pair;
  for (let i = 0; i < iterations; i += 1) {
    const branch = coprimeBranches[Math.floor(Math.random() * coprimeBranches.length)];
    pair = branch(pair[0], pair[1]);
  }
  return Math.random() > 0.5 ? pair : pair.reverse();
};

export const createQuestions = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_ANSWER,
) => {
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const gcd = Math.ceil(Math.random() * maxNumber);
    // the bigger the GCD is, the lesser values generated are, to reduce game difficulty
    const iterations = Math.round((1 - gcd / maxNumber) * 2 + 1);
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
