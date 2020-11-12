const DEFAULT_MAX_NUMBER = 150;
const DEFAULT_QUESTIONS = 3;

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

let primeIndex = null;

const isPrime = (n) => {
  if (!Number.isFinite(n) || n <= 1) return false;
  if (n < primeIndex.length) return primeIndex[n];
  const sqrt = Math.sqrt(n);
  // fallback mechanics for larger numbers
  for (let i = 2; i <= sqrt; i += 1) if (n % i === 0) return false;
  return true;
};

export const createQuestions = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  if (!Array.isArray(primeIndex) || primeIndex.length < maxNumber) {
    primeIndex = fillSieve(maxNumber);
  }
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const value = Math.floor(Math.random() * (maxNumber - 1) + 1);
    const answer = isPrime(value) ? 'yes' : 'no';
    questions.push([value, answer]);
  }
  return questions;
};

export const createGame = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => [gameIntro, createQuestions(numQuestions, maxNumber)];

export default createGame;
