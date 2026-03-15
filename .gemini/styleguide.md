# 프로젝트 스타일 가이드

> **기술 스택**: Next.js 16 (App Router · Turbopack) · React 19 (React Compiler) · TypeScript (strict) · Tailwind CSS v4 + CVA · pnpm · Husky + lint-staged

---

## 1. 포맷팅

- **Prettier**가 코드 포맷팅을 전담하며, `prettier.config.js`에 정의되어 자동 적용됩니다.
  - 들여쓰기: 스페이스 2개
  - 줄 길이: 120자
  - 세미콜론: 사용 (`semi: true`)
  - 따옴표: 작은따옴표 (`singleQuote: true`)
  - 화살표 함수 괄호: 생략 가능 시 생략 (`arrowParens: 'avoid'`)
  - 줄 끝: LF
- Tailwind 클래스 정렬은 `prettier-plugin-tailwindcss`가 자동 처리합니다.
- `prettier-plugin-classnames`로 `cn()`, `clsx()`, `cva()` 내부 클래스도 자동 정렬됩니다.
- Husky + lint-staged로 커밋 시 ESLint + Prettier 자동 실행

## 2. 명명 규칙

| 대상              | 규칙             | 예시                                  |
| ----------------- | ---------------- | ------------------------------------- |
| 컴포넌트          | PascalCase       | `PostCard`, `ThemeToggle`             |
| 훅 · 유틸 · 함수  | camelCase        | `useBoolean`, `formatDate`            |
| 변수              | camelCase        | `selectedTag`, `postList`             |
| 상수              | UPPER_SNAKE_CASE | `POSTS_PER_PAGE`, `SITE_CONFIG`       |
| 타입/인터페이스   | PascalCase       | `PostMeta`, `SiteConfig`              |
| 파일명 (컴포넌트) | kebab-case       | `post-card.tsx`, `theme-toggle.tsx`   |

## 3. Import 규칙

- 외부 디렉토리 참조 시 `@/*` path alias(절대 경로) 사용
- 동일 디렉토리 또는 하위 디렉토리 파일은 상대 경로 (`./`, `../`) 사용
- `simple-import-sort` 플러그인에 의한 자동 정렬 준수
- 디렉토리 단위 모듈은 `index.ts`를 통해 barrel export 사용 (단, 트리쉐이킹이 필요한 경우 직접 import 우선)

## 4. 가독성 & 주석

### 가독성

- 매직 넘버/스트링 지양, 의미있는 상수 사용 (단, Tailwind 클래스 내 수치는 예외)
- 함수는 하나의 책임만 가지도록 작성 (최대 20줄 권장)
- 중첩 깊이 최소화 (3단계 이하 권장)
- 조건부 렌더링 시 `&&` 대신 삼항 연산자 사용 (falsy 값 렌더링 방지)

### 주석

- 복잡한 로직이나 비즈니스 규칙에 대한 설명이 필요한 경우에만 주석 추가
- 자명한 주석은 피하고, 코드 자체가 의도를 드러내도록 작성
- `// TODO:`, `// FIXME:` 형식으로 사용하며, 가능한 경우 관련 이슈 번호 포함

## 5. Next.js App Router

### Server Component vs Client Component

- 모든 `page.tsx`, `layout.tsx`는 기본적으로 Server Component로 작성
- 상태 관리, 이벤트 처리, 브라우저 API 사용이 필요한 경우에만 파일 최상단에 `'use client'`를 선언하여 Client Component로 분리
- Client Component의 크기를 최소화하고, 무거운 로직이나 데이터 페칭은 Server에서 처리 후 props로 전달
- Server Component에서만 사용되는 모듈은 `server-only` 패키지로 보호

### 데이터 페칭

- 서버 데이터 페칭은 Server Component에서 직접 `async/await` 사용
- 블로그 특성상 정적 콘텐츠는 빌드 시점에 생성 (`generateStaticParams` 활용)
- 동적 데이터가 필요한 경우 `unstable_cache` 또는 `next/cache`의 `revalidateTag` 활용

### 라우팅

- Route Group (괄호 폴더)으로 레이아웃을 논리적으로 구분
- `layout.tsx`에서 공통 레이아웃과 메타데이터 관리
- `loading.tsx`, `error.tsx`, `not-found.tsx` 등 규약 파일 적극 활용

### 메타데이터 & SEO (블로그 필수)

- 각 `page.tsx`에서 `generateMetadata` 함수로 동적 메타데이터 생성
- `title`, `description`, `openGraph`, `twitter` 필드 필수 설정
- `robots.ts`, `sitemap.ts`로 크롤러 제어 및 사이트맵 자동 생성
- JSON-LD 구조화 데이터(`Article`, `BlogPosting`) 적용 권장
- `canonical` URL 명시하여 중복 콘텐츠 방지

## 6. React 19 & React Compiler

### React Compiler

- `babel-plugin-react-compiler`가 활성화되어 있으므로 수동 `memo`, `useCallback`, `useMemo` 사용 **불필요**
- 수동 메모이제이션은 오히려 컴파일러 최적화를 방해할 수 있으므로 제거 권장

### React 19

- `forwardRef` 불필요, `ref`를 props로 직접 전달
- `useActionState`, `useFormStatus` 등 React 19 내장 훅 활용
- `use()` 훅으로 Promise/Context 소비 가능

### 컴포넌트 작성

- 컴포넌트는 단일 책임 원칙 준수
- JSX 내에서 복잡한 로직 지양, 별도의 핸들러 함수로 분리
- 렌더링마다 재생성되지 않아도 되는 정적 JSX나 상수는 컴포넌트 외부로 호이스팅
- 무거운 클라이언트 컴포넌트는 `next/dynamic`으로 동적 import 처리

## 7. 에러 핸들링

- **Error Boundary**: `error.tsx` 규약 파일로 라우트 단위 에러 격리
- **비동기 에러 처리**: `try-catch` 블록 활용
- **Not Found**: `notFound()` 함수와 `not-found.tsx` 규약 파일 조합

## 8. 스타일링 (Tailwind CSS v4 + CVA)

- 컴포넌트 변형(variants)은 `class-variance-authority`(CVA)로 관리
- 클래스 충돌 해소는 `tailwind-merge`의 `cn()` 유틸 사용
- `@theme` 블록에서 커스텀 토큰 정의 (`--color-primary` 등)
- `@layer base` → `@layer components` 순서로 스타일 우선순위 관리
- `tailwind-merge` v3에서 커스텀 테마 컬러가 충돌 시 드롭될 수 있으므로 동일 `cn()` 호출 내 혼용 주의
- 불필요하거나 중복되는 스타일 정의는 적극 제거
- 다크 모드 지원 시 `dark:` 변형 활용, CSS 변수 기반 테마 토큰 사용

## 9. 타입스크립트

- `strict: true` 모드 사용
- 타입 명시적으로 작성 (`any` 사용 지양, 불가피한 경우 `unknown` + 타입 가드 활용)
- `as const` 배열로 리터럴 타입 관리
- `type`과 `interface` 구분: 확장 가능한 객체 형태는 `interface`, 유니온/인터섹션 등 복합 타입은 `type` 사용
- ES6+ 기능 적극 활용 (Optional Chaining `?.`, Nullish Coalescing `??`, 구조 분해 할당, 스프레드 연산자 등)
- 함수 반환 타입은 복잡한 경우 명시적으로 작성

## 10. 성능 최적화

- `next/image` 컴포넌트로 이미지 최적화 (`fill` + `sizes`, `priority` for LCP 이미지)
- `next/dynamic`으로 무거운 클라이언트 컴포넌트 지연 로딩 (코드 에디터, 댓글 위젯 등)
- `next/font`로 폰트 자체 호스팅 및 레이아웃 시프트 방지 (`display: 'swap'`)
- 불필요한 전체 라이브러리 임포트 대신 필요한 모듈만 임포트 (Tree-shaking)
- 정적 생성 가능한 페이지는 `generateStaticParams`로 빌드 시 미리 생성
- `<Suspense>`와 `loading.tsx`로 스트리밍 SSR 활용하여 TTFB 개선
- Core Web Vitals (LCP, FID, CLS) 지표 모니터링 및 최적화

## 11. Git & PR 규칙

### 커밋 메시지 (Conventional Commits)

| 타입       | 설명                                     |
| ---------- | ---------------------------------------- |
| `feat`     | 새로운 기능 추가                          |
| `fix`      | 버그 수정                                |
| `refactor` | 코드 리팩토링 (기능 변경 없음)            |
| `style`    | 코드 포맷팅, 세미콜론 등 (로직 변경 없음) |
| `test`     | 테스트 코드 추가/수정                     |
| `docs`     | 문서 수정                                |
| `chore`    | 빌드 설정, 패키지 업데이트 등             |
| `perf`     | 성능 개선                                |
| `ci`       | CI/CD 설정 변경                          |

- 커밋 제목은 50자 이내, 명령형 현재 시제로 작성
- 본문에는 "무엇을"이 아닌 **"왜"** 변경했는지 명시
- 관련 이슈가 있을 경우 Footer에 `Closes #123` 형식으로 연결

### 브랜치 네이밍

- `feat/<기능명>` — 새 기능 개발
- `fix/<버그명>` — 버그 수정
- `refactor/<대상>` — 리팩토링
- `chore/<작업명>` — 빌드/설정/유지보수
- 모든 브랜치명은 kebab-case 사용

### PR 규칙

- PR 제목은 Conventional Commits 형식 준수 (예: `feat: 로그인 페이지 추가`)
- **PR 크기**: 변경 줄 수 400줄 이하 권장 (초과 시 단위별 분리 고려)
- UI/UX 변경 사항은 스크린샷 또는 동영상 첨부
- 관련 이슈 번호를 본문에 연결 (`Closes #123`)
- 진행 중인 작업은 Draft PR로 공유, 완료 후 Ready for Review 전환
- Self-review 완료 후 팀원 리뷰 요청
- 리뷰어의 변경 요청은 충분한 근거와 함께 반영 또는 반론

## 12. 접근성 (Accessibility)

- Semantic HTML 요소 우선 사용 (`<button>`, `<nav>`, `<main>`, `<article>`, `<section>` 등)
- 모든 `<img>` 및 `next/image`에 의미 있는 `alt` 텍스트 제공 (장식용 이미지는 `alt=""`)
- 키보드만으로 모든 인터랙션이 가능하도록 `tabIndex`, `onKeyDown` 구현
- 대화형 요소에 적절한 ARIA 속성 적용 (`aria-label`, `aria-expanded`, `aria-hidden`, `role` 등)
- 색상만으로 정보를 전달하지 않도록 아이콘/텍스트 병행 사용 (색각 이상 고려)
- 폼 요소에는 `<label>` 또는 `aria-label` 필수 연결
- Focus 상태가 시각적으로 명확히 표시되도록 Tailwind `focus-visible:` 유틸 활용
- 블로그 포스트 내 코드 블록에 적절한 `aria-label` 제공
- `<time datetime="...">` 태그로 날짜 시맨틱 마크업

## 13. 보안 (Security)

- `dangerouslySetInnerHTML` 사용 **금지** (XSS 취약점, MDX 사용 시 컴파일러가 안전하게 처리)
- **환경 변수 구분 및 관리**:
  - 서버 전용 민감 정보: `NEXT_PUBLIC_` 접두사 없이 사용 (클라이언트 노출 절대 금지)
  - 클라이언트 공개 가능 정보: `NEXT_PUBLIC_` 접두사 사용
- `headers()`, `cookies()` API는 서버 측(Server Component)에서만 사용
- 외부 라이브러리 도입 시 `pnpm audit`로 보안 취약점 사전 확인
- 민감한 정보(토큰, 비밀번호 등)를 로그에 출력하지 않도록 주의

## 14. 패키지 관리 (pnpm)

- 패키지 매니저: **pnpm**
- 라이브러리 추가: `pnpm add <패키지명>` / `pnpm add -D <패키지명>`
- 라이브러리 삭제: `pnpm remove <패키지명>`
- `pnpm-lock.yaml`은 수동 편집 금지, `pnpm install`로 자동 갱신
