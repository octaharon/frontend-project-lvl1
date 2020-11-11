import promptly from 'promptly';

export const prompt = (msg = 'Enter your answer: ') => promptly.prompt(msg);

export const message = (msg = 'Welcome to the Brain Games!') => console.info(msg);

export const greeting = async () => {
  const name = await prompt('May I have your name, please: ');
  message(`Hello ${name}`);
  return name;
};
