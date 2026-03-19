/** 인증 쿠키 이름 */
export const AUTH_COOKIE_NAME = 'access_token';

/** 인증 오류 코드 */
export const AUTH_ERRORS = {
  OAUTH_DENIED: 'oauth_denied',
  UNAUTHORIZED: 'unauthorized',
  SERVER_ERROR: 'server_error',
} as const;

/** 인증 오류 메시지 */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  [AUTH_ERRORS.OAUTH_DENIED]: 'GitHub 로그인을 취소했어요.',
  [AUTH_ERRORS.UNAUTHORIZED]: '블로그 소유자 계정이 아니에요.',
  [AUTH_ERRORS.SERVER_ERROR]: '서버 오류가 발생했어요. 다시 시도해주세요.',
};
