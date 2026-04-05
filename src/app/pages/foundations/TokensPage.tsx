import { useState } from 'react';
import { FoundationShell } from '../../components/FoundationShell';
import { sections, tokenChangelog } from '../../data/tokens';
import type { ChangeType } from '../../data/tokens';
import { AllTokensTab, buildTocItems } from '../../components/TokenTable';

// ─── Tab: Code ────────────────────────────────────────────────────────────────

const codeExamples = [
  {
    title: 'CSS — using a token',
    code: `.my-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}`,
  },
  {
    title: 'CSS — typography',
    code: `.heading {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  text-transform: uppercase;
  color: var(--color-text-primary);
}

.body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
}`,
  },
  {
    title: 'React — inline styles',
    code: `<div style={{
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-xl)',
}}>
  <h2 style={{
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-text-primary)',
    textTransform: 'uppercase',
  }}>
    Card Title
  </h2>
</div>`,
  },
  {
    title: 'Dark mode — automatic via data-theme',
    code: `/* No extra code needed — tokens switch automatically.
   Set data-theme="dark" on <html> to activate dark mode. */

html { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }

/* Example: --color-background resolves to:
   Light → #f5f5f5
   Dark  → #000000  */`,
  },
];

function CodeTab() {
  return (
    <div className="space-y-8">
      {codeExamples.map(({ title, code }) => (
        <div key={title}>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            {title}
          </p>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <div className="px-4 py-2" style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>CSS / TSX</span>
            </div>
            <pre style={{ margin: 0, padding: '1rem 1.25rem', background: 'var(--color-surface)', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Changelog ───────────────────────────────────────────────────────────

const changeTypeStyle: Record<ChangeType, React.CSSProperties> = {
  added:      { background: '#10b98122', color: '#10b981' },
  changed:    { background: '#f59e0b22', color: '#f59e0b' },
  deprecated: { background: '#6b6b6b22', color: '#a3a3a3' },
  removed:    { background: '#ef444422', color: '#ef4444' },
};

function ChangelogTab() {
  return (
    <div className="space-y-10">
      {tokenChangelog.map((entry) => (
        <div key={entry.version}>
          <div className="flex items-baseline gap-3 mb-4">
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>
              v{entry.version}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
              {entry.date}
            </span>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            {entry.changes.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-4 py-3"
                style={{
                  background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-background)',
                  borderBottom: i < entry.changes.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <span style={{ ...changeTypeStyle[c.type], fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.2rem 0.5rem', borderRadius: '9999px', flexShrink: 0, marginTop: 2 }}>
                  {c.type}
                </span>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--brand-primary)', flexShrink: 0 }}>
                  {c.token}
                </code>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  {c.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = 'tokens' | 'code' | 'changelog';

export function TokensPage() {
  const [tab, setTab] = useState<Tab>('tokens');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'tokens',    label: 'All tokens' },
    { id: 'code',      label: 'Code' },
    { id: 'changelog', label: 'Changelog' },
  ];

  return (
    <FoundationShell
      title="Semantic Tokens"
      description="Design tokens are the single source of truth for all visual decisions in LayerProof. Defined as CSS custom properties in brand-variables.css."
      tocItems={tab === 'tokens' ? buildTocItems(sections) : []}
    >
      {/* Tab bar */}
      <div className="flex gap-1 mb-8" style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '2rem' }}>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: tab === id ? 600 : 400,
              fontSize: '0.9375rem',
              color: tab === id ? 'var(--brand-primary)' : 'var(--color-text-tertiary)',
              padding: '0.5rem 0',
              marginRight: '1.5rem',
              borderBottom: tab === id ? '2px solid var(--brand-primary)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'color 150ms, border-color 150ms',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'tokens'    && <AllTokensTab sects={sections} />}
      {tab === 'code'      && <CodeTab />}
      {tab === 'changelog' && <ChangelogTab />}
    </FoundationShell>
  );
}
