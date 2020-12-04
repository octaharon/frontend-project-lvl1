/**
 * Generate a random value between min and max
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number}
 */
export const generateRandomNumber = (min = 0, max = 1) => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return Math.random();
  return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * Toss a coin
 * @returns {boolean} 50/50 chance
 */
export const coinToss = () => Math.random() > 0.5;

/**
 * An exponential integer easing function
 * @param {number} t -  0<=t<=1
 * @param {number} min - f(0)
 * @param {number} max - f(1)
 * @param {number} power - smoothing exponent
 * @returns {number} a smoothed value 0<=f(t)<=1
 */
export const smoothValue = (
  t,
  min = 0,
  max = 1,
  power = 3,
) => Math.round(min + (max - min) * Math.max(0, Math.min(1, t)) ** power);
