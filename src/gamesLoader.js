import fs from 'fs';
import path from 'path';
import url from 'url';
import { ROOT_PATH } from './settings.js';

const gamesPath = path.resolve(ROOT_PATH, 'games/');
/**
 * lazy load all game modules and provide their constructors
 * @return {[ChoiceOption]}
 */
export const loadGames = async () => {
  // load and cache all games on first call
  if (!loadGames.gamesCache) loadGames.gamesCache = [];
  if (!loadGames.gamesCache.length) {
    const gameModules = fs
      .readdirSync(gamesPath)
      .filter((filename) => filename.endsWith('.js'))
      .map((filename) => path.join(gamesPath, filename));
    for (let i = 0; i < gameModules.length; i += 1) {
      const moduleSpecifier = url.pathToFileURL(gameModules[i]);
      try {
        const { createGame, gameName } = await import(moduleSpecifier);
        loadGames.gamesCache.push([gameName, createGame]);
      } catch (e) {
        console.error(`Error while loading game module ${moduleSpecifier}: ${e.message}`);
      }
    }
    loadGames.gamesCache.sort((game1, game2) => {
      const [gameName1] = game1;
      const [gameName2] = game2;
      return gameName1.localeCompare(gameName2);
    });
  }
  return loadGames.gamesCache;
};

/**
 * Get a game constructor by their name
 *
 * @param {string} gameName An exported `gameName` constant from the relevant game module
 * @return {function}
 */
export const getGameFactory = async (gameName) => {
  const games = await loadGames();
  for (let i = 0; i < games.length; i += 1) {
    const [originalName, gameFactory] = games[i];
    if (originalName === gameName) return gameFactory;
  }
  throw new Error(`Can't find game named ${gameName}`);
};

export default getGameFactory;
