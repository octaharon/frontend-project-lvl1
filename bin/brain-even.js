#!/usr/bin/env node
import { game } from '../src/index.js';

(async () => {
  const questions = [];
  for (let i = 0; i < 3; i += 1) {
    const number = Math.round(Math.random() * 100);
    const isEven = number % 2 === 0;
    const answerExpected = isEven ? 'yes' : 'no';
    questions.push([number, answerExpected]);
  }
  await game('Answer "yes" if the number is even, otherwise answer "no".', questions);
})().catch(console.error);
