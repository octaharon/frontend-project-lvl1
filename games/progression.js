import { DEFAULT_QUESTIONS } from '../src/settings.js';
import { coinToss, generateRandomNumber } from '../src/utils.js';

const DEFAULT_MAX_FIRST_VALUE = 20;
const MAX_DELTA = 10;
const PROGRESSION_MAX_LENGTH = 10;
const PROGRESSION_MIN_LENGTH = 5;
const MIN_FILLER_OFFSET = 1;
const REPLACEMENT_STRING = '..';

const gameIntro = 'What number is missing in the progression?';
const gameName = 'Arithmetic Progression';

/**
 * Generates {length} members of an arithmetic progression,
 * starting with {firstValue} and {delta} common difference
 * @param {number} firstValue starting member of a progression
 * @param {number} delta common difference
 * @param {number} length amount of members to generate
 * @returns {[]}
 */
const generateProgression = (firstValue, delta, length) => {
  if (!Number.isFinite(firstValue)
      || !Number.isFinite(delta)
      || !Number.isFinite(length) || length < PROGRESSION_MIN_LENGTH) {
    throw new Error('Can\'t generate progression with given settings');
  }
  const progression = [];
  for (let i = 0; i < length; i += 1) {
    progression[i] = firstValue + i * delta;
  }
  return progression;
};

/**
 * Generate a random adjusted sequence for a challenge
 * @param maxFirstElement - maximum absolute value to seed a first element from
 * @param maxDelta - maximum absolute value of a progression step to seed from
 * @return {*[]}
 */
const generateSequence = (
  maxFirstElement = DEFAULT_MAX_FIRST_VALUE,
  maxDelta = MAX_DELTA,
) => {
  const isAscending = coinToss();
  const hasPositiveFirstMember = coinToss();
  const firstValue = generateRandomNumber(1, maxFirstElement) * (hasPositiveFirstMember ? 1 : -1);
  const deltaValue = generateRandomNumber(1, maxDelta) * (isAscending ? 1 : -1);
  const length = generateRandomNumber(
    PROGRESSION_MIN_LENGTH,
    PROGRESSION_MAX_LENGTH,
  );
  return generateProgression(firstValue, deltaValue, length);
};

/**
 * @param {Number} numQuestions - amount of questions to create
 * @param {Number} maxNumber - absolute maximum value of the first progression member
 * @returns {[Challenge]} An array of tuples [question, answer]
 */
const createChallenges = (
  numQuestions,
  maxNumber = DEFAULT_MAX_FIRST_VALUE,
) => {
  if (!Number.isFinite(numQuestions) || numQuestions <= 0) throw new Error('Questions count should be a positive integer');
  if (!Number.isFinite(maxNumber) || maxNumber < 1) throw new Error('Progression scale should be 1 or greater');
  const challenges = [];
  for (let i = 0; i < numQuestions; i += 1) {
    const numberScaleFactor = maxNumber / DEFAULT_MAX_FIRST_VALUE;
    const progression = generateSequence(maxNumber, numberScaleFactor * MAX_DELTA);
    const replacementIndex = generateRandomNumber(
      MIN_FILLER_OFFSET,
      progression.length - 1 - MIN_FILLER_OFFSET,
    );
    const expectedAnswer = progression[replacementIndex];
    progression[replacementIndex] = REPLACEMENT_STRING;
    const question = progression.join(' ');
    challenges.push([question, expectedAnswer]);
  }
  return challenges;
};

/**
 * @param {Number} numQuestions - amount of questions in a game
 * @returns {Game} Game definition [title, [question,answer][]]
 */
const createGame = (numQuestions = DEFAULT_QUESTIONS) => [
  gameIntro,
  createChallenges(numQuestions, DEFAULT_MAX_FIRST_VALUE),
];

export {
  createChallenges,
  createGame,
  gameIntro,
  gameName,
};
