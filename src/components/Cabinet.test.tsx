// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Feedback } from '../hooks/useGameState'
import { makeCameras, makeStats } from '../test/factories'
import { gameAudio } from '../utils/audioEngine'
import * as synth from '../utils/synthSounds'
import * as voice from '../utils/voiceSounds'
import { saveVolume } from '../utils/audioSettings'
import { load } from '../utils/saveData'
import { Cabinet } from './Cabinet'

// canvas-based child; jsdom has no canvas.
vi.mock('./NoiseCanvas', () => ({ NoiseCanvas: () => null }))

// Record what the cabinet hands to the subtitle hook (the hook itself has its own tests).
const subtitleInputs = vi.hoisted(
  () => [] as import('../hooks/useSubtitle').SubtitleInput[]
)
const subtitleCalls = vi.hoisted(() => [] as (number | null)[])
vi.mock('../hooks/useSubtitle', () => ({
  useSubtitle: (input: import('../hooks/useSubtitle').SubtitleInput) => {
    subtitleInputs.push(input)
    subtitleCalls.push(input.wrongFeedbackId)
    return { text: '', visible: false }
  },
}))

const cameras = makeCameras(8)

const makeProps = (
  over: Partial<ComponentProps<typeof Cabinet>> = {}
): ComponentProps<typeof Cabinet> => ({
  stats: makeStats(),
  cameras,
  currentCameraIndex: 0,
  currentCamera: cameras[0],
  unreportedCount: 0,
  feedback: null,
  gameTime: '00:00',
  flagEvent: null,
  ending: null,
  onEndingDone: vi.fn(),
  onSwitch: vi.fn(),
  onReport: vi.fn(),
  ...over,
})

const cabinetEl = (c: HTMLElement) =>
  c.querySelector('.cabinet') as HTMLElement & {
    inert: boolean
  }

beforeEach(() => {
  subtitleCalls.length = 0
  subtitleInputs.length = 0
  window.history.replaceState(null, '', '/')
})
afterEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('Cabinet report dialog', () => {
  it('starts without inert and without a dialog', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    expect(cabinetEl(container).inert).toBeFalsy()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('does not steal focus on first mount', () => {
    render(<Cabinet {...makeProps()} />)
    expect(screen.getByRole('button', { name: 'REPORT' })).not.toHaveFocus()
    expect(document.body).toHaveFocus()
  })

  it('makes the cabinet inert and shows the dialog after REPORT is clicked', async () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(cabinetEl(container).inert).toBe(true)
  })

  it('places the dialog outside the inert cabinet', async () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    expect(cabinetEl(container).contains(screen.getByRole('dialog'))).toBe(
      false
    )
  })

  it('on close: removes inert and returns focus to REPORT', async () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const report = screen.getByRole('button', { name: 'REPORT' })
    await userEvent.click(report)
    await userEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(cabinetEl(container).inert).toBe(false)
    expect(report).toHaveFocus()
  })

  it('selecting a category reports it and closes the dialog', async () => {
    const props = makeProps()
    const { container } = render(<Cabinet {...props} />)
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    await userEvent.click(screen.getByRole('button', { name: 'PERSON' }))
    expect(props.onReport).toHaveBeenCalledTimes(1)
    expect(props.onReport).toHaveBeenCalledWith('Person')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(cabinetEl(container).inert).toBe(false)
  })

  it('camera keys work while closed, are off while open, and work again after closing', async () => {
    const props = makeProps()
    render(<Cabinet {...props} />)
    await userEvent.keyboard('2')
    expect(props.onSwitch).toHaveBeenCalledTimes(1)
    expect(props.onSwitch).toHaveBeenLastCalledWith(1)

    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    await userEvent.keyboard('3')
    expect(props.onSwitch).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
    await userEvent.keyboard('3')
    expect(props.onSwitch).toHaveBeenCalledTimes(2)
    expect(props.onSwitch).toHaveBeenLastCalledWith(2)
  })
})

describe('Cabinet result OSD', () => {
  const osd = (c: HTMLElement) => c.querySelector('.osd-result') as HTMLElement
  const correct: Feedback = {
    id: 1,
    kind: 'correct',
    message: 'ANOMALY LOGGED',
  }

  it('is empty and hidden when there was never a result', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    expect(osd(container)).toBeEmptyDOMElement()
    expect(osd(container)).not.toHaveClass('show')
    expect(osd(container)).toHaveAttribute('aria-hidden', 'true')
  })

  it('shows the message while feedback is set', () => {
    const { container } = render(
      <Cabinet {...makeProps({ feedback: correct })} />
    )
    expect(osd(container)).toHaveTextContent('ANOMALY LOGGED')
    expect(osd(container)).toHaveClass('show')
    expect(osd(container)).toHaveAttribute('aria-hidden', 'false')
  })

  it('keeps the message but drops "show" when feedback goes back to null', () => {
    const props = makeProps({ feedback: correct })
    const { container, rerender } = render(<Cabinet {...props} />)
    rerender(<Cabinet {...props} feedback={null} />)
    expect(osd(container)).toHaveTextContent('ANOMALY LOGGED')
    expect(osd(container)).not.toHaveClass('show')
    expect(osd(container)).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Cabinet subtitle wiring', () => {
  it('passes the id for a wrong report', () => {
    render(
      <Cabinet
        {...makeProps({ feedback: { id: 7, kind: 'wrong', message: 'x' } })}
      />
    )
    expect(subtitleCalls[subtitleCalls.length - 1]).toBe(7)
  })
  it('passes null for a correct report', () => {
    render(
      <Cabinet
        {...makeProps({ feedback: { id: 8, kind: 'correct', message: 'x' } })}
      />
    )
    expect(subtitleCalls[subtitleCalls.length - 1]).toBeNull()
  })
  it('passes null when there is no feedback', () => {
    render(<Cabinet {...makeProps()} />)
    expect(subtitleCalls[subtitleCalls.length - 1]).toBeNull()
  })
})

describe('Cabinet subtitle wiring (dialogue ledger inputs)', () => {
  const last = () => subtitleInputs[subtitleInputs.length - 1]

  it('hands the wrong report id and the anomaly of that report to the hook', () => {
    render(
      <Cabinet
        {...makeProps({
          feedback: { id: 7, kind: 'wrong', message: 'x', anomalyId: 'an-1' },
        })}
      />
    )
    expect(last().wrongFeedbackId).toBe(7)
    expect(last().wrongAnomalyId).toBe('an-1')
  })

  it('hands a null anomaly id when the wrong report had none', () => {
    render(
      <Cabinet
        {...makeProps({
          feedback: { id: 7, kind: 'wrong', message: 'x', anomalyId: null },
        })}
      />
    )
    expect(last().wrongAnomalyId).toBeNull()
  })

  it('hands null ids for a correct report, even if it carried an anomaly id', () => {
    render(
      <Cabinet
        {...makeProps({
          feedback: { id: 8, kind: 'correct', message: 'x', anomalyId: 'an-1' },
        })}
      />
    )
    expect(last().wrongFeedbackId).toBeNull()
    expect(last().wrongAnomalyId).toBeNull()
  })

  it('hands the play time and the correct reports so far', () => {
    render(
      <Cabinet
        {...makeProps({
          stats: makeStats({ currentTime: 123_456, correctReports: 3 }),
        })}
      />
    )
    expect(last().elapsedMs).toBe(123_456)
    expect(last().foundThisPlay).toBe(3)
  })

  it('hands the flag event, the ending and the done callback through', () => {
    const flagEvent = { seq: 4, flags: ['elder1'] }
    const props = makeProps({ flagEvent, ending: 'withdraw' })
    render(<Cabinet {...props} />)
    expect(last().flagEvent).toBe(flagEvent)
    expect(last().ending).toBe('withdraw')
    expect(last().onClosingDone).toBe(props.onEndingDone)
  })

  it('hands null for the flag event and the ending while the shift is running', () => {
    render(<Cabinet {...makeProps()} />)
    expect(last().flagEvent).toBeNull()
    expect(last().ending).toBeNull()
  })
})

describe('Cabinet --wear (evaluated once at module load)', () => {
  const load = async (search: string) => {
    window.history.replaceState(null, '', `/${search}`)
    vi.resetModules()
    // Re-import React-bound modules together so they share one React instance.
    const rtl = await import('@testing-library/react')
    const { Cabinet: Fresh } = await import('./Cabinet')
    const view = rtl.render(<Fresh {...makeProps()} />)
    return view
  }

  it('sets --wear on the root when ?wear= is given', async () => {
    const view = await load('?wear=0.4')
    expect(
      (
        view.container.querySelector('.retro') as HTMLElement
      ).style.getPropertyValue('--wear')
    ).toBe('0.4')
    view.unmount()
  })

  it('leaves --wear unset without ?wear=', async () => {
    const view = await load('')
    expect(
      (
        view.container.querySelector('.retro') as HTMLElement
      ).style.getPropertyValue('--wear')
    ).toBe('')
    view.unmount()
  })
})

describe('Cabinet true ending screen (Issue #86)', () => {
  const baseSrc = (c: HTMLElement) =>
    c
      .querySelector('.pic__frame img:not(.glow):not(.overlay)')
      ?.getAttribute('src')

  it('shows the camera photo for dawn and the bar image for the ending', () => {
    const { container, rerender } = render(
      <Cabinet {...makeProps({ ending: 'dawn' })} />
    )
    expect(baseSrc(container)).toBe(cameras[0].image)
    rerender(<Cabinet {...makeProps({ ending: 'ending' })} />)
    expect(baseSrc(container)).toBe('/images/ending-bar.webp')
  })

  it('lights no camera key and takes no key switch during the ending (#273)', () => {
    const onSwitch = vi.fn()
    const { container, rerender } = render(
      <Cabinet {...makeProps({ ending: 'dawn', onSwitch })} />
    )
    expect(container.querySelectorAll('.lamp.green.on')).toHaveLength(1)
    rerender(<Cabinet {...makeProps({ ending: 'ending', onSwitch })} />)
    expect(container.querySelectorAll('.lamp.green.on')).toHaveLength(0)
    expect(container.querySelectorAll('.cam-cell .key.pressed')).toHaveLength(0)
    expect(container.querySelector('.lamp-big.lit, .lamp-big.alert')).toBeNull()
    expect(container.querySelector('.osd-cam')?.textContent).toBe('CAM 09')
    fireEvent.keyDown(window, { key: '2' })
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(onSwitch).not.toHaveBeenCalled()
  })
})

describe('Cabinet model plate (#304)', () => {
  it('is an image child of .cabinet with an accessible name, and the old .maker text is gone', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const plate = screen.getByAltText('Video Monitor CR-42')
    expect(plate.parentElement).toBe(container.querySelector('.cabinet-foot'))
    expect(plate).toHaveAttribute('src', '/ui/model-plate.webp')
    expect(container.querySelector('.maker')).toBeNull()
    expect(container.textContent).not.toContain('VIDEO MONITOR CR-42')
  })

  it('shares one strip with the speaker grille: speaker first (left), plate last (right), both direct children of the strip under .cabinet', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const foot = container.querySelector('.cabinet-foot') as HTMLElement
    expect(foot.parentElement).toBe(cabinetEl(container))
    expect(Array.from(foot.children).map(c => c.className)).toEqual([
      'speaker',
      'model-plate',
    ])
    expect(container.querySelectorAll('.speaker')).toHaveLength(1)
  })

  it('has no leftover speaker margin workaround in the CSS', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    expect(css).not.toMatch(/\.speaker\s*\{[^}]*margin-bottom/)
    expect(css).not.toMatch(/\.speaker\s*\{\s*display:\s*none/)
  })

  it('keeps the strip small on portrait (20px) and the speaker slots coarse (pitch >= 8px)', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    const base = css.match(
      /\.cabinet\s*\{\s*(?:\/\*[^]*?\*\/\s*)?--plate-h:\s*(\d+)px;[^}]*--hole-p:\s*(\d+)px/
    )
    expect(base).not.toBeNull()
    expect(Number(base![1])).toBe(20)
    expect(Number(base![2])).toBeGreaterThanOrEqual(8)
    expect(css).not.toMatch(/--plate-h:\s*28px/)
    expect(css).toMatch(/background-size:\s*calc\(var\(--hole-p\) \* 9 \/ 7\)/)
  })

  it('keeps the grille at exactly 2 slot rows and fits a whole number of slots across (no clipped right-end slot)', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    const rule = css.match(/\.cabinet-foot > \.speaker\s*\{([^}]*)\}/)
    expect(rule).not.toBeNull()
    // height = 2 rows of pitch, tile = 2 rows tall
    expect(rule![1]).toMatch(/height:\s*calc\(var\(--hole-p\) \* 2\)/)
    expect(rule![1]).toMatch(
      /background-size:\s*calc\(var\(--hole-p\) \* 9 \/ 7\)\s+calc\(var\(--hole-p\) \* 2\)/
    )
    // round horizontally: the tile is nudged so an integer count fills the width
    expect(rule![1]).toMatch(/background-repeat:\s*round\s+no-repeat/)
    // desktop pitch stays a 2-row grille inside the 40px plate strip
    expect(css).toMatch(/--plate-h:\s*40px;\s*--hole-p:\s*14px/)
  })

  it('pins the strip structure: bottom-aligned row, panel reserve = strip height / zoom, column guard, no old .speaker rules', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/styles/retro.css'),
      'utf8'
    )
    const foot = css.match(/\.cabinet > \.cabinet-foot\s*\{([^}]*)\}/)
    expect(foot).not.toBeNull()
    expect(foot![1]).toMatch(/align-items:\s*flex-end/)
    expect(foot![1]).toMatch(/max-width:\s*100%/)
    expect(foot![1]).toMatch(/height:\s*var\(--plate-h\)/)
    // the panel reserves the strip (undoing its own zoom) so the controls never sit under it
    expect(css).toMatch(
      /\.panel\s*\{\s*padding-bottom:\s*calc\(\(var\(--plate-h\) \+ 6px\) \/ var\(--pz, 1\)\);/
    )
    // desktop: the picture height is capped so the control column stays wider than the plate (tall screens)
    expect(css).toMatch(
      /--tube-h:\s*min\(var\(--vh\) - 16px, \(100vw - 30px - var\(--col-min\)\) \* 1679 \/ 1246\)/
    )
    expect(css).toMatch(/--col-min:\s*340px/)
    // the column minimum scales with the panel zoom (1.3 from 1200px, 1.45 from 1400px): 340 x 1.3 = 442, 340 x 1.45 = 493
    const cols = [...css.matchAll(/--col-min:\s*(\d+)px/g)].map(m =>
      Number(m[1])
    )
    expect(cols).toEqual([340, Math.round(340 * 1.3), Math.round(340 * 1.45)])
    // one place owns the grille: no other .speaker rule
    expect(css.match(/(^|\n)\.speaker\s*\{/g)).toBeNull()
    // the plate never leaves the strip
    const plate = css.match(/\.cabinet-foot > \.model-plate\s*\{([^}]*)\}/)
    expect(plate![1]).toMatch(/max-width:\s*100%/)
  })

  it('is in the cabinet preload list of index.html', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
    expect(html).toMatch(/data-cabinet-image\s+href="\/ui\/model-plate\.webp"/)
  })
})

describe('Cabinet REPORT lamp (#344)', () => {
  const lamp = (c: HTMLElement) => c.querySelector('.lamp-big') as HTMLElement

  it.each([
    [0, false],
    [2, false],
    [3, true],
    [4, true],
  ])('with %i unreported, blinking is %s', (n, blinking) => {
    const { container } = render(
      <Cabinet {...makeProps({ unreportedCount: n })} />
    )
    expect(lamp(container).classList.contains('alert')).toBe(blinking)
    expect(lamp(container)).not.toHaveClass('lit')
  })

  it('goes back to not blinking when a report brings the count down', () => {
    const { container, rerender } = render(
      <Cabinet {...makeProps({ unreportedCount: 3 })} />
    )
    expect(lamp(container)).toHaveClass('alert')
    rerender(<Cabinet {...makeProps({ unreportedCount: 2 })} />)
    expect(lamp(container)).not.toHaveClass('alert')
  })

  it('stops blinking and lights steadily while the dialog is open', async () => {
    const { container } = render(
      <Cabinet {...makeProps({ unreportedCount: 5 })} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    expect(lamp(container)).toHaveClass('lit')
    expect(lamp(container)).not.toHaveClass('alert')
  })

  it('keeps the lamp decorative and shows no caption (kako-jun: no guidance text)', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    expect(lamp(container)).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('.lamp-note')).toBeNull()
  })
})

describe('Cabinet VOL knob (#79)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    gameAudio.setVolume(70)
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows VOL next to Brightness and Contrast as a slider 0..100 starting at 70', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const knob = screen.getByRole('slider', { name: 'Volume' })
    expect(knob).toHaveAttribute('aria-valuenow', '70')
    expect(knob).toHaveAttribute('aria-valuemin', '0')
    expect(knob).toHaveAttribute('aria-valuemax', '100')
    expect(container.querySelector('.knobs')?.textContent).toContain('VOL')
    expect(container.querySelectorAll('.knobs .knob')).toHaveLength(3)
  })

  it('puts VOL at the far right: DOM and tab order Brightness, Contrast, VOL (kako-jun 2026-11-12)', () => {
    const { container } = render(<Cabinet {...makeProps()} />)
    const names = [...container.querySelectorAll('.knobs [role=slider]')].map(
      k => k.getAttribute('aria-label')
    )
    expect(names).toEqual(['Brightness', 'Contrast', 'Volume'])
    expect(container.querySelector('.knobs')?.textContent).toMatch(
      /Brightness.*Contrast.*VOL/i
    )
  })

  it('follows the knob at once and saves once it rests; 0 is silence', () => {
    render(<Cabinet {...makeProps()} />)
    const knob = screen.getByRole('slider', { name: 'Volume' })
    fireEvent.keyDown(knob, { key: 'Home' })
    expect(gameAudio.getVolume()).toBe(0)
    expect(gameAudio.effectiveGain()).toBe(0)
    expect(load().settings?.volume).not.toBe(0)
    vi.advanceTimersByTime(400)
    expect(load().settings?.volume).toBe(0)
  })

  it('saves the last position when the screen goes away inside the delay', () => {
    const { unmount } = render(<Cabinet {...makeProps()} />)
    fireEvent.keyDown(screen.getByRole('slider', { name: 'Volume' }), {
      key: 'End',
    })
    unmount()
    expect(load().settings?.volume).toBe(100)
  })
})

describe('sound anomaly lifecycle', () => {
  it('stops voice on mute and report and resumes it when volume returns', () => {
    const stop = vi.fn()
    const play = vi.spyOn(voice, 'playVoice').mockReturnValue({ stop })
    const anomaly = {
      id: 'RT-SND-06',
      cameraId: cameras[0].id,
      category: 'Environment' as const,
      phase: 'early' as const,
    }
    const props = makeProps()
    const { rerender, unmount } = render(
      <Cabinet {...props} soundAnomalyHere={anomaly} />
    )
    expect(play).toHaveBeenCalledTimes(1)
    fireEvent.keyDown(screen.getByRole('slider', { name: 'Volume' }), {
      key: 'Home',
    })
    expect(stop).toHaveBeenCalledTimes(1)
    fireEvent.keyDown(screen.getByRole('slider', { name: 'Volume' }), {
      key: 'End',
    })
    expect(play).toHaveBeenCalledTimes(2)
    rerender(<Cabinet {...props} soundAnomalyHere={undefined} />)
    expect(stop).toHaveBeenCalledTimes(2)
    unmount()
    play.mockRestore()
    saveVolume(70)
  })
  it('holds a voice once across re-renders, releases it on unmount, and does not reload on unrelated changes', async () => {
    const hold = vi.spyOn(voice, 'holdVoice').mockResolvedValue(true)
    const release = vi.spyOn(voice, 'releaseVoice').mockImplementation(() => {})
    const props = makeProps()
    const { rerender, unmount } = render(
      <Cabinet {...props} heldVoiceId="RT-SND-06" currentCameraIndex={0} />
    )
    await waitFor(() => expect(hold).toHaveBeenCalledTimes(1))
    rerender(
      <Cabinet {...props} heldVoiceId="RT-SND-06" currentCameraIndex={1} />
    )
    await act(async () => {})
    expect(hold).toHaveBeenCalledTimes(1)
    expect(release).not.toHaveBeenCalled()
    unmount()
    expect(release).toHaveBeenCalledWith('RT-SND-06')
    hold.mockRestore()
    release.mockRestore()
  })
  it('does not reload or release the held voice when the audio context returns to running', async () => {
    const listeners: (() => void)[] = []
    const fake = {
      state: 'suspended',
      addEventListener: (_t: string, f: () => void) => listeners.push(f),
      removeEventListener: () => {},
    }
    const ctx = vi
      .spyOn(gameAudio, 'ctx')
      .mockReturnValue(fake as unknown as AudioContext)
    const unlock = vi
      .spyOn(gameAudio, 'unlock')
      .mockResolvedValue(undefined as never)
    const hold = vi.spyOn(voice, 'holdVoice').mockResolvedValue(true)
    const release = vi.spyOn(voice, 'releaseVoice').mockImplementation(() => {})
    const { unmount } = render(
      <Cabinet {...makeProps()} heldVoiceId="RT-SND-06" />
    )
    await waitFor(() => expect(listeners.length).toBeGreaterThan(0))
    await waitFor(() => expect(hold).toHaveBeenCalledTimes(1))
    fake.state = 'running'
    await act(async () => {
      listeners.forEach(f => f())
    })
    await act(async () => {})
    expect(hold).toHaveBeenCalledTimes(1)
    expect(release).not.toHaveBeenCalled()
    unmount()
    ctx.mockRestore()
    unlock.mockRestore()
    hold.mockRestore()
    release.mockRestore()
  })
  it('stops retrying a voice that keeps failing instead of fetching every few seconds forever', async () => {
    vi.useFakeTimers()
    const hold = vi.spyOn(voice, 'holdVoice').mockResolvedValue(false)
    const release = vi.spyOn(voice, 'releaseVoice').mockImplementation(() => {})
    const gone = vi.fn()
    const { unmount } = render(
      <Cabinet
        {...makeProps()}
        heldVoiceId="RT-SND-06"
        onVoiceUnavailable={gone}
      />
    )
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10 * 60 * 1000)
    })
    expect(hold).toHaveBeenCalledTimes(voice.VOICE_RETRY_LIMIT)
    // Only after the last try is the anomaly given up (once), so a slow network never loses a voice early.
    expect(gone).toHaveBeenCalledTimes(1)
    expect(gone).toHaveBeenCalledWith('RT-SND-06')
    unmount()
    hold.mockRestore()
    release.mockRestore()
    vi.useRealTimers()
  })
  describe('a voice whose later reads keep failing', () => {
    /** Decodes the voice for real once (so `voiceWasLoaded` is truly true), then makes every further fetch fail. */
    const setupAfterDecode = async (id: string) => {
      const ctx = {
        state: 'running',
        addEventListener: () => {},
        removeEventListener: () => {},
        decodeAudioData: vi.fn().mockResolvedValue({ duration: 68 }),
      }
      vi.spyOn(gameAudio, 'ctx').mockReturnValue(ctx as unknown as AudioContext)
      vi.spyOn(gameAudio, 'unlock').mockResolvedValue(undefined as never)
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => ({
          ok: true,
          arrayBuffer: async () => new ArrayBuffer(8),
        }))
      )
      expect(await voice.holdVoice(gameAudio, id)).toBe(true)
      voice.releaseVoice(id)
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => {
          throw new Error('offline')
        })
      )
    }
    const renderAndExhaust = async (id: string) => {
      const gone = vi.fn()
      const { unmount } = render(
        <Cabinet {...makeProps()} heldVoiceId={id} onVoiceUnavailable={gone} />
      )
      await act(async () => {
        await vi.advanceTimersByTimeAsync(10 * 60 * 1000)
      })
      unmount()
      return gone
    }
    afterEach(() => {
      vi.restoreAllMocks()
      vi.unstubAllGlobals()
    })

    it('is not taken back when it was decoded earlier in the same shift', async () => {
      vi.useFakeTimers()
      voice.resetVoiceHistory()
      await setupAfterDecode('RT-SND-06')
      expect(voice.voiceWasLoaded('RT-SND-06')).toBe(true)
      expect(await renderAndExhaust('RT-SND-06')).not.toHaveBeenCalled()
      vi.useRealTimers()
    })

    it('is taken back when the shift changed since it was decoded (history reset at the shift start)', async () => {
      vi.useFakeTimers()
      voice.resetVoiceHistory()
      await setupAfterDecode('CR-SH-06')
      voice.resetVoiceHistory()
      expect(voice.voiceWasLoaded('CR-SH-06')).toBe(false)
      expect(await renderAndExhaust('CR-SH-06')).toHaveBeenCalledWith(
        'CR-SH-06'
      )
      vi.useRealTimers()
    })
  })
  it('repeats intermittent sounds throughout five minutes and stops after report', () => {
    vi.useFakeTimers()
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const stop = vi.fn()
    const play = vi.spyOn(synth, 'playSynth').mockReturnValue({ stop })
    const anomaly = {
      id: 'CR-RZ-07',
      cameraId: cameras[0].id,
      category: 'Environment' as const,
      phase: 'early' as const,
    }
    const props = makeProps()
    const { rerender, unmount } = render(
      <Cabinet {...props} soundAnomalyHere={anomaly} />
    )
    act(() => vi.advanceTimersByTime(300000))
    const count = play.mock.calls.filter(([, name]) => name === 'chime').length
    expect(count).toBeGreaterThan(10)
    rerender(<Cabinet {...props} soundAnomalyHere={undefined} />)
    act(() => vi.advanceTimersByTime(30000))
    expect(play.mock.calls.filter(([, name]) => name === 'chime')).toHaveLength(
      count
    )
    unmount()
    play.mockRestore()
    random.mockRestore()
    vi.useRealTimers()
  })
  it('does not consume a one-shot sound while the volume is zero', async () => {
    saveVolume(0)
    const stop = vi.fn()
    const play = vi.spyOn(synth, 'playSynth').mockReturnValue({ stop })
    const anomaly = {
      id: 'CR-RZ-07',
      cameraId: cameras[0].id,
      category: 'Environment' as const,
      phase: 'early' as const,
    }
    const { unmount } = render(
      <Cabinet {...makeProps()} soundAnomalyHere={anomaly} />
    )
    expect(play.mock.calls.some(([, name]) => name === 'chime')).toBe(false)
    fireEvent.keyDown(screen.getByRole('slider', { name: 'Volume' }), {
      key: 'End',
    })
    await waitFor(() =>
      expect(play.mock.calls.some(([, name]) => name === 'chime')).toBe(true)
    )
    unmount()
    play.mockRestore()
    saveVolume(70)
  })
  it('selects only the watched unreported sound and stops it on camera change and report', async () => {
    const { soundOnCamera } = await import('../utils/nonImageEffects')
    const stop = vi.fn()
    const play = vi
      .spyOn(synth, 'playSynth')
      .mockImplementation((_engine, name) =>
        name === 'buzz' ? { stop } : null
      )
    const anomaly = {
      id: 'RT-SND-03',
      cameraId: cameras[0].id,
      category: 'Environment' as const,
      phase: 'early' as const,
    }
    const props = makeProps()
    const { rerender, unmount } = render(
      <Cabinet
        {...props}
        soundAnomalyHere={soundOnCamera([anomaly], cameras[0].id)}
      />
    )
    await waitFor(() => expect(play).toHaveBeenCalledWith(gameAudio, 'buzz'))
    rerender(
      <Cabinet
        {...props}
        currentCameraIndex={1}
        currentCamera={cameras[1]}
        soundAnomalyHere={soundOnCamera([anomaly], cameras[1].id)}
      />
    )
    expect(stop).toHaveBeenCalledTimes(1)
    rerender(
      <Cabinet
        {...props}
        soundAnomalyHere={soundOnCamera([anomaly], cameras[0].id)}
      />
    )
    await waitFor(() =>
      expect(
        play.mock.calls.filter(([, name]) => name === 'buzz')
      ).toHaveLength(2)
    )
    rerender(
      <Cabinet
        {...props}
        soundAnomalyHere={soundOnCamera(
          [{ ...anomaly, detectedAt: 1 }],
          cameras[0].id
        )}
      />
    )
    expect(stop).toHaveBeenCalledTimes(2)
    unmount()
    play.mockRestore()
  })
})

describe('Cabinet monitor effects (data-fx, #408)', () => {
  const retroEl = (c: HTMLElement) => c.querySelector('.retro') as HTMLElement
  const css = readFileSync(
    resolve(process.cwd(), 'src/styles/monitorEffects.css'),
    'utf8'
  )

  it('writes no data-fx while nothing runs, and the running ids while something does', () => {
    const props = makeProps()
    const { container, rerender } = render(<Cabinet {...props} />)
    expect(retroEl(container).hasAttribute('data-fx')).toBe(false)
    rerender(<Cabinet {...props} monitorEffects={new Set(['RT-UI-11'])} />)
    expect(retroEl(container).getAttribute('data-fx')).toBe('RT-UI-11')
    rerender(<Cabinet {...props} monitorEffects={new Set()} />)
    expect(retroEl(container).hasAttribute('data-fx')).toBe(false)
  })
  it('no effect is drawn on the ending CAM 09 (like the feed glitch), and it is back otherwise', () => {
    const props = makeProps({ monitorEffects: new Set(['RT-UI-11']) })
    const { container, rerender } = render(
      <Cabinet {...props} ending="ending" />
    )
    expect(retroEl(container).hasAttribute('data-fx')).toBe(false)
    rerender(<Cabinet {...props} ending="withdraw" />)
    expect(retroEl(container).getAttribute('data-fx')).toBe('RT-UI-11')
  })
  it('the tilt rule is keyed on RT-UI-11 and rotates the cabinet by a few degrees and shrinks it so it stays in view (a transform, so the loupe can read it)', () => {
    const m = css.match(
      /\.retro\[data-fx~='RT-UI-11'\] \.cabinet\s*\{\s*transform:\s*rotate\((-?[\d.]+)deg\)\s*scale\(([\d.]+)\);/
    )
    expect(m).not.toBeNull()
    // a few degrees, and a little smaller (the numbers may be tuned without touching this test)
    expect(Math.abs(Number(m![1]))).toBeGreaterThanOrEqual(1)
    expect(Math.abs(Number(m![1]))).toBeLessThanOrEqual(6)
    expect(Number(m![2])).toBeGreaterThan(0.7)
    expect(Number(m![2])).toBeLessThanOrEqual(1)
  })
  it('RT-UI-26 and RT-UI-23 pick their random variant once per run: unrelated re-renders keep the key caption and the colon class', () => {
    // every call gives a new value, so a re-draw on a re-render would change the caption or the class
    let n = 0
    const rnd = vi
      .spyOn(Math, 'random')
      .mockImplementation(() => (n++ * 0.37 + 0.11) % 1)
    try {
      const props = makeProps({
        monitorEffects: new Set(['RT-UI-26', 'RT-UI-23']),
      })
      const { container, rerender } = render(<Cabinet {...props} />)
      const key = () =>
        screen.getByRole('button', { name: 'REPORT' }).textContent
      const colon = () => container.querySelector('.clock-colon')?.className
      const k0 = key()
      const c0 = colon()
      expect(k0).not.toBe('REPORT')
      expect(c0).toMatch(/clock-colon--(fast|steady)/)
      for (const t of [
        '00:01',
        '00:02',
        '00:03',
        '00:04',
        '00:05',
        '00:06',
        '00:07',
      ]) {
        rerender(<Cabinet {...props} gameTime={t} />)
        expect(key()).toBe(k0)
        expect(colon()).toBe(c0)
      }
    } finally {
      rnd.mockRestore()
    }
  })
  it('RT-UI-26: the REPORT key shows a misspelling while it runs, keeps its accessible name, and is plain again after (and on the ending)', () => {
    const props = makeProps()
    const { rerender } = render(<Cabinet {...props} />)
    const key = () => screen.getByRole('button', { name: 'REPORT' })
    expect(key().textContent).toBe('REPORT')
    rerender(<Cabinet {...props} monitorEffects={new Set(['RT-UI-26'])} />)
    expect(key().textContent).not.toBe('REPORT')
    expect(key().textContent).toMatch(/^(REPROT|RAPORT|REPØRT)$/)
    rerender(<Cabinet {...props} monitorEffects={new Set()} />)
    expect(key().textContent).toBe('REPORT')
    rerender(
      <Cabinet
        {...props}
        ending="ending"
        monitorEffects={new Set(['RT-UI-26'])}
      />
    )
    expect(key().textContent).toBe('REPORT')
  })
  it('the HUD headings follow RT-UI-02 and not on the ending', () => {
    const props = makeProps({ monitorEffects: new Set(['RT-UI-02']) })
    const { container, rerender } = render(<Cabinet {...props} />)
    const labels = () =>
      [...container.querySelectorAll('.status .label')].map(l => l.textContent)
    expect(labels().slice(0, 2)).toEqual(['REPORTS', 'TIME'])
    rerender(<Cabinet {...props} ending="ending" />)
    expect(labels().slice(0, 2)).toEqual(['TIME', 'REPORTS'])
  })
  it('the digit / colon rules are keyed on their ids', () => {
    for (const id of ['RT-UI-08', 'RT-UI-17', 'RT-UI-18', 'RT-UI-23'])
      expect(css).toContain(`[data-fx~='${id}']`)
    // the colon: at most 3 blinks a second (period >= 1/3 s), and gone under reduced motion
    const m = css.match(
      /RT-UI-23.\] \.clock-colon--fast \{\s*animation-duration:\s*([\d.]+)s/
    )
    expect(Number(m?.[1])).toBeGreaterThanOrEqual(1 / 3)
    expect(Number(m?.[1])).toBeLessThan(1)
    expect(css).toMatch(
      /prefers-reduced-motion: reduce\)[^}]*\{\s*\.retro\[data-fx~=.RT-UI-23.\] \.clock-colon--fast,\s*\.retro\[data-fx~=.RT-UI-23.\] \.clock-colon--steady \{\s*opacity: 0/
    )
  })

  it('RT-UI-16: the mirror is a scaleX(-1) on the cabinet, and runs alone beside the tilt id (data-fx lists both ids when given both)', () => {
    expect(css).toMatch(
      /\.retro\[data-fx~='RT-UI-16'\] \.cabinet\s*\{\s*transform:\s*scaleX\(-1\);/
    )
    const { container } = render(
      <Cabinet
        {...makeProps({ monitorEffects: new Set(['RT-UI-16', 'RT-UI-22']) })}
      />
    )
    expect(retroEl(container).getAttribute('data-fx')).toBe('RT-UI-16 RT-UI-22')
  })
  it('RT-UI-22: the grain and the scanlines are off for good (opacity 0 on .noise and .scan)', () => {
    const rule = css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .match(/([^{}]*RT-UI-22[^{}]*)\{\s*opacity:\s*0;\s*\}/)
    expect(rule).not.toBeNull()
    const sel = rule![1].split(',').map(x => x.trim())
    expect(sel.sort()).toEqual([
      ".retro[data-fx~='RT-UI-22'] .noise",
      ".retro[data-fx~='RT-UI-22'] .scan",
    ])
  })
  it('RT-UI-29: only the cabinet face is tinted (a colour multiplied into its background, no filter that would tint the picture)', () => {
    const m = css.match(/RT-UI-29'\] \.cabinet\s*\{([^}]*)\}/)
    expect(m).not.toBeNull()
    expect(m![1]).toMatch(/background-color:\s*#[0-9a-f]{6}/i)
    expect(m![1]).toMatch(/background-blend-mode:\s*multiply/)
    expect(m![1]).not.toMatch(/filter/)
  })
  it('RT-UI-15: the grille pulses with an animation (glow stays under reduced motion), and the holes are not touched', () => {
    expect(css).toMatch(
      /RT-UI-15'\] \.cabinet-foot > \.speaker\s*\{[^}]*animation:\s*speaker-pulse/
    )
    expect(css).toMatch(/@keyframes speaker-pulse/)
    expect(css).toMatch(
      /prefers-reduced-motion: reduce\)\s*\{\s*\.retro\[data-fx~='RT-UI-15'\][^{]*\{\s*animation:\s*none/
    )
  })
  it('RT-UI-27: the holes are masked in a checkerboard (still: no animation), without taking pointer events', () => {
    const m = css.match(/RT-UI-27'\] \.cabinet-foot > \.speaker\s*\{([^}]*)\}/)
    expect(m).not.toBeNull()
    expect(m![1]).toMatch(/mask-image:\s*conic-gradient/)
    expect(m![1]).toMatch(/mask-size:\s*calc\(200% \/ var\(--speaker-cols\)\)/)
    expect(m![1]).not.toMatch(/animation|pointer-events/)
  })
  it('RT-UI-27: Cabinet writes how many holes fit in a row on the grille, and takes it away when the effect ends', () => {
    const cw = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(450)
    const gcs = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => '10px',
      transform: 'none',
    } as unknown as CSSStyleDeclaration)
    const props = makeProps()
    const { container, rerender } = render(<Cabinet {...props} />)
    const speaker = container.querySelector('.speaker') as HTMLElement
    expect(speaker.style.getPropertyValue('--speaker-cols')).toBe('')
    rerender(<Cabinet {...props} monitorEffects={new Set(['RT-UI-27'])} />)
    // 450 px / (10 px * 9/7) = 35 holes
    expect(speaker.style.getPropertyValue('--speaker-cols')).toBe('35')
    rerender(<Cabinet {...props} monitorEffects={new Set()} />)
    expect(speaker.style.getPropertyValue('--speaker-cols')).toBe('')
    cw.mockRestore()
    gcs.mockRestore()
  })
  it('monitorEffects.css is imported before CameraView (which brings feedGlitch.css), so the later feed glitch rules win over RT-UI-22', () => {
    const src = readFileSync(
      resolve(process.cwd(), 'src/components/Cabinet.tsx'),
      'utf8'
    )
    const fx = src.indexOf("import '../styles/monitorEffects.css'")
    const cam = src.indexOf("from './CameraView'")
    expect(fx).toBeGreaterThan(-1)
    expect(cam).toBeGreaterThan(fx)
    expect(
      readFileSync(
        resolve(process.cwd(), 'src/components/CameraView.tsx'),
        'utf8'
      )
    ).toContain("import '../styles/feedGlitch.css'")
  })
  it('every CSS rule in monitorEffects.css is for an id in the table', async () => {
    const { MONITOR_EFFECTS } = await import('../utils/monitorEffects')
    const ids = [...css.matchAll(/data-fx~='([^']+)'/g)].map(m => m[1])
    expect(ids.length).toBeGreaterThan(0)
    for (const id of ids) expect(Object.keys(MONITOR_EFFECTS)).toContain(id)
  })
})

describe('RT-UI-21 loupe broken (the entry through Cabinet)', () => {
  const rect = (w: number, h: number) =>
    ({
      left: 0,
      top: 0,
      right: w,
      bottom: h,
      width: w,
      height: h,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }) as DOMRect
  const press = (fx: string[]) => {
    const spy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(() => rect(400, 600))
    const { container } = render(
      <Cabinet {...makeProps({ monitorEffects: new Set(fx) })} />
    )
    const glass = container.querySelector('.glass') as HTMLElement
    fireEvent.pointerDown(glass, {
      pointerId: 1,
      clientX: 200,
      clientY: 300,
      pointerType: 'touch',
      button: 0,
    })
    const shown = !!container.querySelector('[data-testid="loupe"]')
    spy.mockRestore()
    return shown
  }
  it('pressing the picture shows the loupe normally (the harness works)', () => {
    expect(press([])).toBe(true)
  })
  it('with RT-UI-21 running, pressing the picture shows no loupe', () => {
    expect(press(['RT-UI-21'])).toBe(false)
  })
  it('another running effect does not take the loupe away', () => {
    expect(press(['RT-UI-11'])).toBe(true)
  })
})

describe('Cabinet RT-UI-05 / 13 / 14 / 20 / 28 (#438)', () => {
  const css = readFileSync(
    resolve(process.cwd(), 'src/styles/monitorEffects.css'),
    'utf8'
  )
  const knob = (c: HTMLElement, name: string) =>
    Number(
      c
        .querySelector(`[role="slider"][aria-label="${name}"]`)
        ?.getAttribute('aria-valuenow')
    )

  it('RT-UI-13: both knobs turn by themselves inside the drift range, the knob picture follows (aria-valuenow), and it is back at the player value once the effect is cleared', () => {
    vi.useFakeTimers()
    try {
      const props = makeProps({ monitorEffects: new Set(['RT-UI-13']) })
      const { container, rerender } = render(<Cabinet {...props} />)
      expect(knob(container, 'Brightness')).toBe(50)
      act(() => {
        vi.advanceTimersByTime(3000)
      })
      const b = knob(container, 'Brightness')
      const c = knob(container, 'Contrast')
      expect(b).not.toBe(50)
      expect(c).not.toBe(50)
      expect(b).toBeGreaterThanOrEqual(25)
      expect(b).toBeLessThanOrEqual(75)
      rerender(<Cabinet {...props} monitorEffects={new Set()} />)
      // cleared: the knobs are back where the player left them (untouched = centre) and stay
      expect(knob(container, 'Brightness')).toBe(50)
      act(() => {
        vi.advanceTimersByTime(3000)
      })
      expect(knob(container, 'Brightness')).toBe(50)
    } finally {
      vi.useRealTimers()
    }
  })
  it('RT-UI-13: a touch pauses the drift (about 1.5 s) and then it goes on; touching still works as before', () => {
    vi.useFakeTimers()
    try {
      const { container } = render(
        <Cabinet {...makeProps({ monitorEffects: new Set(['RT-UI-13']) })} />
      )
      const slider = container.querySelector(
        '[role="slider"][aria-label="Brightness"]'
      ) as HTMLElement
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      fireEvent.keyDown(slider, { key: 'End' })
      expect(knob(container, 'Brightness')).toBe(100)
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(knob(container, 'Brightness')).toBe(100)
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(knob(container, 'Brightness')).toBeLessThan(100)
    } finally {
      vi.useRealTimers()
    }
  })
  it('RT-UI-13: while a knob is held down the drift stands still, and it goes on about 1.5 s after the pointer is released', () => {
    vi.useFakeTimers()
    try {
      const { container } = render(
        <Cabinet {...makeProps({ monitorEffects: new Set(['RT-UI-13']) })} />
      )
      const slider = container.querySelector(
        '[role="slider"][aria-label="Brightness"]'
      ) as HTMLElement
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      const held = knob(container, 'Brightness')
      expect(held).not.toBe(50)
      slider.setPointerCapture = vi.fn()
      fireEvent.pointerDown(slider, { pointerId: 1, button: 0 })
      act(() => {
        vi.advanceTimersByTime(4000)
      })
      expect(knob(container, 'Brightness')).toBe(held)
      fireEvent.pointerUp(slider, { pointerId: 1, button: 0 })
      // a tap puts the knob back to the centre (as before)
      const released = knob(container, 'Brightness')
      expect(released).toBe(50)
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(knob(container, 'Brightness')).toBe(released)
      act(() => {
        vi.advanceTimersByTime(1500)
      })
      expect(knob(container, 'Brightness')).not.toBe(released)
    } finally {
      vi.useRealTimers()
    }
  })
  it('RT-UI-13: when the effect is cleared the knobs go back to what the player last set (not where the drift left them)', () => {
    vi.useFakeTimers()
    try {
      const props = makeProps({ monitorEffects: new Set(['RT-UI-13']) })
      const { container, rerender } = render(<Cabinet {...props} />)
      const slider = container.querySelector(
        '[role="slider"][aria-label="Brightness"]'
      ) as HTMLElement
      fireEvent.keyDown(slider, { key: 'End' })
      act(() => {
        vi.advanceTimersByTime(6000)
      })
      expect(knob(container, 'Brightness')).not.toBe(100)
      expect(knob(container, 'Contrast')).not.toBe(50)
      rerender(<Cabinet {...props} monitorEffects={new Set()} />)
      expect(knob(container, 'Brightness')).toBe(100)
      expect(knob(container, 'Contrast')).toBe(50)
    } finally {
      vi.useRealTimers()
    }
  })
  it('RT-UI-13: without the effect the knobs stay where they are', () => {
    vi.useFakeTimers()
    try {
      const { container } = render(<Cabinet {...makeProps()} />)
      act(() => {
        vi.advanceTimersByTime(5000)
      })
      expect(knob(container, 'Brightness')).toBe(50)
    } finally {
      vi.useRealTimers()
    }
  })

  it('RT-UI-14 / 28: the plate picture is clipped and the digits are drawn over its corner; alt follows; nothing running leaves it as printed', () => {
    const { container, rerender } = render(<Cabinet {...makeProps()} />)
    expect(container.querySelector('.plate-num')).toBeNull()
    expect(screen.getByAltText('Video Monitor CR-42')).toBeInTheDocument()
    rerender(
      <Cabinet {...makeProps({ monitorEffects: new Set(['RT-UI-14']) })} />
    )
    const num = container.querySelector('.plate-num')
    expect(num).toHaveTextContent('24')
    expect(num).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByAltText('Video Monitor CR-24')).toBeInTheDocument()
    expect(container.querySelector('.retro')).toHaveAttribute(
      'data-fx',
      'RT-UI-14'
    )
    rerender(
      <Cabinet {...makeProps({ monitorEffects: new Set(['RT-UI-28']) })} />
    )
    expect(container.querySelector('.plate-num')).toHaveTextContent('100')
    // three digits are squeezed into the same corner, never wider than the two-digit text
    expect(
      Number(
        container.querySelector('.plate-num text')?.getAttribute('textLength')
      )
    ).toBeLessThanOrEqual(76)
    expect(screen.getByAltText('Video Monitor CR-100')).toBeInTheDocument()
    // the clip is in CSS, for both ids, and cuts only the "42" corner
    expect(css).toMatch(
      /RT-UI-14'\] \.cabinet-foot > \.model-plate,\s*\.retro\[data-fx~='RT-UI-28'\] \.cabinet-foot > \.model-plate \{\s*clip-path: inset\(0 26\.5% 0 0\)/
    )
  })

  it('RT-UI-20: exactly one camera key loses its face, the same one while it runs, and none after it is cleared', () => {
    const props = makeProps({ monitorEffects: new Set(['RT-UI-20']) })
    const { container, rerender } = render(<Cabinet {...props} />)
    const gone = () =>
      [...container.querySelectorAll('.cam-cell .key')].flatMap((k, i) =>
        k.classList.contains('key--gone') ? [i] : []
      )
    const first = gone()
    expect(first).toHaveLength(1)
    rerender(<Cabinet {...props} unreportedCount={3} />)
    expect(gone()).toEqual(first)
    rerender(<Cabinet {...props} monitorEffects={new Set()} />)
    expect(gone()).toEqual([])
  })

  it('RT-UI-05: the digits lie (kind picked once) while the timer keeps the real time as its name', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.8) // frozen
    try {
      const props = makeProps({
        gameTime: '23:10',
        monitorEffects: new Set(['RT-UI-05']),
      })
      const { container, rerender } = render(<Cabinet {...props} />)
      const digits = () => container.querySelector('.vfd')?.textContent
      expect(digits()).toBe('23:10')
      rerender(<Cabinet {...props} gameTime="01:40" />)
      expect(digits()).toBe('23:10')
      expect(screen.getByRole('timer', { name: '01:40' })).toBeInTheDocument()
      rerender(
        <Cabinet {...props} gameTime="01:40" monitorEffects={new Set()} />
      )
      expect(digits()).toBe('01:40')
    } finally {
      spy.mockRestore()
    }
  })

  it('RT-UI-01: the REPORT key drifts by `translate` (not the pressed sink), still, off place, under reduced motion', () => {
    expect(css).toMatch(
      /RT-UI-01'\] \.key-report \{\s*animation: report-drift [\d.]+s ease-in-out infinite/
    )
    const body = css.match(/@keyframes report-drift \{([\s\S]*?)\n\}/)![1]
    expect(body).toMatch(/translate:/)
    expect(body).not.toMatch(/transform:/)
    expect(css).toMatch(
      /prefers-reduced-motion: reduce\)[^}]*\{\s*\.retro\[data-fx~='RT-UI-01'\] \.key-report \{\s*animation: none;\s*translate: [^;]+;/
    )
  })
})

describe('Cabinet rule-break effects (#442)', () => {
  const fxSet = (...ids: string[]) => new Set(ids)
  const glassBri = (c: HTMLElement) =>
    Number(
      (c.querySelector('.glass') as HTMLElement).style.getPropertyValue('--bri')
    )

  it('every switching entrance goes through the one plan: RT-RULE-01 turns arrow keys, leaves digit keys and CAMERA SELECT keys', async () => {
    const onSwitch = vi.fn()
    render(
      <Cabinet
        {...makeProps({
          onSwitch,
          currentCameraIndex: 2,
          currentCamera: cameras[2],
          monitorEffects: fxSet('RT-RULE-01'),
        })}
      />
    )
    await userEvent.keyboard('{ArrowRight}')
    expect(onSwitch).toHaveBeenLastCalledWith(1)
    await userEvent.keyboard('a')
    expect(onSwitch).toHaveBeenLastCalledWith(3)
    await userEvent.keyboard('6')
    expect(onSwitch).toHaveBeenLastCalledWith(5)
    await userEvent.click(screen.getByRole('button', { name: 'Camera 4' }))
    expect(onSwitch).toHaveBeenLastCalledWith(3)
  })

  it('RT-RULE-05: the arrow key does not come round from the last camera', async () => {
    const onSwitch = vi.fn()
    render(
      <Cabinet
        {...makeProps({
          onSwitch,
          currentCameraIndex: 7,
          currentCamera: cameras[7],
          monitorEffects: fxSet('RT-RULE-05'),
        })}
      />
    )
    await userEvent.keyboard('{ArrowRight}')
    expect(onSwitch).not.toHaveBeenCalled()
    await userEvent.keyboard('{ArrowLeft}')
    expect(onSwitch).toHaveBeenCalledWith(6)
  })

  it('RT-RULE-06: the selection lamp moves at once and the picture (onSwitch) follows after the lag', () => {
    vi.useFakeTimers()
    try {
      const onSwitch = vi.fn()
      const { container } = render(
        <Cabinet
          {...makeProps({ onSwitch, monitorEffects: fxSet('RT-RULE-06') })}
        />
      )
      fireEvent.click(screen.getByRole('button', { name: 'Camera 4' }))
      const lamps = () =>
        [...container.querySelectorAll('.cam-lamps .lamp')].map(l =>
          l.classList.contains('on')
        )
      expect(lamps().indexOf(true)).toBe(3)
      expect(onSwitch).not.toHaveBeenCalled()
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(onSwitch).toHaveBeenCalledWith(3)
    } finally {
      vi.useRealTimers()
    }
  })

  it('RT-RULE-06: an edge tap and a CAMERA SELECT key are delayed too, and a switch due while the REPORT picker is open runs after it closes', () => {
    vi.useFakeTimers()
    try {
      const onSwitch = vi.fn()
      const { container } = render(
        <Cabinet
          {...makeProps({ onSwitch, monitorEffects: fxSet('RT-RULE-06') })}
        />
      )
      const lampAt = () =>
        [...container.querySelectorAll('.cam-lamps .lamp')].findIndex(l =>
          l.classList.contains('on')
        )
      // a short tap on the right edge of the bezel (outside the picture) is the step to the next camera
      const bezel = container.querySelector('.bezel') as HTMLElement
      const glass = container.querySelector('.glass') as HTMLElement
      const r = { left: 100, top: 50, width: 400, height: 600 }
      const rect = () =>
        ({
          ...r,
          right: 500,
          bottom: 650,
          x: 100,
          y: 50,
          toJSON: () => ({}),
        }) as DOMRect
      glass.getBoundingClientRect = rect
      ;(
        container.querySelector('.pic__frame') as HTMLElement
      ).getBoundingClientRect = rect
      const ev = {
        pointerId: 1,
        clientX: 510,
        clientY: 300,
        pointerType: 'touch',
        button: 0,
      }
      fireEvent.pointerDown(bezel, ev)
      fireEvent.pointerUp(bezel, ev)
      expect(lampAt()).toBe(1)
      expect(onSwitch).not.toHaveBeenCalled()
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(onSwitch).toHaveBeenCalledWith(1)
      onSwitch.mockClear()
      // a select key, then the picker opens before it is due
      fireEvent.click(screen.getByRole('button', { name: 'Camera 6' }))
      fireEvent.click(screen.getByRole('button', { name: 'REPORT' }))
      act(() => {
        vi.advanceTimersByTime(3000)
      })
      expect(onSwitch).not.toHaveBeenCalled()
      fireEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
      expect(onSwitch).toHaveBeenCalledWith(5)
    } finally {
      vi.useRealTimers()
    }
  })

  it('RT-RULE-04 then RT-UI-13 ending: the picture does not jump (what the player last set is flipped too)', async () => {
    const props = makeProps()
    const { container, rerender } = render(
      <Cabinet {...props} monitorEffects={fxSet('RT-RULE-04')} />
    )
    const knob = screen.getByRole('slider', { name: 'Brightness' })
    knob.focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    rerender(<Cabinet {...props} monitorEffects={fxSet()} />)
    const settled = glassBri(container)
    vi.useFakeTimers()
    // the drift waits 1.5 s after a touch of a knob (real clock): move the clock past it
    const clock = vi.spyOn(performance, 'now').mockReturnValue(1e9)
    try {
      rerender(<Cabinet {...props} monitorEffects={fxSet('RT-UI-13')} />)
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(glassBri(container)).not.toBeCloseTo(settled, 3)
      rerender(<Cabinet {...props} monitorEffects={fxSet()} />)
      expect(glassBri(container)).toBeCloseTo(settled, 3)
    } finally {
      clock.mockRestore()
      vi.useRealTimers()
    }
  })

  it('RT-RULE-02: the first REPORT press only lights the lamp for a moment (no picker, no report); the second opens it', async () => {
    const onReport = vi.fn()
    const { container } = render(
      <Cabinet
        {...makeProps({ onReport, monitorEffects: fxSet('RT-RULE-02') })}
      />
    )
    const lamp = container.querySelector('.lamp-big') as HTMLElement
    const btn = screen.getByRole('button', { name: 'REPORT' })
    expect(lamp.classList.contains('lit')).toBe(false)
    await userEvent.click(btn)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(lamp.classList.contains('lit')).toBe(true)
    await waitFor(() => expect(lamp.classList.contains('lit')).toBe(false))
    expect(onReport).not.toHaveBeenCalled()
    await userEvent.click(btn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('without RT-RULE-02 one press opens the picker at once', async () => {
    render(<Cabinet {...makeProps()} />)
    await userEvent.click(screen.getByRole('button', { name: 'REPORT' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('RT-RULE-04: turning a knob up darkens / weakens the picture, and the picture does not jump when the effect starts or ends', async () => {
    const props = makeProps()
    const { container, rerender } = render(<Cabinet {...props} />)
    const base = glassBri(container)
    rerender(<Cabinet {...props} monitorEffects={fxSet('RT-RULE-04')} />)
    expect(glassBri(container)).toBeCloseTo(base, 2)
    const knob = screen.getByRole('slider', { name: 'Brightness' })
    knob.focus()
    await userEvent.keyboard('{ArrowRight}')
    const darker = glassBri(container)
    expect(darker).toBeLessThan(base)
    rerender(<Cabinet {...props} monitorEffects={fxSet()} />)
    const after = glassBri(container)
    expect(after).toBeCloseTo(darker, 2)
    knob.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(glassBri(container)).toBeGreaterThan(after)
  })
})
