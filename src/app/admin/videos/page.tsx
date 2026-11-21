import Link from 'next/link';
import { AdminShell } from '@/components/admin/AdminShell/AdminShell';
import { categoryLabel } from '@/lib/videos/types';
import { requireAdminPageAccess } from '@/server/auth';
import { getAdminVideos } from '@/server/video-service';
import '@/components/admin/VideoEditor/video-editor.css';

export default async function AdminVideosPage() {
  await requireAdminPageAccess();
  const videos = await getAdminVideos();
  return <AdminShell title="動画管理" description="YouTubeのURLを登録して、動画ページやTOPへの掲載を管理します。">
    <div className="table-actions"><Link className="button button-primary" href="/admin/videos/new">動画を登録する</Link><Link className="button button-dark" href="/videos" target="_blank">公開ページを確認 ↗</Link></div>
    <p>「はじめての方へ」に分類した公開動画は、動画ページ上部のスライダーに表示されます。「TOPに掲載する」を選んだ公開動画は、表示順の先頭から最大3本掲載されます。</p>
    <div className="admin-video-list">
      {videos.length ? videos.map((video) => <Link className="admin-video-row" href={`/admin/videos/${video.id}`} key={video.id}>
        <strong>{video.title}</strong><span>{categoryLabel(video.category)}</span><span>{video.status === 'published' ? '公開中' : '下書き'}{video.showOnHome ? ' ／ TOP掲載' : ''}</span><span>表示順：{video.sortOrder}</span>
      </Link>) : <p>動画はまだ登録されていません。YouTubeに投稿した動画のURLから登録できます。</p>}
    </div>
  </AdminShell>;
}
