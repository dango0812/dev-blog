/** API 응답에서 사용하는 게시글 타입 */
export interface Post {
  id: number;
  slug: string;
  title: string;
  type: string;
  tag: string;
  content: string;
  coverUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
