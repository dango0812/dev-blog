import sanitize from 'sanitize-html';

const ALLOWED_TAGS = [
  'p',
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
  'code',
  'pre',
  'blockquote',
  'img',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'br',
  'span',
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt', 'class'],
  code: ['class'],
  pre: ['class'],
  span: ['class'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
};

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
  return sanitize(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    transformTags: {
      a: (tagName: string, attribs: sanitize.Attributes) => ({
        tagName,
        attribs: {
          ...attribs,
          ...(attribs.target === '_blank' && { rel: 'noopener noreferrer' }),
        },
      }),
    },
  });
}
