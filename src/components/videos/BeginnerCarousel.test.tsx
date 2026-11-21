import { fireEvent, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { Video } from '@/lib/videos/types';
import { BeginnerCarousel } from './BeginnerCarousel';

vi.mock('./VideoPlayer', () => ({ VideoPlayer: ({ video }: { video: Video }) => <div>{video.title}のプレーヤー</div>, VideoPoster: () => <span>サムネイル</span> }));
const videos: Video[] = ['紹介A', '紹介B', '紹介C'].map((title, index) => ({ id: String(index), title, description: '', youtubeId: 'M7lc1UVf-VE', category: 'beginner', channelName: '', durationSeconds: null, thumbnailUrl: '', showOnHome: false, sortOrder: index, status: 'published', updatedAt: '' }));
const originalScroll = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView');
beforeAll(() => { Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() }); });
afterAll(() => { if (originalScroll) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScroll); else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView'); });
describe('beginner video selection', () => {
  it('switches explicitly without starting playback and handles removal of the selected last video', () => {
    const stop = vi.fn();
    const { rerender } = render(<BeginnerCarousel videos={videos} playingId={null} onPlay={stop} />);
    fireEvent.click(screen.getByRole('button', { name: '次の動画' }));
    fireEvent.click(screen.getByRole('button', { name: '次の動画' }));
    expect(screen.getByText('紹介Cのプレーヤー')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '次の動画' })).toBeDisabled();
    expect(stop).toHaveBeenLastCalledWith(null);
    rerender(<BeginnerCarousel videos={videos.slice(0, 1)} playingId={null} onPlay={stop} />);
    expect(screen.getByText('紹介Aのプレーヤー')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '次の動画' })).not.toBeInTheDocument();
    rerender(<BeginnerCarousel videos={[]} playingId={null} onPlay={stop} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
