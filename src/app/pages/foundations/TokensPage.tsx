import { useState } from 'react';
import { FoundationShell } from '../../components/FoundationShell';
import { sections, tokenChangelog } from '../../data/tokens';
import type { ChangeType } from '../../data/tokens';
import { AllTokensTab, buildTocItems } from '../../components/TokenTable';
import { CodeBlock, Tabs } from '../../components/docs';

// ─── Tab: Code ────────────────────────────────────────────────────────────────

const codeExamples = [
  {
    title: 'CSS — using a token',
    code: `.my-card {
  background: var(--background-surface-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-12);
  box-shadow: var(--shadow-neutral-3);
}`,
  },
  {
    title: 'CSS — typography',
    code: `/* Easiest: apply a whole Figma text style */
<h2 class="type-h3">…</h2>
<p class="type-body-sm">…</p>

/* Or compose from tokens */
.heading {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  line-height: var(--lh-h3);
  letter-spacing: var(--ls-h3);
  font-weight: var(--fw-bold);
  color: var(--foreground-primary);
}`,
  },
  {
    title: 'React — inline styles',
    code: `<div style={{
  background: 'var(--background-surface)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-xl)',
}}>
  <h2 style={{
    fontFamily: 'var(--font-heading)',
    color: 'var(--foreground-primary)',
    fontWeight: 700,
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

/* Example: --background-canvas resolves to:
   Light → #ffffff
   Dark  → #1a1a1a  */`,
  },
];

function CodeTab() {
  return (
    <div>
      {codeExamples.map(({ title, code }) => (
        <div key={title} className="lp-subsection" style={{ marginTop: 0, marginBottom: 32 }}>
          <h3 className="lp-subsection__title">{title}</h3>
          <CodeBlock lang={title.startsWith('React') ? 'TSX' : 'CSS'} code={code} />
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Changelog ───────────────────────────────────────────────────────────

const changeTypeStyle: Record<ChangeType, React.CSSProperties> = {
  added:      { background: 'var(--status-success-background)', color: 'var(--status-success-foreground)' },
  changed:    { background: 'var(--status-warning-background)', color: 'var(--status-warning-foreground)' },
  deprecated: { background: 'var(--background-muted)', color: 'var(--foreground-secondary)' },
  removed:    { background: 'var(--status-danger-background)', color: 'var(--status-danger-foreground)' },
};

function ChangelogTab() {
  return (
    <div className="space-y-10">
      {tokenChangelog.map((entry) => (
        <div key={entry.version}>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="lp-section__title">
              Version {entry.version}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--foreground-tertiary)' }}>
              {entry.date}
            </span>
          </div>
          <div className="lp-rows lp-rows--outline">
            {entry.changes.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-4 py-3"
                style={{
                  borderBottom: i < entry.changes.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <span className="lp-chip" style={{ ...changeTypeStyle[c.type], flexShrink: 0, textTransform: 'capitalize' }}>
                  {c.type}
                </span>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--foreground-primary)', flexShrink: 0 }}>
                  {c.token}
                </code>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--foreground-secondary)' }}>
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
const tabLabel = { tokens: 'All tokens', code: 'Code', changelog: 'Changelog' } as const;
const labelTab = { 'All tokens': 'tokens', Code: 'code', Changelog: 'changelog' } as const;

export function TokensPage() {
  const [tab, setTab] = useState<Tab>('tokens');


  return (
    <FoundationShell
      tag={["Foundations", "Tokens"]}
      title="Semantic tokens"
      description="Design tokens are the single source of truth for all visual decisions in LayerProof. Every colour has a light and a dark value, generated from the Figma UI kit into brand-variables.css."
      tocItems={tab === 'tokens' ? buildTocItems(sections) : []}
    >
      <Tabs tabs={['All tokens', 'Code', 'Changelog'] as const} active={tabLabel[tab]} onChange={(l) => setTab(labelTab[l])} label="Token views" />

      {tab === 'tokens'    && <AllTokensTab sects={sections} />}
      {tab === 'code'      && <CodeTab />}
      {tab === 'changelog' && <ChangelogTab />}
    </FoundationShell>
  );
}
