export const videoCategories = [
  { value: 'beginner', label: 'はじめての方へ' },
  { value: 'howto', label: '取り付け・使い方' },
  { value: 'demo', label: '機能の実演' },
  { value: 'stories', label: '利用者・導入事例' },
  { value: 'related', label: '関連動画' },
] as const;
export type VideoCategory = (typeof videoCategories)[number]['value'];
export type VideoFilter = 'all' | VideoCategory;
export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: VideoCategory;
  channelName: string;
  durationSeconds: number | null;
  thumbnailUrl: string;
  showOnHome: boolean;
  sortOrder: number;
  status: 'draft' | 'published';
  updatedAt: string;
}
export function categoryLabel(category: VideoCategory) {
  return videoCategories.find((item) => item.value === category)?.label ?? category;
}
export function parseVideoFilter(value?: string): VideoFilter {
  return videoCategories.some((item) => item.value === value) ? value as VideoCategory : 'all';
}
