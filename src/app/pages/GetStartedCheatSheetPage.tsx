import { FoundationShell } from '../components/FoundationShell';

const tocItems = [
  { id: 'cs-brand',      label: 'Brand Colors',   level: 1 as const },
  { id: 'cs-typography', label: 'Typography',      level: 1 as const },
  { id: 'cs-spacing',    label: 'Spacing',         level: 1 as const },
  { id: 'cs-radius',     label: 'Border Radius',   level: 1 as const },
  { id: 'cs-shadows',    label: 'Shadows',         level: 1 as const },
  { id: 'cs-tokens',     label: 'Key Tokens',      level: 1 as const },
  { id: 'cs-patterns',   label: 'UI Patterns',     level: 1 as const },
];

const H2: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.25rem',
  textTransform: 'uppercase',
  color: 'var(--color-text-primary)',
  marginBottom: '1rem',
  marginTop: 0,
};

const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.75rem',
  color: 'var(--color-text-tertiary)',
  marginTop: '0.375rem',
};

const CODE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  color: 'var(--brand-primary)',
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12">
      <h2 style={H2}>{title}</h2>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      {children}
    </div>
  );
}

// ── Brand Colors ────────────────────────────────────────────────────────────
const brandColors = [
  { label: 'Yellow (primary)', token: '--brand-primary', light: '#c9a800', dark: '#f0d040' },
  { label: 'Pink (secondary)', token: '--brand-secondary', light: '#c43460', dark: '#e8336c' },
  { label: 'Background', token: '--color-background', light: '#f5f5f5', dark: '#000000' },
  { label: 'Surface', token: '--color-surface', light: '#ffffff', dark: '#111111' },
  { label: 'Border', token: '--color-border', light: '#d4d4d4', dark: '#2a2a2a' },
  { label: 'Text primary', token: '--color-text-primary', light: '#0a0a0a', dark: '#ffffff' },
  { label: 'Text secondary', token: '--color-text-secondary', light: '#444444', dark: '#a3a3a3' },
  { label: 'Success', token: '--color-success', light: '#10b981', dark: '#34d399' },
  { label: 'Warning', token: '--color-warning', light: '#f59e0b', dark: '#fbbf24' },
  { label: 'Error', token: '--color-error', light: '#ef4444', dark: '#f87171' },
];

// ── Typography ───────────────────────────────────────────────────────────────
const typeScale = [
  { label: 'Display / h1', size: '3rem',    token: '--text-5xl',   font: 'Anton',  sample: 'Display Heading' },
  { label: 'h1',           size: '2.25rem', token: '--text-4xl',   font: 'Anton',  sample: 'Section Title' },
  { label: 'h2',           size: '1.875rem',token: '--text-3xl',   font: 'Anton',  sample: 'Sub Title' },
  { label: 'h3',           size: '1.5rem',  token: '--text-2xl',   font: 'Anton',  sample: 'Group Label' },
  { label: 'Large body',   size: '1.125rem',token: '--text-lg',    font: 'Roboto', sample: 'Lead paragraph text' },
  { label: 'Body',         size: '1rem',    token: '--text-base',  font: 'Roboto', sample: 'Default body text' },
  { label: 'Small',        size: '0.875rem',token: '--text-sm',    font: 'Roboto', sample: 'Supporting text' },
  { label: 'Caption',      size: '0.75rem', token: '--text-xs',    font: 'Roboto', sample: 'Labels, captions' },
];

// ── Spacing ───────────────────────────────────────────────────────────────────
const spacing = [
  { token: '--spacing-xs',  value: '0.25rem', px: '4px' },
  { token: '--spacing-sm',  value: '0.5rem',  px: '8px' },
  { token: '--spacing-md',  value: '1rem',    px: '16px' },
  { token: '--spacing-lg',  value: '1.5rem',  px: '24px' },
  { token: '--spacing-xl',  value: '2rem',    px: '32px' },
  { token: '--spacing-2xl', value: '3rem',    px: '48px' },
  { token: '--spacing-3xl', value: '4rem',    px: '64px' },
  { token: '--spacing-4xl', value: '6rem',    px: '96px' },
];

// ── Radius ────────────────────────────────────────────────────────────────────
const radii = [
  { token: '--radius-sm',   value: '0.375rem', use: 'Badges, chips' },
  { token: '--radius-md',   value: '0.5rem',   use: 'Buttons, inputs' },
  { token: '--radius-lg',   value: '0.75rem',  use: 'Cards, panels' },
  { token: '--radius-xl',   value: '1rem',     use: 'Large cards' },
  { token: '--radius-2xl',  value: '1.5rem',   use: 'Feature sections' },
  { token: '--radius-full', value: '9999px',   use: 'Pills, avatars' },
];

// ── Shadows ───────────────────────────────────────────────────────────────────
const shadows = [
  { token: '--shadow-sm', use: 'Tags, badges' },
  { token: '--shadow-md', use: 'Cards, dropdowns' },
  { token: '--shadow-lg', use: 'Floating panels' },
  { token: '--shadow-xl', use: 'Modals, dialogs' },
];

// ── Key tokens ────────────────────────────────────────────────────────────────
const keyTokens = [
  { token: '--font-heading',    value: '"Anton", Impact, sans-serif' },
  { token: '--font-body',       value: '"Roboto", sans-serif' },
  { token: '--font-mono',       value: '"Monaco", "Courier New", monospace' },
  { token: '--transition-fast', value: '150ms cubic-bezier(0.4,0,0.2,1)' },
  { token: '--transition-base', value: '300ms cubic-bezier(0.4,0,0.2,1)' },
  { token: '--header-height',   value: '56px' },
  { token: '--sidebar-width',   value: '220px' },
];

export function GetStartedCheatSheetPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="Cheat Sheet"
      description="A one-page reference to the full LayerProof design system — colors, type, spacing, tokens, and UI patterns at a glance."
      tocItems={tocItems}
    >

      {/* Brand Colors */}
      <Section id="cs-brand" title="Brand Colors">
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
          {brandColors.map(({ label, token, light, dark }) => (
            <div key={token}>
              <div
                className="rounded-lg w-full"
                style={{ height: 48, background: dark, border: '1px solid var(--color-border)' }}
              />
              <p style={{ ...LABEL, color: 'var(--color-text-primary)', fontSize: '0.8125rem', marginTop: '0.5rem' }}>{label}</p>
              <p style={LABEL}><code style={CODE}>{token}</code></p>
              <p style={LABEL}>{dark} · {light}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section id="cs-typography" title="Typography">
        <Card>
          <div className="space-y-4">
            {typeScale.map(({ label, size, token, font, sample }) => (
              <div key={token} className="flex items-baseline gap-4" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                <div style={{ minWidth: 180 }}>
                  <p style={{ ...LABEL, fontSize: '0.75rem' }}>{label}</p>
                  <p style={LABEL}><code style={CODE}>{token}</code> · {size}</p>
                </div>
                <span
                  style={{
                    fontFamily: font === 'Anton' ? 'var(--font-heading)' : 'var(--font-body)',
                    fontSize: `min(${size}, 2rem)`,
                    textTransform: font === 'Anton' ? 'uppercase' : 'none',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.2,
                  }}
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Spacing */}
      <Section id="cs-spacing" title="Spacing">
        <Card>
          <div className="space-y-3">
            {spacing.map(({ token, value, px }) => (
              <div key={token} className="flex items-center gap-4">
                <code style={{ ...CODE, minWidth: 160 }}>{token}</code>
                <div
                  style={{
                    height: 20,
                    width: `calc(${value} * 3)`,
                    background: 'var(--brand-primary)',
                    borderRadius: 3,
                    minWidth: 4,
                    flexShrink: 0,
                  }}
                />
                <span style={LABEL}>{value} — {px}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Border Radius */}
      <Section id="cs-radius" title="Border Radius">
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
          {radii.map(({ token, value, use }) => (
            <div key={token} className="flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: 'var(--color-surface-hover)',
                  border: '2px solid var(--color-border)',
                  borderRadius: value === '9999px' ? '9999px' : value,
                }}
              />
              <code style={{ ...CODE, textAlign: 'center' }}>{token}</code>
              <p style={{ ...LABEL, textAlign: 'center' }}>{value}</p>
              <p style={{ ...LABEL, textAlign: 'center', color: 'var(--color-text-tertiary)' }}>{use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section id="cs-shadows" title="Shadows">
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {shadows.map(({ token, use }) => (
            <div key={token} className="flex flex-col items-center gap-3 p-5 rounded-xl" style={{ background: 'var(--color-background)' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'var(--color-surface)',
                  borderRadius: '0.75rem',
                  boxShadow: `var(${token})`,
                }}
              />
              <code style={{ ...CODE, textAlign: 'center' }}>{token}</code>
              <p style={{ ...LABEL, textAlign: 'center' }}>{use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Tokens */}
      <Section id="cs-tokens" title="Key Tokens">
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          {keyTokens.map(({ token, value }, i) => (
            <div
              key={token}
              className="flex items-center gap-4 px-4 py-2.5"
              style={{
                background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-background)',
                borderBottom: i < keyTokens.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <code style={{ ...CODE, minWidth: 200 }}>{token}</code>
              <code style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>{value}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* UI Patterns */}
      <Section id="cs-patterns" title="UI Patterns">
        <div className="space-y-6">

          {/* Buttons */}
          <Card>
            <p style={{ ...LABEL, marginTop: 0, marginBottom: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Buttons</p>
            <div className="flex flex-wrap gap-3">
              <button style={{ background: '#ffffff', color: '#000000', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Primary
              </button>
              <button style={{ background: 'transparent', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                Secondary
              </button>
              <button style={{ background: 'transparent', color: 'var(--brand-primary)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Ghost
              </button>
              <button style={{ background: 'var(--color-error)', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Destructive
              </button>
            </div>
          </Card>

          {/* Badges */}
          <Card>
            <p style={{ ...LABEL, marginTop: 0, marginBottom: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Badges</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Default',  bg: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' },
                { label: 'Brand',    bg: '#f0d04022',                   color: '#f0d040' },
                { label: 'Success',  bg: '#10b98122',                   color: '#10b981' },
                { label: 'Warning',  bg: '#f59e0b22',                   color: '#f59e0b' },
                { label: 'Error',    bg: '#ef444422',                   color: '#ef4444' },
                { label: 'Beta',     bg: '#e8336c22',                   color: '#e8336c' },
              ].map(({ label, bg, color }) => (
                <span key={label} style={{ background: bg, color, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.6875rem', padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em' }}>
                  {label}
                </span>
              ))}
            </div>
          </Card>

          {/* Card surface */}
          <Card>
            <p style={{ ...LABEL, marginTop: 0, marginBottom: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Card Anatomy</p>
            <div className="rounded-xl p-5" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)', maxWidth: 340 }}>
              <div className="w-full rounded-lg mb-4" style={{ height: 100, background: 'var(--color-surface-hover)' }} />
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', margin: '0 0 0.25rem' }}>Card Title</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem' }}>Supporting description text for this card.</p>
              <button style={{ background: '#ffffff', color: '#000000', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8125rem', padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Action
              </button>
            </div>
          </Card>

        </div>
      </Section>

    </FoundationShell>
  );
}
