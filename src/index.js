import { greeting, message, prompt } from './cli.js';

/**
 * @param question The current question
 * @param correctAnswer Expected answer
 * @returns {Promise<boolean>}
 */
export const challengePlayer = async (question, correctAnswer) => {
  message(`Question: ${question}`);
  const response = String(await prompt('Your answer: ')).toLowerCase().trim();
  if (response === String(correctAnswer)) {
    message('Correct!');
    return true;
  }
  message(`'${response}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
  return false;
};

/**
 * @param title Game assignment description
 * @param challengeList Array of tuples [question,correctAnswer]
 * @returns {Promise<boolean>} Whether a game was won
 */
export const game = async (title = '', challengeList = []) => {
  if (!Array.isArray(challengeList)) throw new Error('Empty challenge list set is provided for a game');
  const userName = await greeting();
  if (String(title).length) message(title);
  // eslint-disable-next-line no-restricted-syntax
  for (const challenge of challengeList) {
    if (!Array.isArray(challenge) || challenge.length !== 2) throw new Error(`Malformed challenge: ${JSON.stringify(challenge)}`);
    const result = await challengePlayer(challenge[0], challenge[1]);
    if (!result) {
      message(`Let's try again, ${userName}!`);
      return false;
    }
  }
  message(`Congratulations, ${userName}!`);
  return true;
};
