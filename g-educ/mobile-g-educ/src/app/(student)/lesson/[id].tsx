import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../../components/ui/Screen';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import { ErrorState, LoadingState } from '../../../components/ui/Feedback';
import { studentService } from '../../../services/student.service';
import type { Lesson } from '../../../services/types';
import { useRemoteData } from '../../../hooks/useRemoteData';
import { colors } from '../../../theme/colors';
import { VideoPlayer } from '../../../features/lessons/VideoPlayer';
import { OfflineDownloadButton } from '../../../features/lessons/OfflineDownloadButton';
import { useAppDialog } from '../../../components/ui/AppDialog';
import { useAuth } from '../../../state/AuthProvider';
import { offlineSync } from '../../../services/offline-sync';

function Markdown({ content }: { content: string }) {
  const blocks = content.replace(/\r/g, '').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean);
  if (!blocks.length) return <Text style={styles.prose}>Le contenu de cette leçon n’est pas encore disponible.</Text>;
  return <View>{blocks.map((block, i) => {
    const heading = block.match(/^(#{1,3})\s+(.+)$/);
    if (heading) return <Text key={i} style={[styles.heading, heading[1].length > 2 && styles.subheading]}>{heading[2]}</Text>;
    if (/^([-*]\s|\d+\.\s)/.test(block)) return <View key={i} style={styles.list}>{block.split('\n').map((line, n) => <Text key={n} style={styles.listItem}>•  {line.replace(/^([-*]|\d+\.)\s+/, '')}</Text>)}</View>;
    return <Text key={i} style={styles.prose}>{block.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/`([^`]+)`/g, '$1')}</Text>;
  })}</View>;
}
export default function LessonDetail() {
  const { showDialog } = useAppDialog();
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(() => studentService.lesson(id), [id]);
  const { data, loading, error, reload, setData } = useRemoteData(load, [id], user?.id ? `student-${user.id}-lesson-${id}` : undefined);
  const [favorite, setFavorite] = useState(false);
  const [busy, setBusy] = useState(false);
  const [playedVideoProgress, setPlayedVideoProgress] = useState({ lessonId: id, percent: 0 });
  const [upNextResult, setUpNextResult] = useState<{ lessonId: string; items: Lesson[] } | null>(null);
  const lastProgressSent = useRef(0);
  useEffect(() => {
    lastProgressSent.current = data?.myProgress?.progressPercent ?? 0;
  }, [data?.id, data?.myProgress?.progressPercent]);
  useEffect(() => {
    let active = true;
    if (data?.type !== 'VIDEO' || !data.chapterId) return () => { active = false; };
    studentService.lessons({ chapterId: data.chapterId, type: 'VIDEO' })
      .then((items) => {
        if (!active) return;
        setUpNextResult({ lessonId: data.id, items: items
          .filter((item) => item.id !== data.id && (data.position == null || item.position == null || item.position > data.position))
          .sort((a, b) => (a.position ?? 0) - (b.position ?? 0)) });
      })
      .catch(() => { if (active) setUpNextResult({ lessonId: data.id, items: [] }); });
    return () => { active = false; };
  }, [data?.id, data?.chapterId, data?.position, data?.type]);
  useEffect(() => { let active = true; studentService.lessons({ favorite: true }).then(items => { if (active) setFavorite(items.some(item => item.id === id)); }).catch(() => undefined); return () => { active = false; }; }, [id]);
  async function toggleFavorite() { try { await studentService.setFavorite(id, !favorite); setFavorite(!favorite); } catch (e) { showDialog('Action impossible', e instanceof Error ? e.message : 'Réessaie plus tard.'); } }
  async function completeLesson() {
    if (!user) return;
    setBusy(true);
    try {
      const result = await offlineSync.enqueueLessonProgress(user.id, id, 100);
      setData((current) => current ? { ...current, myProgress: { ...current.myProgress, progressPercent: 100, completedAt: current.myProgress?.completedAt ?? null } } : current);
      const response = result.lastSync?.response;
      const streak = response?.streak?.currentStreak ?? response?.activity?.currentStreak ?? 0;
      if (response?.newlyCompleted && response.activity?.streakUpdated && streak > 0) {
        router.push({
          pathname: '/(student)/streak',
          params: { celebrate: '1', from: String(Math.max(0, streak - 1)), to: String(streak) },
        });
      } else {
        showDialog(result.lessonPending ? 'Progression enregistrée hors ligne' : 'Leçon terminée', result.lessonPending
          ? 'Ta progression sera synchronisée automatiquement dès que la connexion reviendra.'
          : 'Ta progression a été enregistrée.');
      }
    }
    catch (e) { showDialog('Action impossible', e instanceof Error ? e.message : 'Réessaie plus tard.'); }
    finally { setBusy(false); }
  }
  async function recordVideoProgress(currentTime: number, duration: number) {
    if (!Number.isFinite(currentTime) || !Number.isFinite(duration) || duration <= 0) return;
    const percentage = Math.min(100, Math.floor((currentTime / duration) * 100));
    setPlayedVideoProgress((current) => ({ lessonId: id, percent: Math.max(current.lessonId === id ? current.percent : 0, percentage) }));
    if (percentage < 1 || percentage < lastProgressSent.current + 5) return;
    if (!user) return;
    try {
      const result = await offlineSync.enqueueLessonProgress(user.id, id, percentage, Math.floor(currentTime));
      lastProgressSent.current = percentage;
      if (result.lastSync?.response.completed) {
        setPlayedVideoProgress({ lessonId: id, percent: 100 });
        await reload();
        showDialog(result.lessonPending ? 'Progression enregistrée hors ligne' : 'Vidéo terminée', result.lessonPending
          ? 'Ta progression sera synchronisée automatiquement dès que la connexion reviendra.'
          : 'Ta progression a été enregistrée.');
      }
    } catch {
      // La lecture continue; la prochaine mise à jour de progression réessaiera.
    }
  }
  const currentPlayedVideoProgress = playedVideoProgress.lessonId === data?.id ? playedVideoProgress.percent : 0;
  const upNextVideos = upNextResult && upNextResult.lessonId === data?.id ? upNextResult.items : [];
  const videoProgress = Math.max(data?.myProgress?.progressPercent ?? 0, currentPlayedVideoProgress);
  const completed = data?.type === 'VIDEO'
    ? Boolean(data.myProgress?.completedAt) || videoProgress >= 80
    : (data?.myProgress?.progressPercent ?? 0) >= 100;
  const videoAsset = data?.assets?.find((asset) => asset.kind === 'VIDEO');
  const videoSource = data?.videoUrl ?? videoAsset?.downloadUrl;
  const videoDownloadUrl = videoAsset?.downloadUrl ?? (data?.videoUrl && /\.mp4(?:$|[?#])/i.test(data.videoUrl) ? data.videoUrl : null);
  return <Screen back title={data?.title ?? 'Leçon'} subtitle={data?.chapter?.title ?? 'Lecture'}>
    {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : <>
      <View style={styles.meta}><Text style={styles.badge}>{data?.type === 'PDF' ? 'DOCUMENT PDF' : data?.type === 'VIDEO' ? 'VIDÉO' : 'COURS'}</Text><Text style={styles.reading}>{data?.durationSeconds ? `${Math.max(1, Math.round(data.durationSeconds / 60))} min` : 'À ton rythme'}</Text></View>
      {data?.type === 'VIDEO' && videoSource && <VideoPlayer url={videoSource} onProgress={(currentTime, duration) => void recordVideoProgress(currentTime, duration)} />}
      {data?.type === 'VIDEO' && videoDownloadUrl && <OfflineDownloadButton downloadKey={`video-${data.id}`} lessonId={data.id} title={data.title} kind="VIDEO" url={videoDownloadUrl} mimeType={videoAsset?.mimeType ?? 'video/mp4'} />}
      {data?.type === 'VIDEO' && !videoDownloadUrl && <Text style={styles.pdfNote}>Les vidéos YouTube/Vimeo ne peuvent pas être enregistrées hors ligne. Seules les vidéos MP4 peuvent être téléchargées.</Text>}
      {data?.type === 'VIDEO' && !videoSource && <Panel><Text style={styles.prose}>La vidéo de cette leçon n’est pas encore disponible.</Text></Panel>}
      {data?.type === 'PDF' && data.assets?.length ? data.assets.map(asset => <View key={asset.id}><Pressable onPress={() => router.push({ pathname: '/(student)/pdf/[id]', params: { id: asset.id, lessonId: data.id, url: asset.downloadUrl, title: asset.name ?? data.title } })}><Panel style={styles.document}><View style={styles.pdfIcon}><Text style={styles.pdfText}>PDF</Text></View><View style={{ flex: 1 }}><Text style={styles.documentTitle}>{asset.name ?? 'Lire le document'}</Text><Text style={styles.documentSubtitle}>Lire dans l’application</Text></View><Text style={styles.open}>↗</Text></Panel></Pressable><OfflineDownloadButton downloadKey={asset.id} lessonId={data.id} title={asset.name ?? data.title} kind="PDF" url={asset.downloadUrl} mimeType={asset.mimeType ?? 'application/pdf'} /></View>) : null}
      {data?.type === 'VIDEO' && upNextVideos.length > 0 && <View style={{ marginTop: 20, marginBottom: 10 }}><Text style={{ color: colors.textSecondary, fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 8 }}>VIDÉOS À SUIVRE</Text>{upNextVideos.map((video, index) => <Pressable key={video.id} onPress={() => router.replace({ pathname: '/(student)/lesson/[id]', params: { id: video.id } })} style={({ pressed }) => [{ minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, backgroundColor: colors.soft, marginBottom: 8 }, pressed && { opacity: .7 }]}><View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 13 }}>▶</Text></View><View style={{ flex: 1 }}><Text numberOfLines={2} style={{ color: colors.ink, fontSize: 13, fontWeight: '700', lineHeight: 18 }}>{video.title}</Text><Text style={{ color: colors.textSecondary, fontSize: 10, marginTop: 4 }}>{video.durationSeconds ? `${Math.max(1, Math.round(video.durationSeconds / 60))} min` : `Vidéo ${index + 1}`}</Text></View><Text style={{ color: colors.textSecondary, fontSize: 24 }}>›</Text></Pressable>)}</View>}
      {!!data?.contentMarkdown && <Panel style={styles.content}><Markdown content={data.contentMarkdown} /></Panel>}
      {!data?.contentMarkdown && !data?.assets?.length && data?.type !== 'VIDEO' && <Panel><Markdown content="" /></Panel>}
      {(data?.myProgress?.progressPercent || (data?.type === 'VIDEO' && videoProgress > 0)) ? <Panel style={styles.progressPanel}><Text style={styles.progressLabel}>TA PROGRESSION</Text><View style={styles.track}><View style={[styles.fill, { width: `${Math.min(data?.type === 'VIDEO' ? videoProgress : data?.myProgress?.progressPercent ?? 0, 100)}%` }]} /></View><Text style={styles.progressValue}>{data?.type === 'VIDEO' ? videoProgress : data?.myProgress?.progressPercent}% consulté</Text></Panel> : null}
      <Button variant="light" onPress={toggleFavorite} style={{ marginBottom: 10 }}>{favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</Button>
      {(data?.type === 'TEXTE' || data?.type === 'PDF') && <Button onPress={completeLesson} loading={busy} disabled={completed}>{completed ? 'Cours terminé ✓' : 'Marquer le cours comme terminé'}</Button>}
      {data?.type === 'VIDEO' && <Button onPress={completeLesson} loading={busy} disabled={completed || !videoSource}>{completed ? 'Vidéo terminée ✓' : 'Marquer la vidéo comme terminée'}</Button>}
      {data?.type === 'PDF' && <Text style={styles.pdfNote}>Après ta lecture, marque le cours comme terminé pour enregistrer ta progression.</Text>}
    </>}
  </Screen>;
}
const styles = StyleSheet.create({ meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }, badge: { color: colors.ink, backgroundColor: colors.soft, overflow: 'hidden', paddingHorizontal: 11, paddingVertical: 7, borderRadius: 999, fontSize: 9, fontWeight: '800', letterSpacing: .8 }, reading: { color: colors.textSecondary, fontSize: 11 }, content: { paddingVertical: 21, paddingHorizontal: 19 }, heading: { color: colors.ink, fontSize: 21, lineHeight: 28, fontWeight: '800', marginTop: 5, marginBottom: 12 }, subheading: { fontSize: 17, lineHeight: 23, marginTop: 5 }, prose: { color: colors.ink, fontSize: 15, lineHeight: 25, marginBottom: 14 }, list: { marginBottom: 14, gap: 7 }, listItem: { color: colors.ink, fontSize: 14, lineHeight: 22 }, document: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }, pdfIcon: { height: 42, width: 42, borderRadius: 13, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' }, pdfText: { color: '#fff', fontSize: 10, fontWeight: '800' }, documentTitle: { color: colors.ink, fontSize: 13, fontWeight: '700' }, documentSubtitle: { color: colors.textSecondary, fontSize: 10, marginTop: 4 }, open: { color: colors.ink, fontSize: 18 }, progressPanel: { marginBottom: 12 }, progressLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, track: { height: 6, borderRadius: 4, backgroundColor: colors.soft, marginTop: 11, overflow: 'hidden' }, fill: { height: '100%', backgroundColor: colors.ink, borderRadius: 4 }, progressValue: { color: colors.ink, fontWeight: '700', fontSize: 11, marginTop: 7 }, pdfNote: { textAlign: 'center', color: colors.textSecondary, fontSize: 10, lineHeight: 16, marginTop: 11 } });
