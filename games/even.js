const DEFAULT_MAX_NUMBER = 100;
const DEFAULT_QUESTIONS = 3;

export const gameIntro = 'Answer "yes" if the number is even, otherwise answer "no".';

export const createQuestions = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const number = Math.round(Math.random() * maxNumber);
    const isEven = number % 2 === 0;
    const answerExpected = isEven ? 'yes' : 'no';
    questions.push([number, answerExpected]);
  }
  return questions;
};

export const createGame = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => [gameIntro, createQuestions(numQuestions, maxNumber)];

export default createGame;
