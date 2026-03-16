/**
 * 값이 Date 객체인지 확인합니다.
 *
 * @param value - 확인할 값
 * @returns {boolean} Date 객체 여부
 *
 * @example
 * console.log(isDate(new Date())); // true
 * console.log(isDate('2024-01-01')); // false
 */

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}
