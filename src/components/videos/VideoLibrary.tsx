'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { categoryLabel, videoCategories, type Video, type VideoFilter } from '@/lib/videos/types';
import { youtubeWatchUrl } from '@/lib/videos/youtube';
import { BeginnerCarousel } from './BeginnerCarousel';
import { VideoPlayer } from './VideoPlayer';
import styles from './videos.module.css';

export function VideoLibrary({ videos, filter, initialVideoId }: { videos: Video[]; filter: VideoFilter; initialVideoId?: string }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const beginners = filter === 'all' || filter === 'beginner' ? videos.filter((video) => video.category === 'beginner') : [];
  const listed = videos.filter((video) => filter === 'all' ? video.category !== 'beginner' : video.category === filter && filter !== 'beginner');
  const empty = filter === 'all' ? videos.length === 0 : !videos.some((video) => video.category === filter);
  return <>
    <nav className={styles.filters} aria-label="動画カテゴリ">
      {[{ value: 'all', label: 'すべて' }, ...videoCategories].map((item) => <Link href={item.value === 'all' ? '/videos' : `/videos?category=${item.value}`} key={item.value} scroll={false} aria-current={filter === item.value ? 'page' : undefined}>{item.label}</Link>)}
    </nav>
    {beginners.length ? <BeginnerCarousel videos={beginners} initialVideoId={initialVideoId} playingId={playingId} onPlay={setPlayingId} /> : null}
    {listed.length ? <section className={styles.listSection} aria-labelledby="video-list-heading"><h2 id="video-list-heading">{filter === 'all' ? '目的から動画を探す' : categoryLabel(filter as Video['category'])}</h2>
      <div className={styles.videoList}>{listed.map((video) => <article className={styles.row} id={`video-${video.id}`} key={video.id}>
        <VideoPlayer video={video} playing={playingId === video.id} onPlay={() => setPlayingId(video.id)} />
        <div className={styles.rowCopy}><div className={styles.category}>{categoryLabel(video.category)}{video.category === 'related' ? <span className={styles.externalBadge}>外部チャンネル</span> : null}</div>
          <h3><button type="button" onClick={() => setPlayingId(video.id)} aria-label={`${video.title}を再生する`}>{video.title}<ArrowRight size={24} aria-hidden="true" /></button></h3>
          <p>{video.description}</p><div className={styles.sourceLine}>{video.channelName ? <span>投稿元：{video.channelName}</span> : null}<a className={styles.youtubeLink} href={youtubeWatchUrl(video.youtubeId)} target="_blank" rel="noopener noreferrer">YouTubeで見る ↗</a></div>
        </div>
      </article>)}</div>
    </section> : null}
    {empty ? <section className={styles.empty} aria-live="polite"><h2>動画を準備しています。</h2><p>{videos.length ? 'このカテゴリの動画は、公開までしばらくお待ちください。' : 'POLARISSの仕組みや使い方を、動画でご案内していきます。'}</p>{videos.length ? <Link href="/videos">すべての動画を見る →</Link> : <Link href="/howto">使い方を確認する →</Link>}</section> : null}
    <div className={styles.help}><p>動画を見ても気になることがあれば、お気軽にご相談ください。</p><Link href="/contact" className={styles.secondary}>お問い合わせ <ArrowRight size={20} aria-hidden="true" /></Link></div>
  </>;
}
