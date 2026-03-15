CREATE TABLE IF NOT EXISTS posts (
  id         SERIAL PRIMARY KEY,
  slug       VARCHAR(80)  NOT NULL UNIQUE,
  title      VARCHAR(100) NOT NULL,
  type       VARCHAR(20)  NOT NULL,
  tag        VARCHAR(20)  NOT NULL,
  content    TEXT         NOT NULL,
  cover_url  TEXT,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- slug 기반 조회
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);

-- 최신순 정렬 조회
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts (created_at DESC);
