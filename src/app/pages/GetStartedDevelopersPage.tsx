import { Link } from 'react-router';
import { FoundationShell } from '../components/FoundationShell';

const tocItems = [
  { id: 'gs-dev-overview',   label: 'Overview',     level: 1 as const },
  { id: 'gs-dev-setup',      label: 'Setup',        level: 1 as const },
  { id: 'gs-dev-tokens',     label: 'Using Tokens', level: 1 as const },
  { id: 'gs-dev-components', label: 'Components',   level: 1 as const },
];

export function GetStartedDevelopersPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="For Developers"
      description="Environment setup, CSS token integration, and component usage guides for building with LayerProof."
      tocItems={tocItems}
    >
      <section id="gs-dev-overview" className="mb-12">
        <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Follow this guide to wire up your local dev environment, import the token stylesheet, and start using components.
        </p>
      </section>

      <section id="gs-dev-setup" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Setup
        </h2>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          <div className="px-4 py-2 text-xs font-mono flex items-center gap-2" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>
            <span>terminal</span>
          </div>
          <div className="p-4" style={{ background: 'var(--color-surface)' }}>
            <pre className="text-sm font-mono" style={{ color: '#f0d040' }}>npm run dev</pre>
            <pre className="text-sm font-mono mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              {'# Import the token stylesheet\n@import \'./styles/brand-variables.css\';'}
            </pre>
          </div>
        </div>
      </section>

      <section id="gs-dev-tokens" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Using Tokens
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          All design tokens are CSS custom properties. Reference them directly in any stylesheet or inline style.
        </p>
        <div className="rounded-xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <pre className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>
{`.heading {
  font-family: var(--font-heading);
  color: var(--color-text-primary);
}

.accent { color: var(--brand-primary); }   /* #f0d040 */
.cta    { color: var(--brand-secondary); } /* #e8336c */`}
          </pre>
        </div>
      </section>

      <section id="gs-dev-components" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Components
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          UI components are built with React, TypeScript, Radix UI primitives, and Tailwind CSS.
        </p>
        <Link to="/components"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: '#ffffff', color: '#000000', textDecoration: 'none', fontFamily: '"Roboto", sans-serif' }}>
          Browse Components →
        </Link>
      </section>
    </FoundationShell>
  );
}
