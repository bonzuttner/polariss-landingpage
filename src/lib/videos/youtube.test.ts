import { describe, expect, it } from 'vitest';
import { formatVideoDuration, youtubeEmbedUrl, youtubeIdFromUrl } from './youtube';
import { videoInputSchema } from './validation';
const id = 'M7lc1UVf-VE';
const base = { title: '動画の紹介', youtubeUrl: `https://www.youtube.com/watch?v=${id}`, category: 'beginner' };
describe('YouTube video URLs', () => {
  it.each([`https://www.youtube.com/watch?v=${id}&t=10`, `https://youtu.be/${id}?si=shared`, `https://www.youtube.com/shorts/${id}`, `https://m.youtube.com/live/${id}`, `https://www.youtube-nocookie.com/embed/${id}`])('accepts supported video URL %s', (url) => expect(youtubeIdFromUrl(url)).toBe(id));
  it.each([`http://youtube.com/watch?v=${id}`, `https://youtube.com.evil.example/watch?v=${id}`, `https://youtube.com@evil.example/watch?v=${id}`, `https://evil.example@youtube.com/watch?v=${id}`, `https://youtube.com:8080/watch?v=${id}`, 'javascript:alert(1)', 'https://youtube.com/playlist?list=abc', 'https://youtube.com/watch?v=short', `https://youtu.be/${id}/extra`, `https://youtube.com/embed/${id}/extra`])('rejects unsupported or spoofed URL %s', (url) => expect(youtubeIdFromUrl(url)).toBeNull());
  it('uses the privacy-enhanced host for click-to-play embeds', () => { const url = new URL(youtubeEmbedUrl(id)); expect(url.origin).toBe('https://www.youtube-nocookie.com'); expect(url.pathname).toBe(`/embed/${id}`); expect(url.searchParams.get('playsinline')).toBe('1'); });
  it('formats optional durations without inventing a length', () => { expect(formatVideoDuration(null)).toBeNull(); expect(formatVideoDuration(90)).toBe('1:30'); expect(formatVideoDuration(3750)).toBe('1:02:30'); });
});
describe('video publication validation', () => {
  it('defaults to an unfeatured draft', () => { const value = videoInputSchema.parse(base); expect(value.status).toBe('draft'); expect(value.showOnHome).toBe(false); });
  it('requires source attribution for related videos', () => { expect(videoInputSchema.safeParse({ ...base, category: 'related' }).success).toBe(false); expect(videoInputSchema.safeParse({ ...base, category: 'related', channelName: '投稿元チャンネル' }).success).toBe(true); });
  it.each(['//evil.example/image.png', 'javascript:alert(1)', 'data:image/svg+xml,abc', '/images/../secret.png', 'http://example.com/a.png'])('rejects unsafe thumbnail %s', (thumbnailUrl) => expect(videoInputSchema.safeParse({ ...base, thumbnailUrl }).success).toBe(false));
  it.each(['', '/images/device.webp', 'https://i.ytimg.com/vi/example/hqdefault.jpg'])('accepts thumbnail %s', (thumbnailUrl) => expect(videoInputSchema.safeParse({ ...base, thumbnailUrl }).success).toBe(true));
  it.each([{ sortOrder: -1 }, { sortOrder: 0.5 }, { durationSeconds: -1 }, { durationSeconds: 86401 }, { category: 'unknown' }, { title: ' ' }])('rejects invalid fields %j', (fields) => expect(videoInputSchema.safeParse({ ...base, ...fields }).success).toBe(false));
});
