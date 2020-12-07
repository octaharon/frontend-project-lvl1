import { DEFAULT_QUESTIONS } from '../settings.js';
import { generateRandomNumber } from '../utils.js';

const DEFAULT_MAX_NUMBER = 150;

const gameIntro = 'Answer "yes" if given number is prime. Otherwise answer "no".';
const gameName = 'Prime numbers';

// We gonna implement a certain sort of memoization to avoid excessive factorization of numbers
// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

const fillSieve = (maxIndex) => {
  if (!Number.isFinite(maxIndex) || maxIndex < 1) return false;
  const sequence = new Array(maxIndex + 1).fill(1);
  const sqrt = Math.sqrt(maxIndex);
  sequence[0] = 0;
  sequence[1] = 0;
  for (let i = 2; i <= sqrt; i += 1) {
    if (sequence[i] === 1) {
      for (let j = i * i; j <= maxIndex; j += i) sequence[j] = 0;
    }
  }
  return sequence;
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
 * @param {Number} numQuestions - amount of questions to create
 * @param {Number} maxNumber - maximum generated number in question
 * @returns {[Challenge]} An array of tuples [question, answer]
 */
const createChallenges = (
  numQuestions,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const challenges = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const question = generateRandomNumber(1, maxNumber);
    const expectedAnswer = isPrime(question) ? 'yes' : 'no';
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
  createGame,
  createChallenges,
  gameName,
  gameIntro,
};
