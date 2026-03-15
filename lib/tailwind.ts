import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * CSS 클래스 이름을 병합합니다.
 *
 * 여러 개의 클래스 이름, 배열, 조건부 객체를 입력받아 하나의 문자열로 병합합니다.
 *
 * 내부적으로 `clsx`와 `tailwind-merge`를 함께 사용하여 Tailwind CSS 클래스 충돌을 자동으로 해결합니다.
 *
 * @param {...ClassValue[]} inputs - 병합할 클래스 이름, 배열, 또는 조건부 객체
 * @returns {string} 병합된 Tailwind CSS 클래스 문자열
 *
 * @example
 * console.log(cn("text-base", "bg-white")) // "text-base bg-white"
 *
 * @example
 * console.log(cn("text-base", ["bg-white", "rounded-lg"])) // "text-base bg-white rounded-lg"
 *
 * @example
 *
 * const isAuthenticated = true;
 * cn("text-base", ["bg-white", "rounded-lg"], { hidden: !isAuthenticated, block: isAuthenticated });
 * // "text-base bg-white rounded-lg block"
 *
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
