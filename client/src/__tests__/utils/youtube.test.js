import { describe, expect, it } from 'vitest'
import {
  getCourseThumbnail,
  getYouTubeEmbedUrl,
  parseYouTubeUrl,
} from '@utils/youtube'

describe('YouTube media helpers', () => {
  it('parses standard, short, shorts and live video URLs', () => {
    const urls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      'https://www.youtube.com/live/dQw4w9WgXcQ',
    ]

    urls.forEach((url) => {
      expect(parseYouTubeUrl(url).videoId).toBe('dQw4w9WgXcQ')
    })
  })

  it('creates a privacy-enhanced playlist embed URL', () => {
    const playlistId = 'PL1234567890abcdefghijklmnop'
    const embedUrl = getYouTubeEmbedUrl({
      youtubeUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
    })

    expect(embedUrl).toBe(
      `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0`
    )
  })

  it('prefers playlist playback for a watch URL that includes a list', () => {
    const playlistId = 'PL1234567890abcdefghijklmnop'
    const embedUrl = getYouTubeEmbedUrl({
      youtubeUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=${playlistId}`,
    })

    expect(embedUrl).toContain('/embed/videoseries?')
    expect(embedUrl).toContain(`list=${playlistId}`)
  })

  it('uses the reliable hqdefault thumbnail when no custom image is set', () => {
    expect(getCourseThumbnail({ youtubeId: 'dQw4w9WgXcQ' }))
      .toBe('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg')
  })

  it('does not create embeds for unsupported hosts', () => {
    expect(getYouTubeEmbedUrl({
      youtubeUrl: 'https://example.com/watch?v=dQw4w9WgXcQ',
    })).toBe('')
  })
})
