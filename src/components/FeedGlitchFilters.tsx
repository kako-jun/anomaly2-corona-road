/**
 * SVG filters for the two feed glitches CSS filters cannot draw (#78): `wave` (the picture is pulled sideways in
 * slices) and `chroma` (red and blue slide apart). Zero-size, mounted only while one of them is shown. A filter on the
 * picture box is referenced as `url(#fg-wave)` / `url(#fg-chroma)` from src/styles/feedGlitch.css.
 */
export const FeedGlitchFilters = () => {
  // reduced motion: the wave stays one still state (no <animate>), like the CSS glitches
  const still =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute' }}
    >
      <filter
        id="fg-wave"
        x="0"
        y="0"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.002 0.03"
          numOctaves="1"
          seed="3"
          result="n"
        >
          {!still && (
            <animate
              attributeName="baseFrequency"
              dur="3.5s"
              repeatCount="indefinite"
              values="0.002 0.03;0.003 0.055;0.002 0.03"
            />
          )}
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="n"
          scale="46"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
      <filter
        id="fg-chroma"
        x="0"
        y="0"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="r"
        />
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="g"
        />
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
          result="b"
        />
        <feOffset in="r" dx="-9" dy="0" result="r2" />
        <feOffset in="b" dx="9" dy="0" result="b2" />
        <feBlend in="r2" in2="g" mode="screen" result="rg" />
        <feBlend in="rg" in2="b2" mode="screen" />
      </filter>
    </svg>
  )
}
