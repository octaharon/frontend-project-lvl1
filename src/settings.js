/* eslint-disable-next-line */
import path from 'path';
import url from 'url';

export const DEFAULT_QUESTIONS = 3;
export const WELCOME_MESSAGE = 'Welcome to the Brain Games!';

export const ROOT_PATH = path.resolve(
  path.dirname(
    url.fileURLToPath(import.meta.url),
  ),
  '..',
);

export default {
  DEFAULT_QUESTIONS,
  WELCOME_MESSAGE,
  ROOT_PATH,
};
