import { DEFAULT_QUESTIONS } from '../src/index.js';
import { generateRandomNumber } from '../src/utils.js';

const operators = [
  ['+', (a, b) => a + b],
  ['-', (a, b) => a - b],
  ['*', (a, b) => a * b],
  ['mod', (a, b) => a % b],
];

const DEFAULT_MAX_NUMBER = 25;

export const gameIntro = 'What is the result of the expression?';

/**
 * @param {Number} numQuestions amount of questions to create
 * @param {Number} maxNumber maximum operand value
 * @returns {Array<Array<string,string>>} An array of tuples [question, answer]
 */
export const createQuestions = (
  numQuestions,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const operand1 = generateRandomNumber(0, maxNumber);
    const operand2 = generateRandomNumber(0, maxNumber);
    const op = generateRandomNumber(0, operators.length - 1);
    const answerExpected = operators[op][1](operand1, operand2);
    const question = `${operand1} ${operators[op][0]} ${operand2}`;
    questions.push([question, answerExpected]);
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
