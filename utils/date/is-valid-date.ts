/**
 * 유효한 날짜 값을 가진 Date 객체인지 확인합니다.
 *
 * @param date - 확인할 Date 객체
 * @returns {boolean} 유효한 날짜 여부
 *
 * @example
 * console.log(isValidDate(new Date())); // true
 * console.log(isValidDate(new Date('invalid-date'))); // false
 */
export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}
