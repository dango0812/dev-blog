-- 전체 목록 조회
SELECT
  id,
  slug,
  title,
  type,
  tag,
  cover_url  AS "coverUrl",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
FROM posts
ORDER BY created_at DESC;


-- slug로 단건 조회
SELECT
  id,
  slug,
  title,
  type,
  tag,
  content,
  cover_url  AS "coverUrl",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
FROM posts
WHERE slug = 'feature-sliced-design';