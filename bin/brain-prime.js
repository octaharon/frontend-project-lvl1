#!/usr/bin/env node
import { game } from '../src/index.js';

// We gonna implement a certain sort of memoization to avoid excessive factorization of numbers
// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
const maxNumber = 150;

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

const primeIndex = fillSieve(maxNumber);

const isPrime = (n) => {
  if (!Number.isFinite(n) || n <= 1) return false;
  if (n < primeIndex.length) return primeIndex[n];
  const sqrt = Math.sqrt(n);
  // fallback mechanics for larger numbers
  for (let i = 2; i <= sqrt; i++) if (n % i === 0) return false;
  return true;
};

(async () => {
  const questions = [];
  for (let i = 0; i < 3; i += 1) {
    const value = Math.floor(Math.random() * (maxNumber - 1) + 1);
    const answer = isPrime(value) ? 'yes' : 'no';
    questions.push([value, answer]);
  }
  await game('Answer "yes" if given number is prime. Otherwise answer "no".', questions);
})().catch(console.error);
