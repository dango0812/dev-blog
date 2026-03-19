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
├── admin/
│   ├── page.tsx                # 관리자 로그인
│   ├── dashboard/              # 관리자 대시보드
│   └── posts/                  # 게시글 작성/수정
└── api/
    ├── auth/                   # GitHub OAuth 콜백
    ├── upload/                 # Cloudinary 이미지 업로드
    └── posts/                  # 게시글 CRUD

constants/
├── auth.ts                     # OAuth
├── post.ts                     # 게시글
├── routes.ts                   # API/OAuth 엔드포인트
├── paths.ts                    # 페이지
├── site.ts                     # 사이트
└── query-keys.ts               # TanStack Query Key

services/
├── auth.schema.ts              # OAuth Zod 스키마
├── auth.ts                     # OAuth 함수
├── post.schema.ts              # 게시글 Zod 스키마
└── post.ts                     # 게시글 DB 쿼리

hooks/
└── use-posts.tsx               # 게시글 목록 조회 훅

proxy.ts                        # 미들웨어
```
