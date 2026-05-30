import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCountUp } from '../../hooks/useCountUp'

describe('useCountUp', () => {
  let rafCallbacks = []
  let currentTime = 0

  beforeEach(() => {
    rafCallbacks = []
    currentTime = 0

    vi.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb)
      return rafCallbacks.length
    })
    vi.spyOn(global, 'cancelAnimationFrame').mockImplementation(() => {})
    vi.spyOn(performance, 'now').mockReturnValue(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function flush(timestamp = 0) {
    const cbs = [...rafCallbacks]
    rafCallbacks = []
    cbs.forEach((cb) => cb(timestamp))
  }

  it('starts at 0', () => {
    const { result } = renderHook(() => useCountUp(100))
    expect(result.current).toBe(0)
  })

  it('does not animate when trigger is false', () => {
    const { result } = renderHook(() => useCountUp(100, 2000, false))
    act(() => flush(0))
    expect(result.current).toBe(0)
  })

  it('reaches the target value when animation completes', () => {
    const { result } = renderHook(() => useCountUp(50, 1000, true))
    // Simulate animation completing (elapsed >= duration)
    act(() => flush(2000))
    expect(result.current).toBe(50)
  })

  it('returns a number type', () => {
    const { result } = renderHook(() => useCountUp(42))
    expect(typeof result.current).toBe('number')
  })

  it('handles float targets', () => {
    const { result } = renderHook(() => useCountUp(3.7, 1000, true))
    act(() => flush(2000))
    expect(result.current).toBe(3.7)
  })

  it('re-runs animation when trigger changes from false to true', () => {
    const { result, rerender } = renderHook(
      ({ trigger }) => useCountUp(10, 500, trigger),
      { initialProps: { trigger: false } }
    )
    expect(result.current).toBe(0)
    rerender({ trigger: true })
    act(() => flush(1000))
    expect(result.current).toBe(10)
  })
})
