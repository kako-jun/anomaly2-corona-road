interface StartScreenProps {
  onStart: () => void
}

export const StartScreen = ({ onStart }: StartScreenProps) => (
  <div className="screen">
    <img
      src="/images/logo.webp"
      alt="Anomaly² Corona Road"
      className="start__logo"
    />
    <h1 className="sr-only">ANOMALY² Corona Road</h1>

    <div className="start__subtitle">
      UNDERGROUND SURVEILLANCE SYSTEM
      <br />
      NIGHT SHIFT · 00:00 → 06:00
    </div>

    <div className="card">
      <div className="start__card-label start__card-label--obj">OBJECTIVE</div>
      <p style={{ color: 'var(--text-mid)', fontSize: 'var(--text-body)' }}>
        Monitor the eight Corona Road cameras. Report each anomaly with the
        correct category. Survive until dawn.
      </p>
    </div>

    <div className="card">
      <div className="start__card-label start__card-label--ctl">CONTROLS</div>
      <ul className="start__list">
        <li>· Drag, swipe, or use ‹ › to switch cameras</li>
        <li>· Keyboard: ← →, A / D, 1–8</li>
        <li>· Tap REPORT ANOMALY and pick the matching type</li>
      </ul>
    </div>

    <div className="card card--danger">
      <div className="start__card-label start__card-label--warn">WARNING</div>
      <ul className="start__list">
        <li>· 3 false reports end your shift</li>
        <li>· At least 4 confirmed reports needed to clear</li>
        <li>· Late-phase anomalies break the rules</li>
      </ul>
    </div>

    <button
      type="button"
      className="btn btn--filled-primary btn--block"
      onClick={onStart}
    >
      BEGIN SHIFT
    </button>

    <div className="start__version">v1.1.0 · Anomaly Detection System</div>
  </div>
)
