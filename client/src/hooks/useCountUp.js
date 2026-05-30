import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates a number from 0 to target when triggered
 */
export function useCountUp(target, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!trigger) return

    const start = performance.now()
    const isFloat = !Number.isInteger(target)

    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = eased * target
      setCount(isFloat ? parseFloat(value.toFixed(1)) : Math.floor(value))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
      else setCount(target)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, trigger])

  return count
}

export default useCountUp
