'use client';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { useState } from 'react';
import type { Video } from '@/lib/videos/types';
import { formatVideoDuration, videoThumbnail, youtubeEmbedUrl } from '@/lib/videos/youtube';
import styles from './videos.module.css';

export function VideoPoster({ video }: { video: Video }) {
  const [failed, setFailed] = useState(false);
  const duration = formatVideoDuration(video.durationSeconds);
  return <>
    {!failed ? <Image src={videoThumbnail(video)} alt="" fill sizes="(max-width: 760px) 100vw, 60vw" unoptimized onError={() => setFailed(true)} className={styles.posterImage} /> : <span className={styles.posterFallback}>POLARISS</span>}
    <span className={styles.play} aria-hidden="true"><Play size={30} fill="currentColor" /></span>
    {duration ? <span className={styles.duration}>{duration}</span> : null}
  </>;
}
export function VideoPlayer({ video, playing, onPlay }: { video: Video; playing: boolean; onPlay: () => void }) {
  return <div className={styles.player}>
    {playing ? <iframe title={`${video.title} の動画`} src={youtubeEmbedUrl(video.youtubeId)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button type="button" className={styles.posterButton} onClick={onPlay} aria-label={`${video.title}を再生`}><VideoPoster key={video.youtubeId + video.thumbnailUrl} video={video} /></button>}
  </div>;
}
