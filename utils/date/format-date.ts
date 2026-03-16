import { isDate } from './is-date';
import { isValidDate } from './is-valid-date';

/**
 * 날짜를 지정된 형식의 문자열로 변환합니다.
 *
 * @param date - Date 객체 또는 날짜 문자열
 * @param separator - 연, 월, 일 사이의 구분자 (기본값: '.')
 * @returns {string} 포맷팅된 날짜 문자열 (유효하지 않으면 빈 문자열 반환)
 *
 * @example
 * console.log(formatDate(new Date('2024-01-01'))); // "2024.01.01"
 * console.log(formatDate('2024-01-01', '-')); // "2024-01-01"
 * console.log(formatDate('invalid-date')); // ""
 */
export function formatDate(date: Date | string, separator = '.'): string {
  // 입력값이 Date 객체가 아니면 변환 시도
  const targetDate = isDate(date) ? date : new Date(date);

  // 유효한 날짜인지 확인
  if (!isValidDate(targetDate)) {
    return '';
  }

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 2자리로 패딩
  const day = String(targetDate.getDate()).padStart(2, '0'); // 2자리로 패딩

  return `${year}${separator}${month}${separator}${day}`;
}
