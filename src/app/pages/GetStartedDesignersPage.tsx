import { Link } from 'react-router';
import { FoundationShell } from '../components/FoundationShell';

const tocItems = [
  { id: 'gs-design-overview',  label: 'Overview',         level: 1 as const },
  { id: 'gs-design-figma',     label: 'Figma Libraries',  level: 1 as const },
  { id: 'gs-design-tokens',    label: 'Design Tokens',    level: 1 as const },
  { id: 'gs-design-brand',     label: 'Brand Guidelines', level: 1 as const },
];

export function GetStartedDesignersPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="For Designers"
      description="Everything you need to design with LayerProof — Figma libraries, design tokens, and brand guidelines."
      tocItems={tocItems}
    >
      <section id="gs-design-overview" className="mb-12">
        <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Use this guide to set up your Figma environment, connect design tokens, and align with the LayerProof visual identity before you start building.
        </p>
      </section>

      <section id="gs-design-figma" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Figma Libraries
        </h2>
        <div className="rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Access the LayerProof Figma component library to use pre-built components and design tokens directly in your designs.
          </p>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {['UI Component Library', 'Icon Set', 'Design Token Variables', 'Brand Asset Kit'].map(item => (
              <li key={item} className="flex items-center gap-3">
                <span style={{ color: '#f0d040' }}>→</span>
                <span>{item}</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)' }}>Coming soon</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="gs-design-tokens" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Design Tokens
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Design tokens are the single source of truth for all visual decisions. Start with the foundations.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Color',      path: '/foundations/color' },
            { label: 'Typography', path: '/foundations/typography' },
            { label: 'Spacing',    path: '/foundations/spacing' },
            { label: 'Grid',       path: '/foundations/grid' },
          ].map(({ label, path }) => (
            <Link key={label} to={path}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-opacity hover:opacity-75"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', textDecoration: 'none' }}>
              {label}
              <span style={{ color: '#f0d040' }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="gs-design-brand" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Brand Guidelines
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Understand the LayerProof visual identity before you start designing.
        </p>
        <Link to="/foundations/logos"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: '#ffffff', color: '#000000', textDecoration: 'none', fontFamily: '"Roboto", sans-serif' }}>
          View Logo Guidelines →
        </Link>
      </section>
    </FoundationShell>
  );
}
