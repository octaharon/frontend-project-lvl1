import { DEFAULT_QUESTIONS } from '../src/index.js';
import { generateRandomNumber, isEven } from '../src/utils.js';

const DEFAULT_MAX_NUMBER = 100;

export const gameIntro = 'Answer "yes" if the number is even, otherwise answer "no".';

export const createQuestions = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const number = generateRandomNumber(0, maxNumber);
    const answerExpected = isEven(number) ? 'yes' : 'no';
    questions.push([number, answerExpected]);
  }
  return questions;
};

export const createGame = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => [gameIntro, createQuestions(numQuestions, maxNumber)];

export default createGame;
