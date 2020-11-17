import { DEFAULT_QUESTIONS } from '../src/index.js';
import { generateRandomNumber } from '../src/utils.js';

const DEFAULT_MAX_NUMBER = 150;

export const gameIntro = 'Answer "yes" if given number is prime. Otherwise answer "no".';

// We gonna implement a certain sort of memoization to avoid excessive factorization of numbers
// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

const fillSieve = (maxIndex) => {
  if (!Number.isFinite(maxIndex) || maxIndex < 1) return false;
  const arr = new Array(maxIndex + 1).fill(1);
  const sqrt = Math.sqrt(maxIndex);
  arr[0] = 0;
  arr[1] = 0;
  for (let i = 2; i <= sqrt; i += 1) {
    if (arr[i] === 1) {
      for (let j = i * i; j <= maxIndex; j += i) arr[j] = 0;
    }
  }
  return arr;
};

const isPrime = (n) => {
  if (!Number.isFinite(n) || n <= 1) return false;
  if (!Array.isArray(isPrime.primeIndex) || isPrime.primeIndex.length < DEFAULT_MAX_NUMBER) {
    isPrime.primeIndex = fillSieve(DEFAULT_MAX_NUMBER);
  }
  if (n < isPrime.primeIndex.length) return isPrime.primeIndex[n];
  const sqrt = Math.sqrt(n);
  // fallback mechanics for larger numbers
  for (let i = 2; i <= sqrt; i += 1) if (n % i === 0) return false;
  return true;
};

/**
 * @param {Number} numQuestions amount of questions to create
 * @param {Number} maxNumber maximum generated number in question
 * @returns {Array<Array<string,string>>} An array of tuples [question, answer]
 */
export const createQuestions = (
  numQuestions,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const value = generateRandomNumber(1, maxNumber);
    const answer = isPrime(value) ? 'yes' : 'no';
    questions.push([value, answer]);
  }
  return questions;
};

/**
 * @returns {Array<String,Array<String,String>>} Game [title,<question,answer>[]]
 */
export const createGame = () => [
  gameIntro,
  createQuestions(DEFAULT_QUESTIONS, DEFAULT_MAX_NUMBER),
];

export default createGame;
