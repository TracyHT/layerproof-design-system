import { Button } from '../../components/ui/button';
import { FoundationShell } from '../../components/FoundationShell';
import { ExternalLink } from 'lucide-react';

const tocItems = [
  { id: 'overview',   label: 'Overview',    level: 1 as const },
  { id: 'examples',   label: 'Examples',    level: 1 as const },
  { id: 'guidelines', label: 'Guidelines',  level: 1 as const },
];

const Code = ({ children }: { children: string }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
    <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>tsx</div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

export function ButtonLinkPage() {
  return (
    <FoundationShell
      tag="Components"
      title="Link Button"
      description="A button that appears as an underlined text link. Used for inline navigation or secondary actions within body copy."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          The link variant uses <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>variant="link"</code> and renders with no background or border — only an underline on hover. Combine with <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>asChild</code> to render as a real <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>{`<a>`}</code> or router Link.
        </p>
        <Code>{`<Button variant="link">Learn more</Button>
<Button variant="link" asChild>
  <a href="/docs" target="_blank">Read the docs</a>
</Button>`}</Code>
      </section>

      <section id="examples" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Examples</h2>
        <div className="space-y-4 mb-6">
          <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Default</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="link">Learn more</Button>
              <Button variant="link">View all</Button>
              <Button variant="link">Read the docs</Button>
            </div>
          </div>
          <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>With icon</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="link" className="gap-1.5">Open in new tab <ExternalLink size={13} /></Button>
            </div>
          </div>
          <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>In context with body text</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              By continuing, you agree to our{' '}
              <Button variant="link" className="h-auto p-0 text-sm">Terms of Service</Button>
              {' '}and{' '}
              <Button variant="link" className="h-auto p-0 text-sm">Privacy Policy</Button>.
            </p>
          </div>
          <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Disabled</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="link" disabled>Unavailable link</Button>
            </div>
          </div>
        </div>
        <Code>{`{/* Basic */}
<Button variant="link">Learn more</Button>

{/* With icon */}
<Button variant="link" className="gap-1.5">
  Open in new tab <ExternalLink size={13} />
</Button>

{/* Inline in text */}
<Button variant="link" className="h-auto p-0 text-sm">
  Terms of Service
</Button>`}</Code>
      </section>

      <section id="guidelines" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Guidelines</h2>
        <div className="space-y-3">
          {[
            { rule: 'Use for low-priority or supplemental actions', desc: 'Link buttons draw less attention than filled or outlined variants. Use them for secondary paths, not primary CTAs.' },
            { rule: 'Distinguish from navigation links', desc: 'If the action navigates to a new page or resource, use asChild with a real <a> element for correct semantics.' },
            { rule: 'Avoid overloading a page with link buttons', desc: 'Too many link-style actions create visual noise. Prefer grouped outline buttons when offering multiple low-priority choices.' },
          ].map(({ rule, desc }) => (
            <div key={rule} className="flex gap-4 rounded-xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <span className="text-sm font-semibold shrink-0 mt-0.5" style={{ color: 'var(--brand-primary)' }}>→</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{rule}</p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FoundationShell>
  );
}
