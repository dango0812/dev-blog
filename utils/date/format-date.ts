import { isDate } from './is-date';
import { isValidDate } from './is-valid-date';

/** 날짜를 파싱하여 연, 월, 일 정보를 추출합니다. */
const parseDate = (date: Date | string): { year: number; month: string; day: string } | null => {
  const parsedDate = isDate(date) ? date : new Date(date);
  if (!isValidDate(parsedDate)) {
    return null;
  }

  return {
    year: parsedDate.getFullYear(),
    month: String(parsedDate.getMonth() + 1).padStart(2, '0'), // 월은 0부터 시작하므로 +1, 2자리로 패딩
    day: String(parsedDate.getDate()).padStart(2, '0'), // 2자리로 패딩
  };
};

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
  const parsed = parseDate(date);
  if (!parsed) {
    return '';
  }

  const { year, month, day } = parsed;
  return `${year}${separator}${month}${separator}${day}`;
}

/**
 *
 *날짜를 한국어 형식의 문자열로 변환합니다.
 *
 * @param date - Date 객체 또는 날짜 문자열
 * @returns {string} 포맷팅된 날짜 문자열 (유효하지 않으면 빈 문자열 반환)
 *
 * @example
 * console.log(formatDateKor(new Date('2024-01-01'))); // "2024년 01월 01일"
 * console.log(formatDateKor('2024-01-01')); // "2024년 01월 01일"
 * console.log(formatDateKor('invalid-date')); // ""
 */
export function formatDateKor(date: Date | string): string {
  const parsed = parseDate(date);
  if (!parsed) {
    return '';
  }

  const { year, month, day } = parsed;
  return `${year}년 ${month}월 ${day}일`;
}
