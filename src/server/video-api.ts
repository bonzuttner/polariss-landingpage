import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { videoInputSchema } from '@/lib/videos/validation';

export function revalidateVideos(id?: string) {
  for (const path of ['/', '/videos', '/admin/videos', '/sitemap.xml']) revalidatePath(path);
  if (id) revalidatePath(`/admin/videos/${id}`);
}
export async function parseVideoRequest(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  return videoInputSchema.safeParse(payload);
}
export function invalidVideo(message: string) { return NextResponse.json({ error: message }, { status: 400 }); }
export function videoNotFound() { return NextResponse.json({ error: '動画が見つかりません。' }, { status: 404 }); }
