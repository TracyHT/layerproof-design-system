import React from 'react';

const anton: React.CSSProperties = { fontFamily: '"Anton", sans-serif', textTransform: 'uppercase' };
const roboto: React.CSSProperties = { fontFamily: '"Roboto", sans-serif' };
const dmSans: React.CSSProperties = { fontFamily: '"DM Sans", sans-serif' };
const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' };

const typeScale = [
  { label: 'Display',     size: '3.75rem', weight: '400', lh: '1.1', font: anton,  sample: 'Display Heading' },
  { label: 'Heading 1',  size: '3rem',    weight: '400', lh: '1.2', font: anton,  sample: 'Heading One' },
  { label: 'Heading 2',  size: '2.25rem', weight: '400', lh: '1.2', font: anton,  sample: 'Heading Two' },
  { label: 'Heading 3',  size: '1.875rem',weight: '400', lh: '1.3', font: anton,  sample: 'Heading Three' },
  { label: 'Heading 4',  size: '1.5rem',  weight: '400', lh: '1.4', font: anton,  sample: 'Heading Four' },
  { label: 'Body Large', size: '1.125rem',weight: '400', lh: '1.6', font: roboto, sample: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Body',       size: '1rem',    weight: '400', lh: '1.6', font: roboto, sample: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Body Small', size: '0.875rem',weight: '400', lh: '1.5', font: roboto, sample: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Caption',    size: '0.75rem', weight: '400', lh: '1.5', font: roboto, sample: 'Caption / label text' },
];

const fonts = [
  { name: 'Anton',   role: 'Headings',   use: 'All h1–h4, section titles, display text',            style: anton  },
  { name: 'DM Sans', role: 'Logo / UI',  use: 'Logo wordmark, nav labels, UI accent text',           style: dmSans },
  { name: 'Roboto',  role: 'Body',       use: 'Paragraphs, descriptions, labels, captions',          style: roboto },
];

export function TypographySection() {
  return (
    <div className="space-y-24" style={{ color: 'var(--color-text-primary)' }}>

      {/* ── APPLYING TYPOGRAPHY ──────────────────────────── */}
      <div id="applying-typography">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ ...mono, color: 'var(--color-text-tertiary)' }}>Typography</p>
          <h3 style={{ ...anton, fontSize: '2rem', color: 'var(--color-text-primary)' }}>
            Applying Typography
          </h3>
        </div>

        <p className="text-sm mb-8" style={{ ...roboto, color: 'var(--color-text-secondary)' }}>
          LayerProof typography is built around contrast and intent. Anton delivers high-impact headlines;
          Roboto ensures readability at every size. Always apply type on surfaces with sufficient contrast.
        </p>

        {/* Live usage example */}
        <div className="rounded-2xl p-8 md:p-12 mb-10" style={{ background: '#000000' }}>
          <p style={{ ...anton, fontSize: '3rem', color: '#f0d040', lineHeight: 1.1 }}>
            FROM DUMP
          </p>
          <p style={{ ...anton, fontSize: '3rem', color: '#ffffff', lineHeight: 1.1 }}>
            TO DONE
          </p>
          <p className="mt-6 text-base max-w-md" style={{ ...roboto, color: 'rgba(255,255,255,0.6)' }}>
            Connect once. Your agent handles the rest.
          </p>
          <div className="mt-4 text-xs flex flex-wrap gap-6" style={{ ...mono, color: 'rgba(255,255,255,0.3)' }}>
            <span>Heading → Anton / uppercase / yellow or white</span>
            <span>Body → Roboto / sentence case</span>
          </div>
        </div>

        {/* Do / Don't */}
        <div className="rounded-2xl p-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ ...anton, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
            Guidelines
          </h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: '#10b981' }}>DO</p>
              <ul className="space-y-2 text-sm" style={{ ...roboto, color: 'var(--color-text-secondary)' }}>
                <li>✓ Use Anton (uppercase) for headings and display text</li>
                <li>✓ Use Roboto for all body copy and UI labels</li>
                <li>✓ Pair headline accents sparingly — one color highlight per heading</li>
                <li>✓ Maintain a clear size hierarchy (display → h1 → body)</li>
                <li>✓ Use DM Sans only for the logo wordmark and brand-adjacent UI</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: '#ef4444' }}>DON'T</p>
              <ul className="space-y-2 text-sm" style={{ ...roboto, color: 'var(--color-text-secondary)' }}>
                <li>✗ Don't use Anton for body copy or long paragraphs</li>
                <li>✗ Don't use sentence case in Anton — it's always uppercase</li>
                <li>✗ Don't mix more than two typefaces in a single component</li>
                <li>✗ Don't use text smaller than 12px / Caption for interactive elements</li>
                <li>✗ Don't reduce line-height below 1.1 for display sizes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── APP TYPEFACES AND SCALE ───────────────────────── */}
      <div id="typefaces-scale">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ ...mono, color: 'var(--color-text-tertiary)' }}>Typography</p>
          <h3 style={{ ...anton, fontSize: '2rem', color: 'var(--color-text-primary)' }}>
            App Typefaces &amp; Scale
          </h3>
        </div>

        <p className="text-sm mb-10" style={{ ...roboto, color: 'var(--color-text-secondary)' }}>
          Three typefaces form the LayerProof type system — Anton for impact, DM Sans for the brand identity,
          and Roboto for readability.
        </p>

        {/* Font families */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ ...mono, color: 'var(--color-text-tertiary)' }}>Typefaces</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fonts.map(({ name, role, use, style }) => (
              <div key={name} className="rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <p style={{ ...style, fontSize: '2.5rem', color: 'var(--color-text-primary)', lineHeight: 1.1 }}>
                  Aa
                </p>
                <p className="mt-4 text-xs font-semibold tracking-widest uppercase" style={{ ...mono, color: 'var(--color-text-tertiary)' }}>
                  {role}
                </p>
                <p className="mt-1 text-lg font-bold" style={{ ...style, color: 'var(--color-text-primary)' }}>
                  {name}
                </p>
                <p className="mt-2 text-sm" style={{ ...roboto, color: 'var(--color-text-secondary)' }}>
                  {use}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Type scale */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ ...mono, color: 'var(--color-text-tertiary)' }}>Type Scale</p>
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {typeScale.map(({ label, size, weight, lh, font, sample }) => (
              <div key={label} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-6">
                <div className="flex-1">
                  <p style={{ ...font, fontSize: size, fontWeight: weight, lineHeight: lh, color: 'var(--color-text-primary)' }}>
                    {sample}
                  </p>
                </div>
                <div className="shrink-0 text-right" style={{ minWidth: '200px' }}>
                  <p className="text-xs" style={{ ...mono, color: 'var(--color-text-tertiary)' }}>
                    {size} / {weight} / {lh}lh
                  </p>
                  <p className="text-xs mt-0.5" style={{ ...mono, color: 'var(--color-text-tertiary)' }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
