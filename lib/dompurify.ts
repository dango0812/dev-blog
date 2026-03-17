import DOMPurify from 'isomorphic-dompurify';

/**
 * HTML 문자열을 sanitize 하여 XSS 공격을 방지합니다.
 * 허용된 태그와 속성만 남기고 나머지는 제거합니다.
 *
 * @param html - sanitize할 HTML 문자열
 * @returns {string} sanitize된 HTML 문자열
 *
 * @example
 * const dirtyHtml = '<p>Hello <script>alert("XSS")</script> World!</p>';
 * console.log(sanitizeHtml(dirtyHtml)); // '<p>Hello  World!</p>'
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p',
      'span',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'strong',
      'em',
      's',
      'code',
      'pre',
      'blockquote',
      'img',
      'iframe',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target', 'rel', 'frameborder', 'allowfullscreen', 'allow'],
  });
}
