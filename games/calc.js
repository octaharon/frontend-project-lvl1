import { DEFAULT_QUESTIONS } from '../src/settings.js';
import { generateRandomNumber } from '../src/utils.js';

const operations = [
  ['+', (a, b) => a + b],
  ['-', (a, b) => a - b],
  ['*', (a, b) => a * b],
//  ['mod', (a, b) => a % b],
];

const DEFAULT_MAX_NUMBER = 25;

const gameIntro = 'What is the result of the expression?';
const gameName = 'Calculations';

/**
 * @param {Number} numQuestions - amount of questions to create
 * @param {Number} maxNumber - maximum operand value
 * @returns {[Challenge]} An array of tuples [question, answer]
 */
const createChallenges = (
  numQuestions,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const operand1 = generateRandomNumber(0, maxNumber);
    const operand2 = generateRandomNumber(0, maxNumber);
    const operationIndex = generateRandomNumber(0, operations.length - 1);
    const [operator, operatorFunction] = operations[operationIndex];
    const expectedAnswer = operatorFunction(operand1, operand2);
    const question = `${operand1} ${operator} ${operand2}`;
    questions.push([question, expectedAnswer]);
  }
  return questions;
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
  gameIntro,
  gameName,
};
