import { useState, useMemo } from 'react';
import { FoundationShell } from '../../components/FoundationShell';
import { sections, tokenChangelog } from '../../data/tokens';
import type { Token, ChangeType } from '../../data/tokens';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Resolve a token's display value.
 * For simple CSS custom properties (e.g. --color-text-primary), reads the live
 * computed value from the document so the docs page stays in sync with
 * brand-variables.css without needing to update tokens.ts.
 * Falls back to token.value for compound/descriptive tokens.
 */
function liveValue(token: Token): string {
  if (typeof document !== 'undefined' && /^--[\w-]+$/.test(token.name)) {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(token.name)
      .trim();
    if (resolved) return resolved;
  }
  return token.value;
}

function isColor(value: string) {
  return /^#[0-9a-f]{3,8}$/i.test(value) || value.startsWith('rgba') || value.startsWith('rgb');
}

function tokenMatches(token: Token, query: string): boolean {
  const q = query.toLowerCase();
  return (
    token.name.toLowerCase().includes(q) ||
    liveValue(token).toLowerCase().includes(q) ||
    token.description.toLowerCase().includes(q)
  );
}

function filterSections(query: string) {
  if (!query.trim()) return sections;
  return sections
    .map((s) => ({
      ...s,
      tokens: s.tokens?.filter((t) => tokenMatches(t, query)),
      subsections: s.subsections
        ?.map((sub) => ({ ...sub, tokens: sub.tokens.filter((t) => tokenMatches(t, query)) }))
        .filter((sub) => sub.tokens.length > 0),
    }))
    .filter((s) => (s.tokens?.length ?? 0) > 0 || (s.subsections?.length ?? 0) > 0);
}

function buildTocItems() {
  const items: { id: string; label: string; level: 1 | 2 }[] = [];
  for (const s of sections) {
    items.push({ id: s.id, label: s.label, level: 1 });
    if (s.subsections) {
      for (const sub of s.subsections) items.push({ id: sub.id, label: sub.label, level: 2 });
    }
  }
  return items;
}

// ─── Token row ────────────────────────────────────────────────────────────────

function TokenRow({ token, isLast, hasPreview }: { token: Token; isLast: boolean; hasPreview: boolean }) {
  const resolved = liveValue(token);
  const showSwatch = isColor(resolved);
  const showDarkSwatch = token.dark && isColor(token.dark);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: hasPreview ? '1fr 1fr' : '1fr auto',
        gap: '1.5rem',
        alignItems: 'start',
        padding: '1.25rem 0',
        borderBottom: isLast ? 'none' : '1px solid var(--color-border)',
      }}
    >
      {/* Left: name + description + cssNote + introduced */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-primary)',
              background: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              padding: '0.2rem 0.625rem',
              borderRadius: '0.375rem',
            }}
          >
            {token.name}
          </code>
          {token.deprecated && (
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.6875rem', color: '#a3a3a3', background: '#6b6b6b22', padding: '0.15rem 0.5rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Deprecated
            </span>
          )}
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)', margin: '0 0 0.5rem', lineHeight: 1.5 }}>
          {token.description}
        </p>

        {token.cssNote && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', margin: '0 0 0.375rem' }}>
            {token.cssNote}
          </p>
        )}

        {token.replacedBy && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', margin: '0 0 0.375rem' }}>
            Use <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontSize: '0.8125rem' }}>{token.replacedBy}</code> instead.
          </p>
        )}

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', margin: 0 }}>
          Introduced v{token.introduced}
        </p>
      </div>

      {/* Right: live preview OR value swatch */}
      {hasPreview && token.preview ? (
        <div style={{ paddingTop: '0.25rem' }}>
          <span style={token.previewStyle}>{token.preview}</span>
        </div>
      ) : (
        <div className="flex flex-col items-end gap-1.5" style={{ minWidth: 80 }}>
          {/* Color / shadow preview box */}
          <div
            style={{
              width: 64,
              height: 32,
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              background: showSwatch ? resolved : 'var(--color-surface)',
              flexShrink: 0,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {token.name.startsWith('--shadow') && !token.name.includes('color') && (
              <div style={{ position: 'absolute', inset: 6, borderRadius: 4, background: 'var(--color-surface)', boxShadow: `var(${token.name})` }} />
            )}
            {showSwatch && showDarkSwatch && (
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: token.dark }} />
            )}
          </div>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textAlign: 'right' }}>
            {resolved.length > 20 ? resolved.slice(0, 20) + '…' : resolved}
          </code>
          {token.dark && (
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textAlign: 'right' }}>
              {token.dark} · dark
            </code>
          )}
        </div>
      )}
    </div>
  );
}

function TokenGroup({ tokens }: { tokens: Token[] }) {
  const hasPreview = tokens.some((t) => !!t.preview);
  return (
    <div>
      {/* Column header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: hasPreview ? '1fr 1fr' : '1fr auto',
          gap: '1.5rem',
          padding: '0.5rem 0',
          borderBottom: '2px solid var(--color-border)',
          marginBottom: '0.25rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Token and description
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {hasPreview ? 'Preview' : 'Value'}
        </span>
      </div>
      {tokens.map((t, i) => (
        <TokenRow key={t.name + i} token={t} isLast={i === tokens.length - 1} hasPreview={hasPreview} />
      ))}
    </div>
  );
}

// ─── Tab: All tokens ──────────────────────────────────────────────────────────

function AllTokensTab() {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => filterSections(query), [query]);

  const H2: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.375rem',
    textTransform: 'uppercase',
    color: 'var(--color-text-primary)',
    marginBottom: '1.25rem',
    marginTop: 0,
  };

  const H3: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    textTransform: 'uppercase',
    color: 'var(--color-text-primary)',
    marginBottom: '0.75rem',
    marginTop: 0,
  };

  return (
    <>
      {/* Search */}
      <div className="relative mb-8">
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)', pointerEvents: 'none' }}
        >
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search for tokens…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            paddingLeft: '2.5rem',
            paddingRight: query ? '2.5rem' : '1rem',
            paddingTop: '0.625rem',
            paddingBottom: '0.625rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--color-text-primary)',
            outline: 'none',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', fontSize: 18, lineHeight: 1, padding: 2 }}
          >
            ×
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl px-6 py-12 text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-tertiary)', fontSize: '0.9375rem' }}>
            No tokens match <strong style={{ color: 'var(--color-text-primary)' }}>"{query}"</strong>
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {visible.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 style={H2}>{section.label}</h2>

              {section.tokens && <TokenGroup tokens={section.tokens} />}

              {section.subsections && (
                <div className="space-y-10">
                  {section.subsections.map((sub) => (
                    <div key={sub.id} id={sub.id}>
                      <h3 style={H3}>{sub.label}</h3>
                      <TokenGroup tokens={sub.tokens} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

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
      title="All Design Tokens"
      description="Design tokens are the single source of truth for all visual decisions in LayerProof. Defined as CSS custom properties in brand-variables.css."
      tocItems={tab === 'tokens' ? buildTocItems() : []}
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

      {tab === 'tokens'    && <AllTokensTab />}
      {tab === 'code'      && <CodeTab />}
      {tab === 'changelog' && <ChangelogTab />}
    </FoundationShell>
  );
}
