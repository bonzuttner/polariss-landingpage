import { NextResponse } from 'next/server';
import { requireAdminApiAccess } from '@/server/auth';
import { getAdminVideos, saveVideo } from '@/server/video-service';
import { invalidVideo, parseVideoRequest, revalidateVideos } from '@/server/video-api';

export async function GET(request: Request) {
  if (!await requireAdminApiAccess(request)) return NextResponse.json({ error: 'ログインが必要です。' }, { status: 401 });
  return NextResponse.json({ videos: await getAdminVideos() }, { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(request: Request) {
  if (!await requireAdminApiAccess(request)) return NextResponse.json({ error: 'ログインが必要です。' }, { status: 401 });
  const parsed = await parseVideoRequest(request);
  if (!parsed.success) return invalidVideo(parsed.error.issues[0]?.message ?? '入力内容を確認してください。');
  const video = await saveVideo(null, parsed.data);
  revalidateVideos(video?.id);
  return NextResponse.json({ video }, { status: 201 });
}
