// 상세 규격 문서 참고 : https://schema.org/WebSite
import { GITHUB_URL, SITE_CONFIG } from '@/constants';
import { env } from '@/lib/env';

const BASE_URL = env.NEXT_PUBLIC_APP_URL;

/**
 * @description 사이트의 최상위 정보(WebSite)를 정의하는 구조화 데이터 객체를 생성합니다.
 * @returns {object} WebSite 타입의 JSON-LD 객체
 * @example
 * const websiteSchema = getWebSiteSchema();
 * <SchemaScript schema={websiteSchema} />
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    // 사이트 내 검색창이 있는 경우 (구글 검색결과에 검색창 노출 유도)
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/tag?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    // 사이트의 공식 SNS 계정 등 외부 링크
    sameAs: [GITHUB_URL],
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: BASE_URL,
    },
    inLanguage: 'ko-KR',
  } as const;
}
