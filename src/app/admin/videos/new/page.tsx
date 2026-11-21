import { AdminShell } from '@/components/admin/AdminShell/AdminShell';
import { VideoEditor } from '@/components/admin/VideoEditor/VideoEditor';
import { requireAdminPageAccess } from '@/server/auth';
export default async function NewVideoPage() {
  await requireAdminPageAccess();
  return <AdminShell title="動画を登録する" description="YouTubeのURLと掲載内容を入力してください。初期状態は下書きです。"><VideoEditor /></AdminShell>;
}
