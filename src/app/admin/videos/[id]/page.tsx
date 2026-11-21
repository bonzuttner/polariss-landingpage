import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell/AdminShell';
import { VideoEditor } from '@/components/admin/VideoEditor/VideoEditor';
import { requireAdminPageAccess } from '@/server/auth';
import { getVideoById } from '@/server/video-service';
export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPageAccess();
  const video = await getVideoById((await params).id);
  if (!video) notFound();
  return <AdminShell title="動画を編集する" description="公開状態、カテゴリ、TOP掲載、表示順を変更できます。"><VideoEditor key={video.updatedAt} video={video} /></AdminShell>;
}
