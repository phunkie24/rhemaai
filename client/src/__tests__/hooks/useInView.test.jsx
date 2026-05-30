import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, renderHook, act } from '@testing-library/react'
import React from 'react'
import { useInView } from '../../hooks/useInView'

describe('useInView', () => {
  let callbackRef
  let observerInstance

  beforeEach(() => {
    observerInstance = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }
    global.IntersectionObserver = vi.fn((callback) => {
      callbackRef = callback
      return observerInstance
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns an object with ref and inView', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current).toHaveProperty('ref')
    expect(result.current).toHaveProperty('inView')
  })

  it('inView is false initially', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current.inView).toBe(false)
  })

  it('creates an IntersectionObserver when ref is attached to a DOM element', () => {
    function TestEl() {
      const { ref } = useInView()
      return React.createElement('div', { ref })
    }
    render(React.createElement(TestEl))
    expect(global.IntersectionObserver).toHaveBeenCalled()
  })

  it('calls observe on the target element', () => {
    function TestEl() {
      const { ref } = useInView()
      return React.createElement('div', { ref })
    }
    render(React.createElement(TestEl))
    expect(observerInstance.observe).toHaveBeenCalled()
  })

  it('disconnects the observer on unmount', () => {
    function TestEl() {
      const { ref } = useInView()
      return React.createElement('div', { ref })
    }
    const { unmount } = render(React.createElement(TestEl))
    unmount()
    expect(observerInstance.disconnect).toHaveBeenCalled()
  })

  it('sets inView to true when element intersects', () => {
    let hookResult
    function TestEl() {
      hookResult = useInView()
      return React.createElement('div', { ref: hookResult.ref })
    }
    render(React.createElement(TestEl))
    act(() => {
      if (callbackRef) callbackRef([{ isIntersecting: true }])
    })
    expect(hookResult.inView).toBe(true)
  })
})
