import { FoundationShell } from '../../components/FoundationShell';

const tokens = [
  { group: 'Color', vars: ['--brand-primary: #f0d040', '--brand-secondary: #e8336c', '--color-background: #000000', '--color-surface: #111111', '--color-border: #2a2a2a', '--color-text-primary: #ffffff', '--color-text-secondary: #a3a3a3'] },
  { group: 'Typography', vars: ['--font-heading: "Anton", Impact, sans-serif', '--font-body: "Roboto", sans-serif', '--text-xs: 0.75rem', '--text-base: 1rem', '--text-2xl: 1.5rem', '--text-5xl: 3rem'] },
  { group: 'Spacing', vars: ['--spacing-xs: 0.25rem (4px)', '--spacing-sm: 0.5rem (8px)', '--spacing-md: 1rem (16px)', '--spacing-lg: 1.5rem (24px)', '--spacing-xl: 2rem (32px)', '--spacing-2xl: 3rem (48px)'] },
  { group: 'Radius', vars: ['--radius-sm: 0.375rem', '--radius-md: 0.5rem', '--radius-lg: 0.75rem', '--radius-xl: 1rem', '--radius-full: 9999px'] },
];

export function TokensPage() {
  return (
    <FoundationShell
      title="All Design Tokens"
      description="Design tokens are the single source of truth for all visual decisions in LayerProof. Defined as CSS custom properties in brand-variables.css."
      tocItems={tokens.map(t => ({ id: `token-${t.group.toLowerCase()}`, label: t.group, level: 1 as const }))}
    >
      <div className="space-y-8">
        {tokens.map(({ group, vars }) => (
          <div key={group} id={`token-${group.toLowerCase()}`}>
            <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.25rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
              {group}
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              {vars.map((v, i) => (
                <div key={v} className="flex items-center px-4 py-2.5"
                  style={{ background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-background)', borderBottom: i < vars.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <code className="text-xs" style={{ fontFamily: '"Monaco", monospace', color: '#f0d040' }}>
                    {v.split(':')[0]}
                  </code>
                  <span className="ml-auto text-xs" style={{ fontFamily: '"Monaco", monospace', color: 'var(--color-text-tertiary)' }}>
                    {v.split(':').slice(1).join(':').trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FoundationShell>
  );
}
