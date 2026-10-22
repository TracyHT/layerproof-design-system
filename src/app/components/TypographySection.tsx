import React from 'react';
import { DoDont } from './docs';

const heading: React.CSSProperties = { fontFamily: 'var(--font-heading)', fontWeight: 700 };
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' };
const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' };

/** Mirrors the Figma text styles (Typography collection). Class names come from typography.css. */
const typeScale: { group: string; styles: { key: string; label: string; spec: string; sample: string }[] }[] = [
  {
    group: 'Display · Mona Sans Bold',
    styles: [
      { key: 'display-l', label: 'Display L', spec: '72 / 76 · -1px', sample: 'Display large' },
      { key: 'display-m', label: 'Display M', spec: '56 / 60 · -1px', sample: 'Display medium' },
    ],
  },
  {
    group: 'Heading · Mona Sans Bold',
    styles: [
      { key: 'h1', label: 'H1', spec: '48 / 56 · -0.8px', sample: 'Heading one' },
      { key: 'h2', label: 'H2', spec: '40 / 48 · -0.6px', sample: 'Heading two' },
      { key: 'h3', label: 'H3', spec: '36 / 44 · -0.5px', sample: 'Heading three' },
      { key: 'h4', label: 'H4', spec: '32 / 40 · -0.4px', sample: 'Heading four' },
      { key: 'h5', label: 'H5', spec: '28 / 36 · -0.3px', sample: 'Heading five' },
      { key: 'h6', label: 'H6', spec: '24 / 32 · -0.2px', sample: 'Heading six' },
    ],
  },
  {
    group: 'Subheading · Montserrat Semi Bold',
    styles: [
      { key: 'subheading-lg', label: 'Subheading Large', spec: '20 / 28 · -0.1px', sample: 'Subheading large' },
      { key: 'subheading-md', label: 'Subheading Medium', spec: '18 / 28 · -0.1px', sample: 'Subheading medium' },
      { key: 'subheading-sm', label: 'Subheading Small', spec: '16 / 24 · -0.1px', sample: 'Subheading small' },
    ],
  },
  {
    group: 'Body · Montserrat Medium',
    styles: [
      { key: 'body-2xl', label: 'Body 2X Large', spec: '24 / 36 · -0.14px', sample: 'The quick brown fox jumps over the lazy dog.' },
      { key: 'body-xl', label: 'Body X Large', spec: '20 / 30 · -0.14px', sample: 'The quick brown fox jumps over the lazy dog.' },
      { key: 'body-lg', label: 'Body Large', spec: '18 / 28 · -0.14px', sample: 'The quick brown fox jumps over the lazy dog.' },
      { key: 'body', label: 'Body Default', spec: '16 / 24 · -0.14px', sample: 'The quick brown fox jumps over the lazy dog.' },
      { key: 'body-sm', label: 'Body Small', spec: '14 / 20 · -0.12px', sample: 'The quick brown fox jumps over the lazy dog.' },
      { key: 'body-xs', label: 'Body X Small', spec: '12 / 18 · -0.1px', sample: 'The quick brown fox jumps over the lazy dog.' },
      { key: 'body-2xs', label: 'Body 2X Small', spec: '11 / 16 · 0', sample: 'The quick brown fox jumps over the lazy dog.' },
    ],
  },
  {
    group: 'Label · Montserrat Semi Bold',
    styles: [
      { key: 'label-xl', label: 'Label X Large', spec: '18 / 28 · -0.14px', sample: 'Generate post' },
      { key: 'label-lg', label: 'Label Large', spec: '16 / 24 · -0.14px', sample: 'Generate post' },
      { key: 'label-md', label: 'Label Medium', spec: '14 / 20 · -0.12px', sample: 'Generate post' },
      { key: 'label-sm', label: 'Label Small', spec: '12 / 16 · -0.14px', sample: 'Generate post' },
      { key: 'label-xs', label: 'Label X Small', spec: '11 / 15 · -0.12px', sample: 'Generate post' },
    ],
  },
];

const fonts = [
  { name: 'Mona Sans', role: 'Display & headings', use: 'Display and H1–H6, set in Bold.', token: '--font-heading', style: heading },
  { name: 'Montserrat', role: 'Body, subheadings, labels', use: 'Body in Medium; subheadings and labels in Semi Bold.', token: '--font-body', style: { ...body, fontWeight: 600 } },
  { name: 'Courier Prime', role: 'Code', use: 'Code samples, token names and technical values.', token: '--font-mono', style: mono },
];

export function TypographySection() {
  return (
    <div style={{ color: 'var(--foreground-primary)' }}>

      {/* ── APPLYING TYPOGRAPHY ──────────────────────────── */}
      <div id="applying-typography" className="lp-section">
        <h2 className="lp-section__title">Applying typography</h2>
        <p className="lp-section__desc mb-6">
          Mona Sans carries display and headings; Montserrat carries everything people read and click.
          Every style ships as a token set (size, line height, letter spacing, weight) so text matches Figma exactly.
        </p>

        {/* Live usage example */}
        <div className="rounded-2xl p-8 md:p-12 mb-6" style={{ background: 'var(--background-inverse)', borderRadius: 'var(--radius-3xl)' }}>
          <p className="type-display-m" style={{ color: 'var(--foreground-inverse)' }}>
            From dump to <span style={{ color: 'var(--accent-background-default)' }}>done</span>
          </p>
          <p className="type-body-lg mt-6 max-w-md" style={{ color: 'var(--foreground-inverse)', opacity: 0.72 }}>
            Connect once. Your agent handles the rest.
          </p>
          <div className="mt-4 flex flex-wrap gap-6 type-body-xs" style={{ ...mono, color: 'var(--foreground-inverse)', opacity: 0.55 }}>
            <span>Heading → Mona Sans Bold · Display M</span>
            <span>Body → Montserrat Medium · Body Large</span>
          </div>
        </div>

        {/* Do / Don't */}
        <DoDont
          dos={[
            'Use Mona Sans Bold for display text and headings',
            'Use Montserrat Medium for body copy and Semi Bold for subheadings and labels',
            'Apply a whole text style (size, line height, tracking, weight) rather than mixing tokens',
            'Keep pink highlights to one word or phrase per heading',
            'Use Courier Prime for code and token names',
          ]}
          donts={[
            'Set long paragraphs in Mona Sans',
            'Go below Label X Small (11px) for interactive text',
            'Mix more than two typefaces in one component',
            'Override the negative letter spacing on headings',
            'Use pink text on white for small copy — use accent foreground default instead',
          ]}
        />
      </div>

      {/* ── APP TYPEFACES AND SCALE ───────────────────────── */}
      <div id="typefaces-scale" className="lp-section">
        <h2 className="lp-section__title">App typefaces &amp; scale</h2>
        <p className="lp-section__desc mb-6">
          Three typefaces form the LayerProof type system: Mona Sans for headings, Montserrat for reading and UI,
          and Courier Prime for code. Roboto is available as an optional alternative heading face (<code>--font-heading-alt</code>).
        </p>

        {/* Font families */}
        <div className="mb-16">
          <h3 className="lp-subsection__title">Typefaces</h3>
          <div className="lp-panel"><div className="lp-grid lp-grid--3">
            {fonts.map(({ name, role, use, token, style }) => (
              <div key={name} className="lp-card">
                <p style={{ ...style, fontSize: '2.5rem', lineHeight: 1.1 }}>Aa</p>
                <p className="mt-4 lp-card__meta">{role}</p>
                <p className="mt-1 type-subheading-md" style={style}>{name}</p>
                <p className="mt-2 type-body-sm" style={{ color: 'var(--foreground-secondary)' }}>{use}</p>
                <p className="mt-3 type-body-xs" style={{ ...mono, color: 'var(--foreground-tertiary)' }}>{token}</p>
              </div>
            ))}
          </div></div>
        </div>

        {/* Type scale */}
        <div className="space-y-12">
          {typeScale.map(({ group, styles }) => (
            <div key={group}>
              <h3 className="lp-subsection__title" style={{ marginBottom: 4 }}>{group}</h3>
              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {styles.map(({ key, label, spec, sample }) => (
                  <div key={key} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-5" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex-1 min-w-0">
                      <p className={`type-${key} truncate`}>{sample}</p>
                    </div>
                    <div className="shrink-0 md:text-right" style={{ minWidth: '200px' }}>
                      <p className="type-body-xs" style={{ ...mono, color: 'var(--foreground-tertiary)' }}>.type-{key}</p>
                      <p className="type-body-xs mt-0.5" style={{ color: 'var(--foreground-tertiary)' }}>{label} · {spec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
