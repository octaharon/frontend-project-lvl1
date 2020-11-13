/**
 * Check whether the number is even or odd
 * @param num
 * @returns {boolean|boolean}
 */
export const isEven = (num) => Number.isFinite(num) && num % 2 === 0;

/**
 * Generate a random value between min and max (inclusive)
 * @param min
 * @param max
 * @returns {number}
 */
export const generateRandomNumber = (min = 0, max = 1) => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return Math.random();
  return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * Return 50% true/false
 */
export const coinToss = () => Math.random() > 0.5;

/**
 * An exponential integer mapping function
 * @param t 0<=t<=1
 * @param min f(0)
 * @param max f(1)
 * @param power smoothing exponent
 * @returns {number}
 */
export const easingFunction = (
  t,
  min = 0,
  max = 1,
  power = 3,
) => Math.round(min + (max - min) * Math.max(0, Math.min(1, t)) ** power);
