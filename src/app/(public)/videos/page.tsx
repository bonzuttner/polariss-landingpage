import Link from 'next/link';
import { VideoLibrary } from '@/components/videos/VideoLibrary';
import styles from '@/components/videos/videos.module.css';
import { buildMetadata } from '@/lib/seo';
import { parseVideoFilter } from '@/lib/videos/types';
import { getPublishedVideos } from '@/server/video-service';

export const metadata = buildMetadata({ title: '動画でわかるPOLARISS', description: 'POLARISSの仕組み、取り付け・使い方、機能の実演、利用者・導入事例、関連動画をご紹介します。', path: '/videos' });
export const dynamic = 'force-dynamic';
export default async function VideosPage({ searchParams }: { searchParams: Promise<{ category?: string | string[]; video?: string | string[] }> }) {
  const [params, videos] = await Promise.all([searchParams, getPublishedVideos()]);
  const filter = parseVideoFilter(typeof params.category === 'string' ? params.category : undefined);
  const selectedId = typeof params.video === 'string' && videos.some((video) => video.id === params.video) ? params.video : undefined;
  return <div className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="パンくず"><Link href="/">ホーム</Link><span aria-hidden="true">›</span><span>動画でわかるPOLARISS</span></nav>
    <h1 className={styles.pageTitle}>動画でわかるPOLARISS</h1>
    <p className={styles.intro}>はじめての方も、ご利用中の方も。知りたいことから選べます。</p>
    <VideoLibrary key={`${filter}:${selectedId ?? ''}`} videos={videos} filter={filter} initialVideoId={selectedId} />
  </div>;
}
