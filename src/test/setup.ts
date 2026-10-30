import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, expect, vi } from 'vitest'

// Any console.error / console.warn during a test fails it
// (React act() warnings, duplicate keys, jsdom "not implemented", ...).
let errorSpy: ReturnType<typeof vi.spyOn>
let warnSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  const errors = errorSpy.mock.calls
  const warns = warnSpy.mock.calls
  expect(errors, 'console.error was called').toEqual([])
  expect(warns, 'console.warn was called').toEqual([])
})
