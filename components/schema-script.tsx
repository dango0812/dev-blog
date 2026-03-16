/**
 * Schema.org JSON-LD 구조화 데이터를 script 태그로 삽입하는 컴포넌트
 *
 * @example
 * import { getWebSiteSchema } from '@/utils';
 * <SchemaScript schema={getWebSiteSchema()} />
 */
export function SchemaScript({ schema }: { schema: object }) {
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}
