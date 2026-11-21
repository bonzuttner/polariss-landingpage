import { z } from 'zod';
import { youtubeIdFromUrl } from './youtube';

export const videoInputSchema = z.object({
  title: z.string().trim().min(1, 'タイトルを入力してください。').max(160),
  description: z.string().trim().max(2000).default(''),
  youtubeUrl: z.string().trim().max(2048).refine((url) => youtubeIdFromUrl(url) !== null, '有効なYouTube動画のHTTPS URLを入力してください。'),
  category: z.enum(['beginner', 'howto', 'demo', 'stories', 'related']),
  channelName: z.string().trim().max(160).default(''),
  durationSeconds: z.number().int().min(1).max(86400).nullable().default(null),
  thumbnailUrl: z.string().trim().max(2048).default('').refine((value) => {
    if (!value) return true;
    if (/^\/(?!\/)[A-Za-z0-9_./-]+$/.test(value) && !value.includes('..')) return true;
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; } catch { return false; }
  }, 'サムネイルにはHTTPS URLまたはサイト内の画像パスを指定してください。'),
  showOnHome: z.boolean().default(false),
  sortOrder: z.number().int().min(0).max(99999).default(0),
  status: z.enum(['draft', 'published']).default('draft'),
}).refine((input) => input.category !== 'related' || input.channelName.length > 0, { path: ['channelName'], message: '関連動画には投稿元のチャンネル名を入力してください。' });
export type VideoEditorInput = z.infer<typeof videoInputSchema>;
