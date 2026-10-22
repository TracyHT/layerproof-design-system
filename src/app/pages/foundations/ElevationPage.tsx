import { FoundationShell } from '../../components/FoundationShell';

/** One variable per Figma effect style: Shadows/<Family>/<Level>. Values live in src/styles/shadows.css. */
const levels = [1, 2, 3, 4, 5, 6, 7];
const families = [
  { id: 'neutral', label: 'Neutral', use: 'Default elevation for cards, menus, popovers and dialogs.', extras: ['elevated-button', 'gradient-button'] },
  { id: 'accent', label: 'Accent', use: 'Pink-tinted elevation for brand moments and selected or featured items.', extras: ['gradient-button'] },
  { id: 'danger', label: 'Danger', use: 'Red-tinted elevation for destructive surfaces.', extras: ['button'] },
  { id: 'success', label: 'Success', use: 'Green-tinted elevation for confirmation surfaces.', extras: [] },
  { id: 'warning', label: 'Warning', use: 'Orange-tinted elevation for caution surfaces.', extras: [] },
];

const guide = [
  { level: '1–2', use: 'Resting cards, tags, inputs' },
  { level: '3–4', use: 'Hovered cards, dropdowns, tooltips' },
  { level: '5–6', use: 'Popovers, floating panels, sheets' },
  { level: '7', use: 'Modals and dialogs' },
];


function Tile({ token, caption }: { token: string; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-xl)', background: 'var(--background-surface-raised)', boxShadow: `var(${token})` }} />
      <div className="text-center">
        <p className="type-label-xs">{caption}</p>
        <p className="type-body-2xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--foreground-tertiary)' }}>{token}</p>
      </div>
    </div>
  );
}

export function ElevationPage() {
  return (
    <FoundationShell
      title="Elevation"
      description="Seven shadow levels in five families, taken straight from the Figma effect styles. Shadow colours are tokens too, so tints stay consistent in light and dark mode."
      tocItems={[
        { id: 'elevation-levels', label: 'Choosing a level', level: 1 as const },
        ...families.map(f => ({ id: `elevation-${f.id}`, label: f.label, level: 1 as const })),
        { id: 'elevation-colours', label: 'Shadow colours', level: 1 as const },
      ]}
    >
      <div style={{ color: 'var(--foreground-primary)' }}>

        <section id="elevation-levels" className="lp-section">
          <h3 className="lp-subsection__title">Choosing a level</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {guide.map(g => (
              <div key={g.level} className="lp-card lp-card--outline">
                <p className="type-subheading-md">Level {g.level}</p>
                <p className="type-body-sm mt-1" style={{ color: 'var(--foreground-secondary)' }}>{g.use}</p>
              </div>
            ))}
          </div>
        </section>

        {families.map(f => (
          <section key={f.id} id={`elevation-${f.id}`} className="lp-section">
            <h2 className="lp-section__title">{f.label}</h2>
            <p className="lp-section__desc" style={{ marginBottom: 20 }}>{f.use}</p>
            <div className="rounded-2xl p-8 grid gap-8" style={{ background: 'var(--background-canvas)', border: '1px solid var(--border-subtle)', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
              {levels.map(l => <Tile key={l} token={`--shadow-${f.id}-${l}`} caption={`Level ${l}`} />)}
              {f.extras.map(x => <Tile key={x} token={`--shadow-${f.id}-${x}`} caption={x.replace('-', ' ')} />)}
            </div>
          </section>
        ))}

        <section id="elevation-colours" className="lp-section">
          <h2 className="lp-section__title">Shadow colours</h2>
          <p className="lp-section__desc" style={{ marginBottom: 16 }}>
            Every effect style is built from these colour tokens (a primitive at a fixed opacity), identical in light and dark mode.
          </p>
          <div className="lp-rows lp-rows--outline">
            {[
              ['--shadow-neutral-soft', 'Gray 950 · 4%'], ['--shadow-neutral-strong', 'Gray 950 · 9%'],
              ['--shadow-accent-soft', 'Pink 500 · 8%'], ['--shadow-accent-strong', 'Pink 500 · 12%'], ['--shadow-accent-glow', 'Pink 500 · 100%'],
              ['--shadow-danger-soft', 'Red 500 · 8%'], ['--shadow-danger-strong', 'Red 500 · 12%'],
              ['--shadow-success-soft', 'Green 500 · 8%'], ['--shadow-success-strong', 'Green 500 · 12%'],
              ['--shadow-warning-soft', 'Orange 500 · 8%'], ['--shadow-warning-strong', 'Orange 500 · 12%'],
              ['--shadow-highlight', 'White · 50% (inner)'], ['--shadow-highlight-strong', 'White · 60% (inner)'],
            ].map(([token, desc], i) => (
              <div key={token} className="flex items-center gap-4 px-4 py-2.5" style={{ borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                <span className="rounded" style={{ width: 20, height: 20, background: `var(${token})`, border: '1px solid var(--border-subtle)' }} />
                <code className="type-body-sm flex-1" style={{ fontFamily: 'var(--font-mono)' }}>{token}</code>
                <span className="type-body-xs" style={{ color: 'var(--foreground-tertiary)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </FoundationShell>
  );
}
