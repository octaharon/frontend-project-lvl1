import readlineSync from 'readline-sync';

export default async () => {
  console.log('Welcome to the Brain Games!');
  const name = await readlineSync.question('May I have your name, please: ');
  console.log(`Hello ${name}!`);
};
