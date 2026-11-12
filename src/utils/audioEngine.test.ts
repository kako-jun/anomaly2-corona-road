import { describe, expect, it, vi } from 'vitest'
import {
  DEFAULT_VOLUME,
  createAudioEngine,
  installAudioUnlock,
} from './audioEngine'
import { makeMockContext } from './audioMock'

const setup = (opts: { volume?: number; muted?: boolean } = {}) => {
  const m = makeMockContext()
  const engine = createAudioEngine({ createContext: () => m.ctx, ...opts })
  return { m, engine }
}
const gainOf = (e: ReturnType<typeof createAudioEngine>) =>
  (e.master() as unknown as { gain: { value: number } }).gain.value

describe('audio engine', () => {
  it('creates nothing until unlocked', () => {
    const { m, engine } = setup()
    expect(engine.ctx()).toBeNull()
    expect(m.nodes).toHaveLength(1) // only the destination
  })

  it('unlock creates one shared context, resumes it and wires master -> destination', async () => {
    const { m, engine } = setup()
    await engine.unlock()
    await engine.unlock()
    expect(m.raw.state).toBe('running')
    expect(m.raw.resumeCalls).toBe(1)
    expect(engine.master()?.connect).toBeDefined()
    expect(
      (engine.master() as unknown as { connections: unknown[] }).connections
    ).toContain(m.raw.destination)
  })

  it('applies volume on creation and changes it afterwards', async () => {
    const { engine } = setup({ volume: 40 })
    await engine.unlock()
    expect(gainOf(engine)).toBeCloseTo(0.4)
    engine.setVolume(100)
    expect(gainOf(engine)).toBe(1)
    engine.setVolume(250)
    expect(engine.getVolume()).toBe(100)
    engine.setVolume(NaN)
    expect(engine.getVolume()).toBe(DEFAULT_VOLUME)
  })

  it('mute drives the master to 0 and unmute restores the volume', async () => {
    const { engine } = setup({ volume: 60 })
    await engine.unlock()
    engine.setMuted(true)
    expect(gainOf(engine)).toBe(0)
    expect(engine.isMuted()).toBe(true)
    engine.setMuted(false)
    expect(gainOf(engine)).toBeCloseTo(0.6)
  })

  it('mute set before unlock is honoured by the new master', async () => {
    const { engine } = setup({ muted: true })
    await engine.unlock()
    expect(gainOf(engine)).toBe(0)
  })

  it('stays silent and does not throw when AudioContext cannot be created', async () => {
    const engine = createAudioEngine({
      createContext: () => {
        throw new Error('nope')
      },
    })
    await expect(engine.unlock()).resolves.toBeUndefined()
    expect(engine.ctx()).toBeNull()
    expect(() => engine.setVolume(10)).not.toThrow()
    expect(() => engine.setMuted(true)).not.toThrow()
  })

  it('swallows a refused resume', async () => {
    const m = makeMockContext()
    m.raw.resume = async () => {
      throw new Error('blocked')
    }
    const engine = createAudioEngine({ createContext: () => m.ctx })
    await expect(engine.unlock()).resolves.toBeUndefined()
    expect(m.raw.state).toBe('suspended')
  })
})

describe('installAudioUnlock', () => {
  const doc = () => {
    const d = new EventTarget() as unknown as Document & {
      visibilityState: string
    }
    ;(d as { visibilityState: string }).visibilityState = 'visible'
    return d
  }

  it('unlocks on the first gesture', async () => {
    const { m, engine } = setup()
    const target = new EventTarget() as unknown as Window
    installAudioUnlock(engine, target, doc())
    target.dispatchEvent(new Event('pointerdown'))
    await vi.waitFor(() => expect(m.raw.state).toBe('running'))
  })

  it('resumes again on a later gesture and on return to visible after an interruption', async () => {
    const { m, engine } = setup()
    const target = new EventTarget() as unknown as Window
    const d = doc()
    installAudioUnlock(engine, target, d)
    target.dispatchEvent(new Event('keydown'))
    await vi.waitFor(() => expect(m.raw.state).toBe('running'))
    expect(m.raw.resumeCalls).toBe(1)
    // running: further gestures do nothing
    target.dispatchEvent(new Event('pointerdown'))
    expect(m.raw.resumeCalls).toBe(1)
    // iOS interrupts it in the background; coming back resumes it
    ;(m.raw as { state: string }).state = 'interrupted'
    d.dispatchEvent(new Event('visibilitychange'))
    await vi.waitFor(() => expect(m.raw.resumeCalls).toBe(2))
    expect(m.raw.state).toBe('running')
  })

  it('does not resume while the page is hidden', async () => {
    const { m, engine } = setup()
    const target = new EventTarget() as unknown as Window
    const d = doc()
    installAudioUnlock(engine, target, d)
    ;(d as { visibilityState: string }).visibilityState = 'hidden'
    d.dispatchEvent(new Event('visibilitychange'))
    await new Promise(r => setTimeout(r, 10))
    expect(m.raw.resumeCalls).toBe(0)
  })

  it('resumes when the context statechange leaves running', async () => {
    const { m, engine } = setup()
    const target = new EventTarget() as unknown as Window
    installAudioUnlock(engine, target, doc())
    target.dispatchEvent(new Event('pointerdown'))
    await vi.waitFor(() => expect(m.raw.state).toBe('running'))
    await vi.waitFor(() => expect(m.raw.listeners).toHaveLength(1))
    ;(m.raw as { state: string }).state = 'suspended'
    m.raw.listeners.forEach(f => f({}))
    await vi.waitFor(() => expect(m.raw.resumeCalls).toBe(2))
  })

  it('the remover takes every listener away', async () => {
    const { m, engine } = setup()
    const target = new EventTarget() as unknown as Window
    const d = doc()
    const spyT = vi.spyOn(target, 'removeEventListener')
    const spyD = vi.spyOn(d, 'removeEventListener')
    const remove = installAudioUnlock(engine, target, d)
    target.dispatchEvent(new Event('pointerdown'))
    await vi.waitFor(() => expect(m.raw.listeners).toHaveLength(1))
    remove()
    expect(spyT).toHaveBeenCalledTimes(3)
    expect(spyD).toHaveBeenCalledTimes(1)
    expect(m.raw.listeners).toHaveLength(0)
  })
})
