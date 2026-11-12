/** Test double for AudioContext: records the nodes made, enough to check graph and gain values. */
export interface MockParam {
  value: number
  peak: number
  /** Time of the first scheduled value and of the last exponential ramp end (Infinity = never ends). */
  start: number
  end: number
  cancelScheduledValues: (t: number) => void
  setValueAtTime: (v: number, t: number) => void
  linearRampToValueAtTime: (v: number, t: number) => void
  exponentialRampToValueAtTime: (v: number, t: number) => void
}
export interface MockNode {
  kind: string
  connections: MockNode[]
  connect: (n: MockNode) => MockNode
  [k: string]: unknown
}

export const makeMockContext = (initial: AudioContextState = 'suspended') => {
  const nodes: MockNode[] = []
  const param = (): MockParam => {
    const p: MockParam = {
      value: 1,
      peak: 0,
      start: Infinity,
      end: Infinity,
      cancelScheduledValues: () => {},
      setValueAtTime: (v, t) => {
        p.value = v
        p.start = Math.min(p.start, t)
      },
      linearRampToValueAtTime: v => {
        p.value = v
        p.peak = Math.max(p.peak, v)
      },
      exponentialRampToValueAtTime: (v, t) => {
        p.value = v
        p.end = t
      },
    }
    return p
  }
  const node = (
    kind: string,
    extra: Record<string, unknown> = {}
  ): MockNode => {
    const n: MockNode = {
      kind,
      connections: [],
      connect: (to: MockNode) => {
        n.connections.push(to)
        return to
      },
      start: () => {},
      stop: () => {},
      ...extra,
    }
    nodes.push(n)
    return n
  }
  const destination = node('destination')
  const ctx = {
    state: initial,
    currentTime: 0,
    sampleRate: 8000,
    destination,
    resumeCalls: 0,
    listeners: [] as ((e: unknown) => void)[],
    addEventListener: (_t: string, f: (e: unknown) => void) => {
      ctx.listeners.push(f)
    },
    removeEventListener: (_t: string, f: (e: unknown) => void) => {
      ctx.listeners = ctx.listeners.filter(x => x !== f)
    },
    resume: async () => {
      ctx.resumeCalls++
      ctx.state = 'running'
    },
    createGain: () => node('gain', { gain: param() }),
    createOscillator: () =>
      node('oscillator', { type: 'sine', frequency: param() }),
    createBiquadFilter: () =>
      node('biquad', { type: 'lowpass', frequency: param(), Q: param() }),
    createBufferSource: () => node('buffersource', { buffer: null }),
    createBuffer: (_c: number, len: number) => ({
      getChannelData: () => new Float32Array(len),
    }),
  }
  return { ctx: ctx as unknown as AudioContext, raw: ctx, nodes }
}
