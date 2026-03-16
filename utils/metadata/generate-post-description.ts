/**
 * 게시글 내용을 기반으로 메타데이터용 설명을 생성합니다.
 *
 * @param content - 게시글 콘텐츠
 * @returns {string} HTML 태그가 있을경우 제거되고 150자로 제한된 설명 문자열
 *
 * @example
 * const postContent = "<p>이것은 <strong>게시글</strong> 내용입니다.</p>";
 * console.log(generatePostDescription(postContent)); // "이것은 게시글 내용입니다."
 */
export function generatePostDescription(content: string): string {
  return content.replace(/<[^>]*>/g, '').slice(0, 150);
}
