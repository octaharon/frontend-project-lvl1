#!/usr/bin/env node
import { game } from '../src/index.js';

/**
 * instead of a factorization of random numbers we gonna generate random coprime pairs instead
 * and multiply them by GCD, which makes combinations a little bit more challenging
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

const maxGCD = 50;

(async () => {
  const questions = [];
  for (let i = 0; i < 3; i += 1) {
    const gcd = Math.ceil(Math.random() * maxGCD);
    // the bigger the GCD is, the lesser values generated are, to reduce game difficulty
    const iterations = Math.round((1 - gcd / maxGCD) * 2 + 1);
    const [mult1, mult2] = generateCorpimeNumbers(iterations);
    questions.push([`${mult1 * gcd} ${mult2 * gcd}`, gcd]);
  }
  await game('Find the greatest common divisor of given numbers.', questions);
})().catch(console.error);
