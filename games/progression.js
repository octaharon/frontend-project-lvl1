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
  let value = firstValue;
  const arr = [value];
  for (let i = 1; i < length; i += 1) {
    value += delta;
    arr.push(value);
  }
  return arr;
};

export const createQuestions = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_FIRST_VALUE,
) => {
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

export const createGame = (
  numQuestions = DEFAULT_QUESTIONS,
  maxNumber = DEFAULT_MAX_FIRST_VALUE,
) => [gameIntro, createQuestions(numQuestions, maxNumber)];

export default createGame;
