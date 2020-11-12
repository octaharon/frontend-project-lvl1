#!/usr/bin/env node
import { game } from '../src/index.js';

// I wish I could use an object here
const operators = ['+', '-', '*', 'mod'];
const operatorResolutions = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a % b,
];
(async () => {
  const questions = [];
  for (let i = 0; i < 3; i += 1) {
    const operand1 = Math.round(Math.random() * 20);
    const operand2 = Math.round(Math.random() * 20);
    const op = Math.floor(Math.random() * operators.length);
    const answerExpected = operatorResolutions[op](operand1, operand2);
    questions.push([`${operand1} ${operators[op]} ${operand2}`, answerExpected]);
  }
  await game('What is the result of the expression?', questions);
})().catch(console.error);
