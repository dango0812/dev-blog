# blog.dong-gyu.com

## 기술 스택

| &nbsp;           | &nbsp;                     |
| ---------------- | -------------------------- |
| Framework        | Next.js 16 (App Router)    |
| Language         | TypeScript                 |
| Database         | Neon Serverless PostgreSQL |
| State Management | TanStack Query v5          |
| Styling          | Tailwind CSS v4            |
| Validation       | Zod                        |
| Form             | React Hook Form            |
| Package Manager  | pnpm                       |

---

## 프로젝트 구조

```
app/
├── page.tsx                    # 메인 페이지 (게시글 목록)
├── [slug]/                     # 게시글 상세 페이지
├── admin/posts/                # 게시글 작성/수정
└── api/                        # API Route Handler

constants/
├── post.ts                     # 게시글
├── routes.ts                   # API 엔드포인트
├── paths.ts                    # 페이지 경로
├── site.ts                     # 사이트 설정
└── query-keys.ts               # TanStack Query Key

services/
└── post.ts                     # DB 쿼리/Zod

hooks/
└── use-posts.tsx               # 게시글 목록 조회 훅

schemas.ts                      # Zod Form Schema
```
