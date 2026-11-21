'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Video } from '@/lib/videos/types';
import { categoryLabel } from '@/lib/videos/types';
import { VideoPlayer, VideoPoster } from './VideoPlayer';
import styles from './videos.module.css';

export function HomeVideos({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState(false);
  if (!videos.length) return null;
  const [main, ...others] = videos;
  return <section className={styles.home} aria-labelledby="home-videos-title">
    <div className={styles.homeHeading}><div><h2 id="home-videos-title">動画でわかるPOLARISS</h2><p>仕組みも、使い方も。まずは動画で確かめる。</p></div><Link href="/videos" className={styles.secondary}>動画をすべて見る <ArrowRight size={22} aria-hidden="true" /></Link></div>
    <div className={`${styles.homeContent} ${others.length ? '' : styles.single}`}>
      <article><VideoPlayer key={main.id} video={main} playing={playing} onPlay={() => setPlaying(true)} /><h3 className={styles.homeTitle}>{main.title}</h3><p>{main.description}</p>{main.category === 'related' && main.channelName ? <p className={styles.category}>外部チャンネル ／ 投稿元：{main.channelName}</p> : null}</article>
      {others.length ? <div className={styles.homeRelated}>{others.map((video) => <Link href={`/videos?video=${video.id}#video-${video.id}`} className={styles.homeEntry} key={video.id}><div className={styles.homeThumb}><VideoPoster video={video} /></div><h3>{video.title}</h3><p>{categoryLabel(video.category)}{video.category === 'related' ? ` ／ ${video.channelName}` : ''}</p></Link>)}</div> : null}
    </div>
  </section>;
}
