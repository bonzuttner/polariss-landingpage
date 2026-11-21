# Video library and homepage placement

This branch adds `/videos` and a separate **動画管理** section at `/admin/videos`. It is based on `main` at `cce1f4c`, including the previously approved hero and phone contact changes.

## Deploy to the test environment

1. Deploy this branch with the test environment's existing database and authentication configuration. Do not change the production branch or production data.
2. Run `npm run db:migrate` using the test database configuration. The existing database initialization also applies pending migrations automatically. `migrations/0004_videos.sql` adds only the videos table and its index; it does not modify articles or FAQ data. Both local SQLite and Turso/libSQL are supported.
3. Sign in and open `/admin/videos`. Register actual YouTube URLs when they are ready. No sample videos or fictional testimonials are seeded by this change.
4. Check `/videos` and the homepage at desktop and mobile widths. The homepage video section is hidden until a published video is explicitly selected for homepage placement.

The existing environment variables and database setup described in the main README are reused. This feature does not require a YouTube API key, a new storage service, or an automated import job.

## Register and curate videos

- Register the title, YouTube URL, category, description and display order. New entries default to **下書き**.
- Categories: **はじめての方へ**, **取り付け・使い方**, **機能の実演**, **利用者・導入事例**, **関連動画**.
- Published beginner videos appear in the manual introductory carousel. Arrows and the visible thumbnail strip switch videos; there is no timed auto-advance. With only one video the redundant controls are hidden.
- **関連動画** is for externally published coverage/reviews. The posting channel name is required and shown publicly, along with a link to the original YouTube video. External videos are curated manually; they are not scraped or automatically imported from YouTube.
- Enable **TOPに掲載する** to include a published video in the homepage module. Up to three selected videos are shown, ordered by the numeric display order (lower numbers first). Drafts are excluded even if this checkbox is selected.
- A thumbnail is derived from the YouTube video ID. An optional HTTPS thumbnail URL or site-local image path can override it. Duration is optional and entered as `1:30` or `1:02:30`; no guessed length is displayed.
- Saving, unpublishing and deleting invalidate the public homepage, video page and admin listing. Deleting a CMS entry does not delete the original YouTube video.

## Playback and empty states

YouTube players are created only after an explicit play click, using the privacy-enhanced `youtube-nocookie.com` domain and `strict-origin-when-cross-origin` referrer policy. Choosing another introductory video stops playback by unmounting the previous iframe. Only one video player is active at a time on the library page. A link to watch directly on YouTube remains available when embedding is restricted by the uploader.

With no published videos, `/videos` explains that videos are being prepared and links to the existing usage guide. The homepage does not show an empty video module. Every admin page and videos API operation uses the existing authenticated admin access checks. No existing AI chat behavior is changed.

## Verification

- Unit tests cover supported YouTube URLs, spoofed/unsafe URLs, source attribution, thumbnail validation and publication defaults.
- Persistence tests run the new migration and CRUD/publication queries against both sql.js SQLite and the libSQL client.
- Browser checks exercise empty states, unauthenticated API access, registration/edit/publish/delete, filtering, manual carousel controls, click-to-play embeds, deep links, and responsive homepage/library layouts using temporary local-only fixtures. The fixtures are removed afterwards.

### Checks completed for this change

- `npm test`: 75 tests passed, including both SQLite and libSQL persistence checks.
- `npm run build -- --webpack`: optimized production build and TypeScript checks passed.
- ESLint on changed TypeScript/TSX files: no errors; three pre-existing unused-variable warnings in the shared header/home components.
- Production-mode browser checks passed at 320, 390, 768, 1024, 1440 and 1920px: no horizontal page overflow, categories and attribution, manual slide/thumbnail selection, iframe removal on slide change, deep links and authenticated CMS CRUD.
- Browser fixtures were local-only and removed after verification. The iframe URL/lifecycle was tested with a browser stub; actual videos have not been supplied, so playback/embedding permission must be checked with the real URLs when they are registered.
