import { Link } from 'react-router';
import { FoundationShell } from '../components/FoundationShell';

const tocItems = [
  { id: 'gs-brand-overview', label: 'Overview',     level: 1 as const },
  { id: 'gs-brand-voice',    label: 'Voice & Tone', level: 1 as const },
  { id: 'gs-brand-logo',     label: 'Logo Usage',   level: 1 as const },
  { id: 'gs-brand-assets',   label: 'Brand Assets', level: 1 as const },
];

export function GetStartedBrandPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="For Brand Teams"
      description="Content standards, voice and tone guidelines, logo rules, and brand asset access."
      tocItems={tocItems}
    >
      <section id="gs-brand-overview" className="mb-12">
        <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Use this guide to align on how LayerProof communicates, how the logo is used, and where to find approved brand assets.
        </p>
      </section>

      <section id="gs-brand-voice" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Voice & Tone
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          LayerProof communicates with confidence, clarity, and precision. Every word should feel intentional.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { trait: 'Bold',   desc: 'Lead with conviction. Avoid hedging language.' },
            { trait: 'Clear',  desc: 'Short sentences. No jargon without context.' },
            { trait: 'Direct', desc: 'Tell people what to do. Use active voice.' },
          ].map(({ trait, desc }) => (
            <div key={trait} className="flex gap-4 rounded-xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <span className="text-sm font-bold shrink-0 w-16" style={{ color: '#f0d040', fontFamily: '"Anton", sans-serif', textTransform: 'uppercase' }}>{trait}</span>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gs-brand-logo" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Logo Usage
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Always use the approved LayerProof logo files. Never recreate, distort, or recolor the logo.
        </p>
        <Link to="/foundations/logos"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: '#ffffff', color: '#000000', textDecoration: 'none', fontFamily: '"Roboto", sans-serif' }}>
          View Logo Guidelines →
        </Link>
      </section>

      <section id="gs-brand-assets" className="mb-12">
        <h2 style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Brand Assets
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Download approved brand assets for use in presentations, marketing, and communications.
        </p>
        <Link to="/resources"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: '#ffffff', color: '#000000', textDecoration: 'none', fontFamily: '"Roboto", sans-serif' }}>
          Download Assets →
        </Link>
      </section>
    </FoundationShell>
  );
}
