// I wish I could use an object here
const operators = ['+', '-', '*', 'mod'];
const operatorResolutions = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a % b,
];

const DEFAULT_MAX_NUMBER = 25;
const DEFAULT_QUESTIONS = 3;

export const gameIntro = 'What is the result of the expression?';

export const createQuestions = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => {
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const operand1 = Math.round(Math.random() * maxNumber);
    const operand2 = Math.round(Math.random() * maxNumber);
    const op = Math.floor(Math.random() * operators.length);
    const answerExpected = operatorResolutions[op](operand1, operand2);
    questions.push([`${operand1} ${operators[op]} ${operand2}`, answerExpected]);
  }
  return questions;
};

export const createGame = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_NUMBER,
) => [gameIntro, createQuestions(numQuestions, maxNumber)];

export default createGame;
