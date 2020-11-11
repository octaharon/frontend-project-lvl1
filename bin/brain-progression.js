#!/usr/bin/env node
import { game } from '../src/index.js';

const generateProgression = (firstValue, delta, length = 5) => {
  if (!Number.isFinite(firstValue) || !Number.isFinite(delta) || !Number.isFinite(length) || length < 5) throw new Error('Can\'t generate progression with given settings');
  let value = firstValue;
  const arr = [value];
  for (let i = 1; i < length; i += 1) {
    value += delta;
    arr.push(value);
  }
  return arr;
};

(async () => {
  const questions = [];
  for (let i = 0; i < 3; i += 1) {
    const firstValue = Math.round(Math.random() * 40 - 20);
    const progression = generateProgression(
      firstValue,
      Math.ceil(Math.random() * 7) * Math.sign(firstValue) * -1,
      Math.round(5 + Math.random() * 6),
    );
    const index = 1 + Math.floor(Math.random() * (progression.length - 2));
    const value = progression[index];
    progression[index] = '..';
    questions.push([progression.join(' '), value]);
  }
  await game('What number is missing in the progression?', questions);
})().catch(console.error);
