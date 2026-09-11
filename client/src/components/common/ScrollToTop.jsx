import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      let id = hash.slice(1)
      try { id = decodeURIComponent(id) } catch { /* retain malformed fragments as literal IDs */ }
      const target = document.getElementById(id)

      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'instant', block: 'start' })
        })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
