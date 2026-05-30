import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal()

  const htmlTags = [
    'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'section',
    'article', 'nav', 'ul', 'li', 'a', 'button', 'form', 'input', 'header', 'footer',
  ]

  const motionPropsToStrip = new Set([
    'initial', 'animate', 'exit', 'transition', 'variants',
    'whileHover', 'whileInView', 'viewport', 'whileTap',
  ])

  const motion = {}
  htmlTags.forEach((tag) => {
    const MockEl = React.forwardRef((props, ref) => {
      const clean = {}
      for (const [k, v] of Object.entries(props)) {
        if (!motionPropsToStrip.has(k)) clean[k] = v
      }
      return React.createElement(tag, { ...clean, ref })
    })
    MockEl.displayName = `motion.${tag}`
    motion[tag] = MockEl
  })

  return {
    ...actual,
    motion,
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useInView: () => [null, true],
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  }
})

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

global.scrollTo = vi.fn()

const originalError = console.error
beforeEach(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) return
    originalError(...args)
  }
})

afterEach(() => {
  console.error = originalError
})
