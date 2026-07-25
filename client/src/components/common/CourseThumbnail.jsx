import { useEffect, useMemo, useState } from 'react'
import enterpriseOpsImage from '../../assets/enterprise-ai-operations.webp'
import { getCourseThumbnail, getYouTubeAutoThumbnail } from '@utils/youtube'

export default function CourseThumbnail({ course, alt = '', ...props }) {
  const sources = useMemo(() => (
    [...new Set([
      getCourseThumbnail(course),
      getYouTubeAutoThumbnail(course),
      enterpriseOpsImage,
    ].filter(Boolean))]
  ), [course])
  const [sourceIndex, setSourceIndex] = useState(0)

  useEffect(() => {
    setSourceIndex(0)
  }, [sources])

  const handleError = () => {
    setSourceIndex((current) => Math.min(current + 1, sources.length - 1))
  }

  return (
    <img
      {...props}
      src={sources[sourceIndex] || enterpriseOpsImage}
      alt={alt}
      onError={handleError}
    />
  )
}
