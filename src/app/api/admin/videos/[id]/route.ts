import { NextResponse } from 'next/server';
import { requireAdminApiAccess } from '@/server/auth';
import { deleteVideo, getVideoById, saveVideo } from '@/server/video-service';
import { invalidVideo, parseVideoRequest, revalidateVideos, videoNotFound } from '@/server/video-api';

type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, { params }: Context) {
  if (!await requireAdminApiAccess(request)) return NextResponse.json({ error: 'ログインが必要です。' }, { status: 401 });
  const { id } = await params;
  const video = await getVideoById(id);
  return video ? NextResponse.json({ video }, { headers: { 'Cache-Control': 'no-store' } }) : videoNotFound();
}
export async function PATCH(request: Request, { params }: Context) {
  if (!await requireAdminApiAccess(request)) return NextResponse.json({ error: 'ログインが必要です。' }, { status: 401 });
  const { id } = await params;
  if (!await getVideoById(id)) return videoNotFound();
  const parsed = await parseVideoRequest(request);
  if (!parsed.success) return invalidVideo(parsed.error.issues[0]?.message ?? '入力内容を確認してください。');
  const video = await saveVideo(id, parsed.data);
  if (!video) return videoNotFound();
  revalidateVideos(id);
  return NextResponse.json({ video });
}
export async function DELETE(request: Request, { params }: Context) {
  if (!await requireAdminApiAccess(request)) return NextResponse.json({ error: 'ログインが必要です。' }, { status: 401 });
  const { id } = await params;
  if (!await getVideoById(id)) return videoNotFound();
  await deleteVideo(id);
  revalidateVideos(id);
  return NextResponse.json({ ok: true });
}
