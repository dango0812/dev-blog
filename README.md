# 개발 블로그
![cover-main](https://github.com/user-attachments/assets/74a45631-ec3b-4b4b-8c8c-9d693622a39d)
💡 설계부터 구현까지, 하나씩 만들어가는 나만의 개발 블로그


## 1️⃣ 페이지 소개
![post-list](https://github.com/user-attachments/assets/c19ddca0-cfde-4f2a-9056-aff18d01a314)
![post-detail](https://github.com/user-attachments/assets/486c1a34-58ac-4603-8aad-d4aad5dd7a9a)
![sign-in](https://github.com/user-attachments/assets/b84b1236-be1a-46ba-a017-3dfe9c62c4a0)
![dashboard](https://github.com/user-attachments/assets/967963cf-d46c-4603-abbb-9d0310fc3797)
![post-create-edit](https://github.com/user-attachments/assets/09d104bf-045f-485c-9784-3a108ad6584d)

## 2️⃣ 기술 스택
<img width="1999" height="983" alt="tech-stack" src="https://github.com/user-attachments/assets/dad2f802-0774-4214-b65a-4714f0596b99" />

## 3️⃣ 아키텍처
<img width="1400" height="440" alt="architecture" src="https://github.com/user-attachments/assets/494d0913-4b93-40ef-8a16-fcd169581988" />

## 4️⃣ 프로젝트 구조
```
📂 DEV-BLOG
┣ 📂 app/
┃ ┣ 📂 api/          # 업로드/게시글 CRUD
┃ ┣ 📂 admin/        # 대시보드/게시글 관리
┃ ┣ 📂 [slug]/       # 게시글 상세 페이지
┃ ┗ 📄 page.tsx      # 메인 페이지 (게시글 목록)
┣ 📂 components/     # 공통 컴포넌트
┣ 📂 services/       # DB 쿼리 및 유효성 검사 (Zod)
┣ 📂 hooks/          # 데이터 페칭 및 상태 관리 커스텀 훅
┣ 📂 lib/            # 외부 라이브러리 설정 (Cloudinary·Neon·Tailwind CSS)
┣ 📂 constants/      # 전역 상수
┣ 📂 utils/          # 유틸리티 함수
┗ 📂 db/             # SQL 쿼리 파일
```
