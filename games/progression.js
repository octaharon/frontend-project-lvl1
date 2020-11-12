const DEFAULT_MAX_FIRST_VALUE = 20;
const DEFAULT_QUESTIONS = 3;
const DEFAULT_PROGRESSION_MAX_LENGTH = 10;
const DEFAULT_PROGRESSION_MIN_LENGTH = 5;

export const gameIntro = 'What number is missing in the progression?';

const generateProgression = (firstValue, delta, length = DEFAULT_PROGRESSION_MIN_LENGTH) => {
  if (!Number.isFinite(firstValue) || !Number.isFinite(delta) || !Number.isFinite(length) || length < 5) throw new Error('Can\'t generate progression with given settings');
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
    const firstValue = Math.round(
      Math.random() * 2 * maxNumber - maxNumber,
    );
    const progression = generateProgression(
      firstValue,
      Math.ceil(Math.random() * Math.abs(maxNumber)) * Math.sign(firstValue) * -1,
      Math.round(
        DEFAULT_PROGRESSION_MIN_LENGTH
          + Math.random() * (DEFAULT_PROGRESSION_MAX_LENGTH - DEFAULT_PROGRESSION_MIN_LENGTH),
      ),
    );
    const index = 1 + Math.floor(Math.random() * (progression.length - 2));
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
