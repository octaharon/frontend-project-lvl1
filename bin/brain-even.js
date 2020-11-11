#!/usr/bin/env node
import { greeting, message, prompt } from '../src/cli.js';

console.info('Welcome to the Brain Games!');

(async () => {
  const userName = await greeting();
  message('Answer "yes" if the number is even, otherwise answer "no".');
  let answers = 0;
  for (let question = 0; question < 3; question += 1) {
    const number = Math.round(Math.random() * 100);
    const isEven = number % 2 === 0;
    const answerExpected = isEven ? 'yes' : 'no';
    message(`Question: ${number}`);
    const response = String(await prompt('Your answer: ')).toLowerCase().trim();
    if (response === answerExpected) {
      answers += 1;
      message('Correct!');
    } else {
      message(`'${response}' is wrong answer ;(. Correct answer was '${answerExpected}'.`);
      message(`Let's try again, ${userName}!`);
      break;
    }
  }
  if (answers === 3) message(`Congratulations, ${userName}!`);
})().catch(console.error);
