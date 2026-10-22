import { FoundationShell } from '../components/FoundationShell';
import { Section as DocSection } from '../components/docs';

const tocItems = [
  { id: 'cs-brand',      label: 'Brand colors',   level: 1 as const },
  { id: 'cs-typography', label: 'Typography',      level: 1 as const },
  { id: 'cs-spacing',    label: 'Spacing',         level: 1 as const },
  { id: 'cs-radius',     label: 'Border radius',   level: 1 as const },
  { id: 'cs-shadows',    label: 'Shadows',         level: 1 as const },
  { id: 'cs-tokens',     label: 'Key tokens',      level: 1 as const },
  { id: 'cs-patterns',   label: 'UI patterns',     level: 1 as const },
];

const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  fontSize: 'var(--text-body-xs)',
  lineHeight: 'var(--lh-body-xs)',
  color: 'var(--foreground-tertiary)',
  marginTop: '0.25rem',
};

const CODE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  color: 'var(--foreground-primary)',
};

function Section({ id, title, desc, children }: { id: string; title: string; desc?: string; children: React.ReactNode }) {
  return <DocSection id={id} title={title} desc={desc}>{children}</DocSection>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="lp-card lp-card--outline">{children}</div>;
}

// ── Brand Colors ────────────────────────────────────────────────────────────
const brandColors = [
  { label: 'Accent',           token: '--accent-background-default', light: '#ff589b', dark: '#ff589b', note: 'Pink 500 — primary actions, focus, selection' },
  { label: 'Accent text',      token: '--accent-foreground-default', light: '#9a2550', dark: '#f598bb', note: 'Links and accent text' },
  { label: 'Neutral action',   token: '--action-neutral-background-default', light: '#1a1a1a', dark: '#ffffff', note: '' },
  { label: 'Canvas',           token: '--background-canvas',  light: '#ffffff', dark: '#1a1a1a', note: '' },
  { label: 'Surface',          token: '--background-surface', light: '#f5f5f5', dark: '#1c1c1c', note: '' },
  { label: 'Border',           token: '--border-default',     light: '#d4d4d4', dark: '#1c1c1c', note: '' },
  { label: 'Text primary',     token: '--foreground-primary', light: '#1a1a1a', dark: '#f5f5f5', note: '' },
  { label: 'Text secondary',   token: '--foreground-secondary', light: '#525252', dark: '#a3a3a3', note: '' },
  { label: 'Success',          token: '--status-success-icon', light: '#00a63e', dark: '#05df72', note: '' },
  { label: 'Warning',          token: '--status-warning-icon', light: '#e87a2f', dark: '#ffa866', note: '' },
  { label: 'Danger',           token: '--status-danger-icon',  light: '#c9000a', dark: '#f87171', note: '' },
  { label: 'Info',             token: '--status-info-icon',    light: '#02aec6', dark: '#1be8f5', note: '' },
];

// ── Typography ───────────────────────────────────────────────────────────────
const typeScale = [
  { label: 'Display L',     size: '72 / 76', token: '.type-display-l',  sample: 'Display' },
  { label: 'Heading 1',     size: '48 / 56', token: '.type-h1',         sample: 'Heading one' },
  { label: 'Heading 2',     size: '40 / 48', token: '.type-h2',         sample: 'Heading two' },
  { label: 'Heading 3',     size: '36 / 44', token: '.type-h3',         sample: 'Heading three' },
  { label: 'Heading 4',     size: '32 / 40', token: '.type-h4',         sample: 'Heading four' },
  { label: 'Heading 5',     size: '28 / 36', token: '.type-h5',         sample: 'Heading five' },
  { label: 'Heading 6',     size: '24 / 32', token: '.type-h6',         sample: 'Heading six' },
  { label: 'Subheading L',  size: '20 / 28', token: '.type-subheading-lg', sample: 'Subheading' },
  { label: 'Body Large',    size: '18 / 28', token: '.type-body-lg',    sample: 'Lead paragraph text' },
  { label: 'Body',          size: '16 / 24', token: '.type-body',       sample: 'Default body text' },
  { label: 'Body Small',    size: '14 / 20', token: '.type-body-sm',    sample: 'Supporting text' },
  { label: 'Label Medium',  size: '14 / 20', token: '.type-label-md',   sample: 'Button label' },
  { label: 'Label X Small', size: '11 / 15', token: '.type-label-xs',   sample: 'Captions, tags' },
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
  { token: '--radius-none', value: '0',        use: 'Square corners' },
  { token: '--radius-xsm',  value: '0.125rem', use: 'Subtle rounding' },
  { token: '--radius-sm',   value: '0.25rem',  use: 'Badges, chips' },
  { token: '--radius-md',   value: '0.375rem', use: 'Buttons, inputs' },
  { token: '--radius-lg',   value: '0.5rem',   use: 'Cards, panels' },
  { token: '--radius-xl',   value: '0.75rem',  use: 'Large cards' },
  { token: '--radius-2xl',  value: '1rem',     use: 'Feature sections' },
  { token: '--radius-full', value: '1000px',   use: 'Pills, avatars' },
];

// ── Shadows ───────────────────────────────────────────────────────────────────
const shadows = [
  { token: '--shadow-neutral-1', use: 'Level 1' },
  { token: '--shadow-neutral-2', use: 'Level 2' },
  { token: '--shadow-neutral-3', use: 'Level 3' },
  { token: '--shadow-neutral-5', use: 'Level 5' },
  { token: '--shadow-neutral-7', use: 'Level 7' },
  { token: '--shadow-accent-3',  use: 'Accent level 3' },
];

// ── Key tokens ────────────────────────────────────────────────────────────────
const keyTokens = [
  { token: '--font-heading',    value: '"Mona Sans", system-ui, sans-serif' },
  { token: '--font-body',       value: '"Montserrat", system-ui, sans-serif' },
  { token: '--font-mono',       value: '"Courier Prime", "Courier New", monospace' },
  { token: '--transition-fast', value: '150ms cubic-bezier(0.4,0,0.2,1)' },
  { token: '--transition-base', value: '300ms cubic-bezier(0.4,0,0.2,1)' },
  { token: '--header-height',   value: '70px' },
  { token: '--sidebar-width',   value: '280px' },
];

export function GetStartedCheatSheetPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="Cheat sheet"
      description="A one-page reference to the full LayerProof design system — colors, type, spacing, tokens, and UI patterns at a glance."
      tocItems={tocItems}
    >

      {/* Brand Colors */}
      <Section id="cs-brand" title="Brand colors" desc="Neutrals carry the interface. Pink is the single brand accent — primary actions, focus and selection, never large fills. Each swatch shows light, then dark.">
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
          {brandColors.map(({ label, token, light, dark, note }) => (
            <div key={token}>
              <div className="w-full flex overflow-hidden" style={{ height: 48, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ flex: 1, background: light }} />
                <div style={{ flex: 1, background: dark }} />
              </div>
              <p className="type-label-md" style={{ marginTop: '0.5rem' }}>{label}</p>
              <p style={LABEL}><code style={CODE}>{token}</code></p>
              <p style={LABEL}>{light} / {dark}</p>
              {note && <p style={LABEL}>{note}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section id="cs-typography" title="Typography">
        <Card>
          <div className="space-y-4">
            {typeScale.map(({ label, size, token, sample }) => (
              <div key={token} className="flex items-baseline gap-4" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ minWidth: 180 }}>
                  <p style={{ ...LABEL, fontSize: '0.75rem' }}>{label}</p>
                  <p style={LABEL}><code style={CODE}>{token}</code> · {size}</p>
                </div>
                <span className={token.slice(1)} style={{ color: 'var(--foreground-primary)', fontSize: label.startsWith('Display') ? 'var(--text-h4)' : undefined, lineHeight: label.startsWith('Display') ? 'var(--lh-h4)' : undefined }}>
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
                    background: 'var(--accent-background-default)',
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
      <Section id="cs-radius" title="Border radius">
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
          {radii.map(({ token, value, use }) => (
            <div key={token} className="lp-card lp-card--outline flex flex-col items-center gap-2">
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: 'var(--accent-background-subtle)',
                  border: '2px solid var(--accent-border-default)',
                  borderRadius: value === '9999px' ? '9999px' : value,
                }}
              />
              <code style={{ ...CODE, textAlign: 'center' }}>{token}</code>
              <p style={{ ...LABEL, textAlign: 'center' }}>{value}</p>
              <p style={{ ...LABEL, textAlign: 'center', color: 'var(--foreground-tertiary)' }}>{use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section id="cs-shadows" title="Shadows">
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {shadows.map(({ token, use }) => (
            <div key={token} className="lp-card flex flex-col items-center gap-3" style={{ background: 'var(--background-surface)' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'var(--background-surface-raised)',
                  borderRadius: 'var(--radius-xl)',
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
      <Section id="cs-tokens" title="Key tokens">
        <div className="lp-rows lp-rows--outline">
          {keyTokens.map(({ token, value }, i) => (
            <div
              key={token}
              className="flex items-center gap-4 px-4 py-2.5"
              style={{
                borderBottom: i < keyTokens.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <code style={{ ...CODE, minWidth: 200 }}>{token}</code>
              <code style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--foreground-secondary)' }}>{value}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* UI Patterns */}
      <Section id="cs-patterns" title="UI patterns">
        <div className="space-y-6">

          {/* Buttons */}
          <Card>
            <p className="lp-subsection__title">Buttons</p>
            <div className="flex flex-wrap gap-3">
              <button style={{ background: 'var(--action-primary-background-default)', color: 'var(--button-accent-primary-foreground)', fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Primary
              </button>
              <button style={{ background: 'var(--action-neutral-background-default)', color: 'var(--foreground-inverse)', fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Neutral
              </button>
              <button style={{ background: 'var(--action-secondary-background-default)', color: 'var(--action-secondary-foreground)', fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--action-secondary-border)', cursor: 'pointer' }}>
                Secondary
              </button>
              <button style={{ background: 'transparent', color: 'var(--action-tertiary-foreground-default)', fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Ghost
              </button>
              <button style={{ background: 'var(--button-danger-primary-background-default)', color: 'var(--button-danger-primary-foreground)', fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.875rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Destructive
              </button>
            </div>
          </Card>

          {/* Badges */}
          <Card>
            <p className="lp-subsection__title">Badges</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Default',  bg: 'var(--background-muted)',            color: 'var(--foreground-secondary)' },
                { label: 'Brand',    bg: 'var(--accent-background-subtle)',    color: 'var(--accent-foreground-default)' },
                { label: 'Success',  bg: 'var(--status-success-background)',   color: 'var(--status-success-foreground)' },
                { label: 'Warning',  bg: 'var(--status-warning-background)',   color: 'var(--status-warning-foreground)' },
                { label: 'Danger',   bg: 'var(--status-danger-background)',    color: 'var(--status-danger-foreground)' },
                { label: 'Info',     bg: 'var(--status-info-background)',      color: 'var(--status-info-foreground)' },
              ].map(({ label, bg, color }) => (
                <span key={label} style={{ background: bg, color, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.6875rem', padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em' }}>
                  {label}
                </span>
              ))}
            </div>
          </Card>

          {/* Card surface */}
          <Card>
            <p className="lp-subsection__title">Card Anatomy</p>
            <div className="rounded-xl p-5" style={{ background: 'var(--background-surface-raised)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-neutral-2)', maxWidth: 340 }}>
              <div className="w-full rounded-lg mb-4" style={{ height: 100, background: 'var(--background-muted)' }} />
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--foreground-primary)', margin: '0 0 0.25rem' }}>Card Title</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--foreground-secondary)', margin: '0 0 1rem' }}>Supporting description text for this card.</p>
              <button style={{ background: 'var(--action-neutral-background-default)', color: 'var(--foreground-inverse)', fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.8125rem', padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
                Action
              </button>
            </div>
          </Card>

        </div>
      </Section>

    </FoundationShell>
  );
}
