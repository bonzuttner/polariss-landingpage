'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import { AsyncButton } from '@/components/ui/AsyncButton';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { videoCategories, type Video } from '@/lib/videos/types';
import { videoInputSchema, type VideoEditorInput } from '@/lib/videos/validation';
import { formatVideoDuration, youtubeWatchUrl } from '@/lib/videos/youtube';
import './video-editor.css';

export function VideoEditor({ video }: { video?: Video }) {
  const router = useRouter();
  const busy = useRef(false);
  const [form, setForm] = useState<VideoEditorInput>({ title: video?.title ?? '', description: video?.description ?? '', youtubeUrl: video ? youtubeWatchUrl(video.youtubeId) : '', category: video?.category ?? 'beginner', channelName: video?.channelName ?? '', durationSeconds: video?.durationSeconds ?? null, thumbnailUrl: video?.thumbnailUrl ?? '', showOnHome: video?.showOnHome ?? false, sortOrder: video?.sortOrder ?? 0, status: video?.status ?? 'draft' });
  const [duration, setDuration] = useState(formatVideoDuration(form.durationSeconds) ?? '');
  const [saving, setSaving] = useState(false), [deleting, setDeleting] = useState(false), [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState(''), [saved, setSaved] = useState(false);
  const change = <K extends keyof VideoEditorInput>(field: K, value: VideoEditorInput[K]) => { setForm((old) => ({ ...old, [field]: value })); setSaved(false); };
  async function save(event: FormEvent) {
    event.preventDefault();
    if (busy.current) return;
    setError(''); setSaved(false);
    const parts = duration.trim().split(':');
    if (duration && !/^\d{1,2}:[0-5]\d(?::[0-5]\d)?$/.test(duration.trim())) { setError('再生時間は「1:30」または「1:02:30」の形式で入力してください。'); return; }
    const seconds = duration.trim() ? parts.reduce((total, part) => total * 60 + Number(part), 0) : null;
    const parsed = videoInputSchema.safeParse({ ...form, durationSeconds: seconds });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? '入力内容を確認してください。'); return; }
    busy.current = true; setSaving(true);
    try {
      const response = await fetch(video ? `/api/admin/videos/${video.id}` : '/api/admin/videos', { method: video ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed.data) });
      const result = await response.json();
      if (!response.ok) { setError(result.error ?? '保存できませんでした。'); return; }
      setSaved(true);
      if (!video) router.replace(`/admin/videos/${result.video.id}`);
      router.refresh();
    } catch { setError('通信に失敗しました。入力内容を保ったまま、もう一度お試しください。'); }
    finally { busy.current = false; setSaving(false); }
  }
  async function remove() {
    if (!video || busy.current) return;
    busy.current = true; setDeleting(true); setError('');
    try {
      const response = await fetch(`/api/admin/videos/${video.id}`, { method: 'DELETE' });
      if (!response.ok) { setError('削除できませんでした。'); return; }
      router.push('/admin/videos'); router.refresh();
    } catch { setError('通信に失敗しました。もう一度お試しください。'); }
    finally { busy.current = false; setDeleting(false); setConfirmOpen(false); }
  }
  return <form className="video-editor editor-panel" onSubmit={save}>
    <label className="field"><span>タイトル（必須）</span><input required maxLength={160} value={form.title} onChange={(e) => change('title', e.target.value)} /></label>
    <label className="field"><span>YouTube動画URL（必須）</span><input required type="url" placeholder="https://www.youtube.com/watch?v=..." value={form.youtubeUrl} onChange={(e) => change('youtubeUrl', e.target.value)} /><small>共有URL・ショート動画・埋め込みURLにも対応しています。サムネイルは動画から自動で表示されます。</small></label>
    <label className="field"><span>説明文</span><textarea rows={4} maxLength={2000} value={form.description} onChange={(e) => change('description', e.target.value)} /></label>
    <div className="video-editor-columns">
      <label className="field"><span>カテゴリ</span><select value={form.category} onChange={(e) => change('category', e.target.value as Video['category'])}>{videoCategories.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
      <label className="field"><span>投稿元チャンネル名{form.category === 'related' ? '（必須）' : '（任意）'}</span><input required={form.category === 'related'} value={form.channelName} onChange={(e) => change('channelName', e.target.value)} /><small>外部の紹介・レビューは「関連動画」に登録し、実際の投稿元を明記してください。</small></label>
      <label className="field"><span>再生時間（任意）</span><input placeholder="1:30" value={duration} onChange={(e) => { setDuration(e.target.value); setSaved(false); }} /></label>
      <label className="field"><span>表示順（小さい順）</span><input type="number" required min={0} max={99999} value={form.sortOrder} onChange={(e) => change('sortOrder', Number(e.target.value))} /></label>
    </div>
    <label className="field"><span>独自サムネイルのURL（任意）</span><input placeholder="空欄の場合はYouTubeのサムネイルを使用" value={form.thumbnailUrl} onChange={(e) => change('thumbnailUrl', e.target.value)} /></label>
    <label className="video-editor-check"><input type="checkbox" checked={form.showOnHome} onChange={(e) => change('showOnHome', e.target.checked)} />TOPに掲載する（公開動画の先頭から最大3本）</label>
    <label className="field"><span>公開状態</span><select value={form.status} onChange={(e) => change('status', e.target.value as Video['status'])}><option value="draft">下書き</option><option value="published">公開する</option></select></label>
    {error ? <p className="form-error" role="alert">{error}</p> : null}{saved ? <p role="status">保存しました。</p> : null}
    <div className="form-actions"><AsyncButton className="button button-primary" type="submit" pending={saving} pendingLabel="保存中…" disabled={deleting}>保存する</AsyncButton><Link className="button button-dark" href="/admin/videos">一覧に戻る</Link>{video ? <AsyncButton className="button button-danger" type="button" disabled={saving} pending={deleting} onClick={() => setConfirmOpen(true)}>削除する</AsyncButton> : null}</div>
    <ConfirmDialog open={confirmOpen} title="動画を削除しますか？" message="この動画をサイトの掲載対象から削除します。YouTube上の動画は削除されません。" confirmLabel="削除する" cancelLabel="キャンセル" pending={deleting} onConfirm={remove} onCancel={() => setConfirmOpen(false)} />
  </form>;
}
