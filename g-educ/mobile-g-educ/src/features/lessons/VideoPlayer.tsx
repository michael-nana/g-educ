import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../../theme/colors';

type VideoPlayerProps = {
  url: string;
  onProgress?: (currentTime: number, duration: number) => void;
};

const WEBVIEW_BASE_URL = 'https://mobile-g-educ.local/';

function htmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function embeddedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let videoId = '';
    if (host === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] ?? '';
    } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      videoId = url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ?? '';
    } else if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      videoId = url.pathname.match(/(?:video\/)?(\d+)/)?.[1] ?? '';
      if (!/^\d+$/.test(videoId)) videoId = '';
      if (videoId) return `https://player.vimeo.com/video/${videoId}`;
    }
    return /^[\w-]{6,20}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0&origin=${encodeURIComponent(WEBVIEW_BASE_URL.slice(0, -1))}`
      : null;
  } catch {
    return null;
  }
}

export function VideoPlayer({ url, onProgress }: VideoPlayerProps) {
  const [mediaError, setMediaError] = useState(false);
  const isLocalFile = url.startsWith('file://');
  const localDirectoryUrl = isLocalFile ? url.slice(0, url.lastIndexOf('/') + 1) : undefined;
  const html = useMemo(() => {
    const embed = embeddedUrl(url);
    const media = embed
      ? `<iframe src="${htmlEscape(embed)}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`
      : `<video id="lesson-video" controls playsinline preload="metadata" src="${htmlEscape(url)}"></video>`;
    const progressScript = embed ? '' : `const video=document.getElementById('lesson-video');video.addEventListener('error',()=>{document.getElementById('error').textContent='Cette vidéo ne peut pas être lue. Vérifie que le lien pointe vers un fichier MP4 ou HLS accessible.';window.ReactNativeWebView.postMessage(JSON.stringify({type:'error'}))});setInterval(()=>{if(video.duration>0&&!video.paused)window.ReactNativeWebView.postMessage(JSON.stringify({type:'progress',currentTime:video.currentTime,duration:video.duration}))},5000);`;
    return `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;background:#111}body{display:flex;align-items:center;justify-content:center}video,iframe{display:block;width:100%;height:100%;border:0;object-fit:contain}#error{position:absolute;left:12px;right:12px;bottom:12px;color:#fff;background:#8b2525;border-radius:8px;padding:8px;font:13px sans-serif}</style></head><body>${media}<div id="error"></div><script>${progressScript}</script></body></html>`;
  }, [url]);
  const webViewSource = useMemo(
    () => ({ html, baseUrl: localDirectoryUrl ?? WEBVIEW_BASE_URL }),
    [html, localDirectoryUrl],
  );

  function handleMessage(data: string) {
    try {
      const message = JSON.parse(data) as { type: string; currentTime?: number; duration?: number };
      if (message.type === 'error') setMediaError(true);
      if (message.type === 'progress' && message.currentTime && message.duration) {
        onProgress?.(message.currentTime, message.duration);
      }
    } catch {
      setMediaError(true);
    }
  }

  return (
    <View style={styles.container}>
      <WebView
        source={webViewSource}
        originWhitelist={isLocalFile ? ['file://*', 'about:blank'] : ['https://*', 'about:blank']}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={isLocalFile}
        allowFileAccessFromFileURLs={isLocalFile}
        allowingReadAccessToURL={localDirectoryUrl}
        onMessage={(event) => handleMessage(event.nativeEvent.data)}
        onError={() => setMediaError(true)}
        style={styles.player}
      />
      {mediaError && <Text style={styles.error}>Impossible de lire cette vidéo. Vérifie le lien ou réessaie plus tard.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: 220, overflow: 'hidden', borderRadius: 16, backgroundColor: '#111' },
  player: { backgroundColor: '#111' },
  error: { color: '#fff', backgroundColor: colors.danger, padding: 10, fontSize: 12 },
});
