import promptly from 'promptly';

export const prompt = (msg) => promptly.prompt(msg);

export const message = (msg) => console.info(msg);

export const greet = () => message('Welcome to the Brain Games!');

export const askName = async () => {
  const name = await prompt('May I have your name, please: ');
  message(`Hello ${name}!`);
  return name;
};

/**
 * @typedef ChoiceOption
 * @type {[string,any]}
 * @property {string} 0 - option text
 * @property {any} 1 - option return value
 */
/**
 * @param {string} title - Choice description
 * @param {[ChoiceOption]} options - A list of tuples [message, return value]
 * @returns {Promise<*>}
 */
export const selectOption = async (title, options) => {
  if (!Array.isArray(options) || !options.length) throw new Error('Invalid option list provided');
  if (options.length === 1) return options[0];
  message(title);
  for (let i = 0; i < options.length; i += 1) message(`${i + 1}: ${options[i][0]}`);
  let choice = 0;
  while (choice <= 0) {
    choice = parseInt(await prompt(`Choose an option (1-${options.length})`), 10);
    if (!Number.isFinite(choice) || choice < 0 || choice > options.length) {
      message('Invalid option provided, please make another choice!');
      choice = 0;
    }
  }
  return options[choice - 1][1];
};
