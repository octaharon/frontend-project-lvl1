import { DEFAULT_QUESTIONS } from '../src/index.js';
import { generateRandomNumber, isEven } from '../src/utils.js';

const DEFAULT_MAX_NUMBER = 100;

export const gameIntro = 'Answer "yes" if the number is even, otherwise answer "no".';

/**
 * @param {Number} numQuestions amount of questions to create
 * @param {Number} maxNumber maximum value in question
 * @returns {Array<Array<string,string>>} An array of tuples [question, answer]
 */
export const createQuestions = (
  numQuestions,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const number = generateRandomNumber(0, maxNumber);
    const answerExpected = isEven(number) ? 'yes' : 'no';
    questions.push([number, answerExpected]);
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
