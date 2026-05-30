import { useEffect, useRef, useState } from 'react'

/**
 * useInView — triggers when element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} once   - fire only once (default: true)
 */
export function useInView(options = {}, once = true) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, options])

  return { ref, inView }
}

export default useInView
