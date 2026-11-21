import { randomUUID } from 'node:crypto';
import type { Video } from '@/lib/videos/types';
import { videoInputSchema, type VideoEditorInput } from '@/lib/videos/validation';
import { youtubeIdFromUrl } from '@/lib/videos/youtube';
import { execute, nowIso, queryFirst, queryRows } from '@/server/db';

type VideoRow = { id: string; title: string; description: string; youtube_id: string; category: Video['category']; channel_name: string; duration_seconds: number | null; thumbnail_url: string; show_on_home: number; sort_order: number; status: Video['status']; updated_at: string };
function mapVideo(row: VideoRow): Video {
  return { id: row.id, title: row.title, description: row.description, youtubeId: row.youtube_id, category: row.category, channelName: row.channel_name, durationSeconds: row.duration_seconds === null ? null : Number(row.duration_seconds), thumbnailUrl: row.thumbnail_url, showOnHome: Boolean(row.show_on_home), sortOrder: Number(row.sort_order), status: row.status, updatedAt: row.updated_at };
}
export async function getPublishedVideos(): Promise<Video[]> {
  return (await queryRows<VideoRow>("SELECT * FROM videos WHERE status = 'published' ORDER BY sort_order ASC, created_at DESC, id ASC")).map(mapVideo);
}
export async function getHomeVideos(): Promise<Video[]> {
  return (await queryRows<VideoRow>("SELECT * FROM videos WHERE status = 'published' AND show_on_home = 1 ORDER BY sort_order ASC, created_at DESC, id ASC LIMIT 3")).map(mapVideo);
}
export async function getAdminVideos(): Promise<Video[]> {
  return (await queryRows<VideoRow>('SELECT * FROM videos ORDER BY sort_order ASC, created_at DESC, id ASC')).map(mapVideo);
}
export async function getVideoById(id: string): Promise<Video | null> {
  const row = await queryFirst<VideoRow>('SELECT * FROM videos WHERE id = ?', [id]);
  return row ? mapVideo(row) : null;
}
export async function saveVideo(id: string | null, payload: VideoEditorInput): Promise<Video | null> {
  const input = videoInputSchema.parse(payload);
  const values = [input.title, input.description, youtubeIdFromUrl(input.youtubeUrl)!, input.category, input.channelName, input.durationSeconds, input.thumbnailUrl, Number(input.showOnHome), input.sortOrder, input.status, nowIso()];
  const videoId = id ?? randomUUID();
  if (id) {
    await execute('UPDATE videos SET title = ?, description = ?, youtube_id = ?, category = ?, channel_name = ?, duration_seconds = ?, thumbnail_url = ?, show_on_home = ?, sort_order = ?, status = ?, updated_at = ? WHERE id = ?', [...values, id]);
  } else {
    await execute('INSERT INTO videos (title, description, youtube_id, category, channel_name, duration_seconds, thumbnail_url, show_on_home, sort_order, status, updated_at, id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [...values, videoId, nowIso()]);
  }
  return getVideoById(videoId);
}
export async function deleteVideo(id: string) { await execute('DELETE FROM videos WHERE id = ?', [id]); }
