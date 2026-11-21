'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Video } from '@/lib/videos/types';
import { youtubeWatchUrl } from '@/lib/videos/youtube';
import { VideoPlayer, VideoPoster } from './VideoPlayer';
import styles from './videos.module.css';

export function BeginnerCarousel({ videos, initialVideoId, playingId, onPlay }: { videos: Video[]; initialVideoId?: string; playingId: string | null; onPlay: (id: string | null) => void }) {
  const [index, setIndex] = useState(Math.max(0, videos.findIndex((video) => video.id === initialVideoId)));
  const choices = useRef<(HTMLButtonElement | null)[]>([]);
  if (!videos.length) return null;
  const currentIndex = Math.min(index, videos.length - 1);
  const current = videos[currentIndex];
  function select(next: number) {
    setIndex(next); onPlay(null);
    choices.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  return <section className={styles.beginner} aria-labelledby="beginner-heading" aria-roledescription="カルーセル">
    <div className={styles.sectionHeading}>
      <div><h2 id="beginner-heading">はじめての方へ</h2><p>まず知っておきたい{videos.length}本</p></div>
      {videos.length > 1 ? <div className={styles.carouselControls}>
        <button type="button" aria-label="前の動画" disabled={currentIndex === 0} onClick={() => select(currentIndex - 1)}><ArrowLeft size={24} /></button>
        <span aria-live="polite" aria-atomic="true">{currentIndex + 1} / {videos.length}</span>
        <button type="button" aria-label="次の動画" disabled={currentIndex === videos.length - 1} onClick={() => select(currentIndex + 1)}><ArrowRight size={24} /></button>
      </div> : null}
    </div>
    <div className={styles.feature} id={`video-${current.id}`}>
      <VideoPlayer key={current.id} video={current} playing={playingId === current.id} onPlay={() => onPlay(current.id)} />
      <div className={styles.featureCopy}><h3>{current.title}</h3><p>{current.description}</p><button className={styles.primary} type="button" onClick={() => onPlay(current.id)}>この動画を見る <ArrowRight size={22} aria-hidden="true" /></button><a className={styles.youtubeLink} href={youtubeWatchUrl(current.youtubeId)} target="_blank" rel="noopener noreferrer">YouTubeで見る ↗</a></div>
    </div>
    {videos.length > 1 ? <><div className={styles.selectorRail} aria-label="はじめての方へ：動画を選ぶ">
      {videos.map((video, i) => <button ref={(element) => { choices.current[i] = element; }} key={video.id} type="button" className={styles.selector} aria-pressed={i === currentIndex} onClick={() => select(i)}>
        <span className={styles.selectorPicture}><VideoPoster video={video} />{i === currentIndex ? <span className={styles.selectedBadge}>選択中</span> : null}</span><span className={styles.selectorTitle}>{video.title}</span>
      </button>)}
    </div><p className={styles.selectorHint}>サムネイルを選んで動画を切り替え</p></> : null}
  </section>;
}
