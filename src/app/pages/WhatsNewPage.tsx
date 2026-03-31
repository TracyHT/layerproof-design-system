import { releases, type ChangeCategory } from '../data/changelog';

const categoryMeta: Record<ChangeCategory, { label: string; color: string; bg: string }> = {
  tokens:      { label: 'Token',       color: '#f0d040', bg: 'rgba(240,208,64,0.12)' },
  components:  { label: 'Component',   color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  foundations: { label: 'Foundation',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
  docs:        { label: 'Docs',        color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  breaking:    { label: 'Breaking',    color: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
  fix:         { label: 'Fix',         color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
};

function CategoryBadge({ category }: { category: ChangeCategory }) {
  const { label, color, bg } = categoryMeta[category];
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        padding: '2px 8px',
        borderRadius: 9999,
        color,
        background: bg,
        border: `1px solid ${color}30`,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

export function WhatsNewPage() {
  return (
    <div
      className="max-w-3xl mx-auto px-6 py-14"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {/* Header */}
      <div className="mb-14">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}
        >
          LayerProof Design System
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            textTransform: 'uppercase',
            color: 'var(--color-text-primary)',
            lineHeight: 1.05,
          }}
        >
          What's New
        </h1>
        <p
          className="mt-3 text-base"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
        >
          A version-by-version log of everything that's changed in the design system —
          tokens, components, foundations, and docs.
        </p>
      </div>

      {/* Release list */}
      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-[7px] top-0 bottom-0 w-px"
          style={{ background: 'var(--color-border)' }}
        />

        <div className="space-y-14">
          {releases.map((release, i) => (
            <div key={release.version} className="relative pl-8">
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-1 rounded-full"
                style={{
                  width: 15,
                  height: 15,
                  background: i === 0 ? 'var(--brand-accent)' : 'var(--color-border)',
                  border: '2px solid var(--color-background)',
                  boxSizing: 'border-box',
                }}
              />

              {/* Version header */}
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                  }}
                >
                  v{release.version}
                </span>
                {i === 0 && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: 9999,
                      background: 'var(--brand-accent)',
                      color: '#000000',
                    }}
                  >
                    Latest
                  </span>
                )}
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}
                >
                  {release.date}
                </span>
              </div>

              {/* Summary */}
              <p
                className="text-sm mb-5"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
              >
                {release.summary}
              </p>

              {/* Changes */}
              <div
                className="rounded-xl overflow-hidden divide-y"
                style={{ border: '1px solid var(--color-border)' }}
              >
                {release.changes.map((change, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-3 px-4 py-3"
                    style={{ background: 'var(--color-surface)' }}
                  >
                    <div className="pt-0.5 shrink-0">
                      <CategoryBadge category={change.category} />
                    </div>
                    <p
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                    >
                      {change.description}
                    </p>
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
