CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  youtube_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('beginner', 'howto', 'demo', 'stories', 'related')),
  channel_name TEXT NOT NULL DEFAULT '',
  duration_seconds INTEGER CHECK (duration_seconds IS NULL OR duration_seconds > 0),
  thumbnail_url TEXT NOT NULL DEFAULT '',
  show_on_home INTEGER NOT NULL DEFAULT 0 CHECK (show_on_home IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_videos_public_order ON videos(status, sort_order, created_at);
