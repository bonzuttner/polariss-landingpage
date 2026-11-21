// @vitest-environment node
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createClient } from '@libsql/client';
import initSqlJs from 'sql.js';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const db = vi.hoisted(() => ({ rows: null as null | ((sql: string, args: unknown[]) => Promise<Record<string, unknown>[]>), execute: null as null | ((sql: string, args: unknown[]) => Promise<void>) }));
vi.mock('@/server/db', () => ({ nowIso: () => new Date().toISOString(), queryRows: (sql: string, args: unknown[] = []) => db.rows!(sql, args), queryFirst: async (sql: string, args: unknown[] = []) => (await db.rows!(sql, args))[0] ?? null, execute: (sql: string, args: unknown[] = []) => db.execute!(sql, args) }));
import { deleteVideo, getAdminVideos, getHomeVideos, getPublishedVideos, getVideoById, saveVideo } from './video-service';
import { videoInputSchema } from '@/lib/videos/validation';
const input = (extra = {}) => videoInputSchema.parse({ title: 'テスト動画', youtubeUrl: 'https://youtu.be/M7lc1UVf-VE', category: 'beginner', ...extra });

describe.each(['sqlite', 'libsql'])('video persistence using %s', (provider) => {
  let close: () => Promise<void>;
  beforeAll(async () => {
    const migration = await readFile(path.join(process.cwd(), 'migrations/0004_videos.sql'), 'utf8');
    if (provider === 'sqlite') {
      const SQL = await initSqlJs({ locateFile: (file) => path.join(process.cwd(), 'node_modules/sql.js/dist', file) });
      const connection = new SQL.Database(); connection.run(migration);
      db.rows = async (sql, args) => { const statement = connection.prepare(sql); statement.bind(args as never); const rows = []; try { while (statement.step()) rows.push(statement.getAsObject()); return rows; } finally { statement.free(); } };
      db.execute = async (sql, args) => { connection.run(sql, args as never); };
      close = async () => connection.close();
    } else {
      const folder = await mkdtemp(path.join(tmpdir(), 'polariss-videos-'));
      const client = createClient({ url: `file:${path.join(folder, 'test.db')}` }); await client.executeMultiple(migration);
      db.rows = async (sql, args) => (await client.execute({ sql, args: args as never[] })).rows as Record<string, unknown>[];
      db.execute = async (sql, args) => { await client.execute({ sql, args: args as never[] }); };
      close = async () => { client.close(); await rm(folder, { recursive: true, force: true }); };
    }
  });
  beforeEach(async () => { await db.execute!('DELETE FROM videos', []); });
  afterAll(async () => { await close(); });
  it('keeps newly registered drafts off public pages and TOP', async () => { const draft = await saveVideo(null, input({ showOnHome: true })); expect(draft?.status).toBe('draft'); expect(await getAdminVideos()).toHaveLength(1); expect(await getPublishedVideos()).toHaveLength(0); expect(await getHomeVideos()).toHaveLength(0); });
  it('limits TOP to three explicitly selected published videos in display order', async () => { for (const order of [4, 1, 3, 2]) await saveVideo(null, input({ sortOrder: order, status: 'published', showOnHome: true })); await saveVideo(null, input({ title: '非掲載', status: 'published' })); expect((await getHomeVideos()).map((video) => video.sortOrder)).toEqual([1, 2, 3]); expect(await getPublishedVideos()).toHaveLength(5); });
  it('saves related-video attribution and canonicalizes a shared URL', async () => { const related = await saveVideo(null, input({ category: 'related', channelName: '投稿元', status: 'published' })); expect(related?.youtubeId).toBe('M7lc1UVf-VE'); expect(related?.channelName).toBe('投稿元'); expect((await getPublishedVideos())[0].category).toBe('related'); });
  it('updates a video, then removes it from public results immediately when unpublished', async () => { const video = (await saveVideo(null, input({ status: 'published', showOnHome: true })))!; const updated = await saveVideo(video.id, input({ title: '編集後', youtubeUrl: 'https://www.youtube.com/shorts/aqz-KE-bpKQ', status: 'draft' })); expect(updated?.title).toBe('編集後'); expect(updated?.youtubeId).toBe('aqz-KE-bpKQ'); expect(await getPublishedVideos()).toHaveLength(0); expect(await getHomeVideos()).toHaveLength(0); expect(await getAdminVideos()).toHaveLength(1); });
  it('deletes only the requested video and does not recreate missing updates', async () => { const first = (await saveVideo(null, input()))!; const second = (await saveVideo(null, input()))!; await deleteVideo(first.id); expect(await getVideoById(first.id)).toBeNull(); expect(await getVideoById(second.id)).not.toBeNull(); expect(await saveVideo(first.id, input())).toBeNull(); expect(await getAdminVideos()).toHaveLength(1); });
  it('rejects invalid data before it reaches storage', async () => { await expect(saveVideo(null, { ...input(), youtubeUrl: 'https://evil.example/video' })).rejects.toThrow(); expect(await getAdminVideos()).toHaveLength(0); });
});
