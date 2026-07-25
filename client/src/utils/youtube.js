const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/
const PLAYLIST_ID_PATTERN = /^[A-Za-z0-9_-]{10,100}$/

export function parseYouTubeUrl(value = '') {
  try {
    const parsed = new URL(value)
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '')
    const isYouTube = hostname === 'youtube.com'
      || hostname === 'm.youtube.com'
      || hostname === 'music.youtube.com'
      || hostname === 'youtube-nocookie.com'
    const isShortUrl = hostname === 'youtu.be'

    if (!isYouTube && !isShortUrl) return { videoId: null, playlistId: null }

    const pathParts = parsed.pathname.split('/').filter(Boolean)
    let videoId = null

    if (isShortUrl) {
      videoId = pathParts[0] || null
    } else if (parsed.pathname === '/watch') {
      videoId = parsed.searchParams.get('v')
    } else if (['embed', 'shorts', 'live', 'v'].includes(pathParts[0])) {
      videoId = pathParts[1] === 'videoseries' ? null : pathParts[1]
    }

    const playlistId = parsed.searchParams.get('list')

    return {
      videoId: VIDEO_ID_PATTERN.test(videoId || '') ? videoId : null,
      playlistId: PLAYLIST_ID_PATTERN.test(playlistId || '') ? playlistId : null,
    }
  } catch {
    return { videoId: null, playlistId: null }
  }
}

export function getYouTubeMedia(course = {}) {
  const parsed = parseYouTubeUrl(course.youtubeUrl)
  return {
    videoId: parsed.videoId || course.youtubeId || null,
    playlistId: parsed.playlistId || course.youtubePlaylistId || null,
  }
}

export function getYouTubeEmbedUrl(course = {}, { autoplay = false } = {}) {
  const { videoId, playlistId } = getYouTubeMedia(course)
  if (!videoId && !playlistId) return ''

  const target = playlistId ? 'videoseries' : videoId
  const params = new URLSearchParams()
  if (playlistId) params.set('list', playlistId)
  if (autoplay) params.set('autoplay', '1')
  params.set('rel', '0')

  return `https://www.youtube-nocookie.com/embed/${target}?${params.toString()}`
}

export function getYouTubeAutoThumbnail(course = {}) {
  const { videoId } = getYouTubeMedia(course)
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ''
}

export function getCourseThumbnail(course = {}) {
  return course.thumbnail || getYouTubeAutoThumbnail(course)
}
