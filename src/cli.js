import readlineSync from 'readline-sync';

const prompt = (msg) => readlineSync.question(msg);

const message = (msg) => console.log(msg);

const greet = () => message('Welcome to the Brain Games!');

const askName = async () => {
  const name = await prompt('May I have your name, please: ');
  message(`Hello ${name}!`);
  return name;
};

export default () => {
  greet();
  return askName();
};
