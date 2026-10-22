import { FoundationShell } from '../../components/FoundationShell';
import { CopyChip, PairingCard, UsageSample } from '../../components/ColorHelpers';

const pink = [
  { hex: '#fef4f7', dark: true }, { hex: '#fde8ef', dark: true }, { hex: '#fbc5d8', dark: true },
  { hex: '#f598bb', dark: true }, { hex: '#ef6994', dark: true }, { hex: '#ff589b', dark: true },
  { hex: '#c43460' }, { hex: '#9a2550' }, { hex: '#6e1839' }, { hex: '#440e23' }, { hex: '#290b17' },
];

const accentTokens = [
  { token: '--accent-background-default', use: 'Primary brand surface: primary buttons, active indicators', light: 'Pink 500', dark: 'Pink 500' },
  { token: '--accent-background-hover', use: 'Hovered accent surface', light: 'Pink 600', dark: 'Pink 400' },
  { token: '--accent-background-pressed', use: 'Pressed accent surface', light: 'Pink 700', dark: 'Pink 300' },
  { token: '--accent-background-subtle', use: 'Quiet branded surface', light: 'Pink 100', dark: 'Pink 900' },
  { token: '--accent-background-selected', use: 'Selected item background', light: 'Pink 200', dark: 'Pink 800' },
  { token: '--accent-background-faint', use: 'Metric cards and quiet accent regions (never text)', light: 'Pink 50', dark: 'Pink 950' },
  { token: '--accent-foreground-default', use: 'Accessible links, accent text and icons', light: 'Pink 700', dark: 'Pink 300' },
  { token: '--accent-foreground-brand', use: 'Signature pink text for emphasised metrics', light: 'Pink 500', dark: 'Pink 500' },
  { token: '--accent-foreground-on-accent', use: 'Text and icons on Pink 500', light: 'Gray 900', dark: 'Gray 900' },
  { token: '--accent-border-default', use: 'Accent outline and selected boundary', light: 'Pink 500', dark: 'Pink 400' },
  { token: '--accent-focus-ring', use: 'Brand focus ring', light: 'Pink 500', dark: 'Pink 400' },
];


export function ColorAccentsPage() {
  return (
    <FoundationShell
      tag={['Foundations', 'Color']}
      title="Accents"
      description="Pink #FF589B is LayerProof's single brand accent. Reserve it for meaningful emphasis — primary actions, focus and selection — and let neutrals carry the rest of the interface."
    >
      <div className="space-y-14" style={{ color: 'var(--foreground-primary)' }}>

        {/* Pink scale */}
        <div>
          <h3 className="lp-subsection__title">Pink · 50–950</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 gap-2">
            {pink.map(s => <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />)}
          </div>
        </div>

        {/* Accent tokens */}
        <div>
          <h3 className="lp-subsection__title">Accent tokens</h3>
          <div className="lp-rows lp-rows--outline">
            {accentTokens.map((t, i) => (
              <div key={t.token} className="flex items-center gap-4 px-4 py-3"
                style={{ borderTop: i ? '1px solid var(--border-subtle)' : 'none', background: 'var(--background-canvas)' }}>
                <span className="shrink-0 rounded-md" style={{ width: 28, height: 28, background: `var(${t.token})`, border: '1px solid var(--border-subtle)' }} />
                <div className="flex-1 min-w-0">
                  <p className="type-body-sm truncate" style={{ fontFamily: 'var(--font-mono)' }}>{t.token}</p>
                  <p className="type-body-xs" style={{ color: 'var(--foreground-secondary)' }}>{t.use}</p>
                </div>
                <p className="type-body-xs shrink-0 text-right" style={{ color: 'var(--foreground-tertiary)', minWidth: 140 }}>
                  {t.light} · {t.dark} <span style={{ opacity: 0.7 }}>(dark)</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accent pairings */}
        <div>
          <h3 className="lp-subsection__title">Accent pairings</h3>
          <div className="lp-grid lp-grid--4">
            <PairingCard num="01" bg="#ff589b" fg="#1a1a1a" label="On-accent on Pink" sublabel="Gray 900 on Pink 500 · 5.9:1" />
            <PairingCard num="02" bg="#1a1a1a" fg="#ff589b" label="Pink on dark" sublabel="Pink 500 on Gray 900 · 5.9:1" />
            <PairingCard num="03" bg="#ffffff" fg="#9a2550" label="Accent text on white" sublabel="Pink 700 on White · 7.6:1" />
            <PairingCard num="04" bg="#ff589b" fg="#ffffff" label="White on Pink" sublabel="Accent primary button · 2.9:1" />
          </div>
          <p className="type-body-xs mt-3" style={{ color: 'var(--foreground-tertiary)' }}>
            White on Pink 500 is the brand decision for accent primary buttons (<code>--button-accent-primary-foreground</code>), but at 2.9:1 it
            doesn't meet WCAG AA. Keep labels bold and at Label Medium or larger, or use <code>--accent-foreground-on-accent</code> where contrast matters.
          </p>
        </div>

        {/* In use */}
        <div>
          <h3 className="lp-subsection__title">In use</h3>
          <div className="lp-grid lp-grid--3">
            <UsageSample num="01" bg="#1a1a1a">
              <p className="type-h5" style={{ color: '#f5f5f5' }}>
                From dump to <span style={{ color: '#ff589b' }}>done</span>
              </p>
              <p className="mt-2 type-body-xs" style={{ color: '#a3a3a3' }}>One pink highlight per heading</p>
            </UsageSample>
            <UsageSample num="02" bg="#ffffff">
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="rounded-full px-3 py-1 type-label-sm" style={{ background: 'var(--pink-500)', color: 'var(--gray-900)' }}>New</span>
                <span className="rounded-full px-3 py-1 type-label-sm" style={{ background: 'var(--pink-100)', color: 'var(--pink-700)' }}>Featured</span>
                <span className="rounded-full px-3 py-1 type-label-sm" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>Draft</span>
              </div>
              <p className="mt-3 type-body-xs" style={{ color: '#737373' }}>Tags and status badges</p>
            </UsageSample>
            <UsageSample num="03" bg="#ffffff">
              <div className="rounded-xl p-4" style={{ background: 'var(--pink-50)', border: '1px solid var(--pink-100)' }}>
                <p className="type-body-xs" style={{ color: '#525252' }}>Posts generated this week</p>
                <p className="type-h3" style={{ color: 'var(--pink-500)' }}>128</p>
                <p className="type-body-xs" style={{ color: '#737373' }}>Faint accent card with a brand metric</p>
              </div>
            </UsageSample>
          </div>
        </div>

      </div>
    </FoundationShell>
  );
}
