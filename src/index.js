import {
  greet, askName, message, prompt,
} from './cli.js';

export const DEFAULT_QUESTIONS = 3;

/**
 * @param question The current question
 * @param correctAnswer Expected answer (lowercased)
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
 * @param {Array<String,Array<String,String>>} game [title,<question,answer>[]]
 * @param {String} userName String if not provided, it will be requested
 * @param {Boolean} skipGreeting whether to skip welcome message
 * @returns {Promise<boolean>} Whether a game was won
 */
export const runGame = async (game, userName = null, skipGreeting = false) => {
  const [title, challengeList] = game;
  if (!Array.isArray(challengeList) || !challengeList.length) throw new Error('Invalid challenge set is provided for a game');
  if (!skipGreeting) greet();
  const uName = typeof userName === 'string' ? userName : await askName();
  if (String(title).length) message(title);
  // eslint-disable-next-line no-restricted-syntax
  for (const challenge of challengeList) {
    if (!Array.isArray(challenge) || challenge.length !== 2) throw new Error(`Malformed challenge: ${JSON.stringify(challenge)}`);
    const result = await challengePlayer(challenge[0], challenge[1]);
    if (!result) {
      message(`Let's try again, ${uName}!`);
      return false;
    }
  }
  message(`Congratulations, ${uName}!`);
  return true;
};
