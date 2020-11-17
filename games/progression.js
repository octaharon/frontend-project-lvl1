import { DEFAULT_QUESTIONS } from '../src/index.js';
import { coinToss, generateRandomNumber } from '../src/utils.js';

const DEFAULT_MAX_FIRST_VALUE = 20;
const DEFAULT_PROGRESSION_MAX_LENGTH = 10;
const DEFAULT_PROGRESSION_MIN_LENGTH = 5;
const MIN_FILLER_OFFSET = 1;

export const gameIntro = 'What number is missing in the progression?';

const generateProgression = (firstValue, delta, length = DEFAULT_PROGRESSION_MIN_LENGTH) => {
  if (!Number.isFinite(firstValue)
      || !Number.isFinite(delta)
      || !Number.isFinite(length) || length < DEFAULT_PROGRESSION_MIN_LENGTH) {
    throw new Error('Can\'t generate progression with given settings');
  }
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    arr[i] = firstValue + i * delta;
  }
  return arr;
};

/**
 * @param {Number} numQuestions amount of questions to create
 * @param {Number} maxNumber maximum value of a first progression member
 * @returns {Array<Array<string,string>>} An array of tuples [question, answer]
 */
export const createQuestions = (
  numQuestions,
  maxNumber = DEFAULT_MAX_FIRST_VALUE,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  const questions = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const firstValue = generateRandomNumber(-maxNumber, maxNumber);
    let deltaSign = Math.sign(firstValue) * -1;
    if (deltaSign === 0) deltaSign = coinToss() ? -1 : 1;
    const progression = generateProgression(
      firstValue,
      generateRandomNumber(1, Math.abs(maxNumber)) * deltaSign,
      generateRandomNumber(DEFAULT_PROGRESSION_MIN_LENGTH, DEFAULT_PROGRESSION_MAX_LENGTH),
    );
    const index = generateRandomNumber(
      MIN_FILLER_OFFSET,
      progression.length - 1 - MIN_FILLER_OFFSET,
    );
    const value = progression[index];
    progression[index] = '..';
    questions.push([progression.join(' '), value]);
  }
  return questions;
};

/**
 * @returns {Array<String,Array<String,String>>} Game [title,<question,answer>[]]
 */
export const createGame = () => [
  gameIntro,
  createQuestions(DEFAULT_QUESTIONS, DEFAULT_MAX_FIRST_VALUE),
];

export default createGame;
