export interface ParsedVideo {
  type: 'youtube' | 'vimeo' | 'mp4' | 'unknown';
  embedUrl?: string;
  directUrl?: string;
  videoId?: string;
  isShorts?: boolean;
}

/**
 * Parses raw video URLs (YouTube, YouTube Shorts, Vimeo, direct MP4/WebM)
 * and generates clean embed or direct playback configurations.
 */
export function parseVideoUrl(rawUrl?: string): ParsedVideo | null {
  if (!rawUrl) return null;
  const url = rawUrl.trim();

  // 1. Direct video file (.mp4, .webm, .ogg, .mov)
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
    return {
      type: 'mp4',
      directUrl: url
    };
  }

  // 2. YouTube Shorts: youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
  if (shortsMatch && shortsMatch[1]) {
    const videoId = shortsMatch[1];
    return {
      type: 'youtube',
      videoId,
      isShorts: true,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`
    };
  }

  // 3. YouTube standard watch or share link (youtube.com/watch?v=, youtu.be/)
  const watchMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (watchMatch && watchMatch[1]) {
    const videoId = watchMatch[1];
    return {
      type: 'youtube',
      videoId,
      isShorts: false,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`
    };
  }

  // 4. Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      type: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1`
    };
  }

  // 5. Already an embed url
  if (url.includes('youtube') && url.includes('embed')) {
    return {
      type: 'youtube',
      embedUrl: url
    };
  }

  return {
    type: 'unknown',
    directUrl: url
  };
}
