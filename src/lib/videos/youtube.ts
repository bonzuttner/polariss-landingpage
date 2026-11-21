const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com']);

export function youtubeIdFromUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const parts = url.pathname.split('/').filter(Boolean);
    let id: string | null = null;
    if (url.hostname === 'youtu.be') {
      if (parts.length === 1) id = parts[0];
    } else if (YOUTUBE_HOSTS.has(url.hostname)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v');
      else if (parts.length === 2 && ['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1];
    }
    return id && VIDEO_ID.test(id) ? id : null;
  } catch { return null; }
}
export function youtubeWatchUrl(id: string) { return `https://www.youtube.com/watch?v=${id}`; }
export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
}
export function videoThumbnail(video: { youtubeId: string; thumbnailUrl: string }) {
  return video.thumbnailUrl || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
}
export function formatVideoDuration(seconds: number | null): string | null {
  if (!seconds) return null;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const tail = String(seconds % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${tail}` : `${minutes}:${tail}`;
}
