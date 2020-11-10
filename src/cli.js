import promptly from 'promptly';

export const prompt = (msg = 'Enter your answer: ') => promptly.prompt(msg);

export const greeting = async () => {
  const name = await prompt('May I have your name, please: ');
  console.info(`Hello ${name}`);
  return name;
};
