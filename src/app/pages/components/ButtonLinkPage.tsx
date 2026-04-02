import { ArrowRight, ArrowLeft, Download, ExternalLink, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ComponentShell } from '../../components/ComponentShell';

const Demo = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
    <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>{label}</p>
    <div className="flex flex-wrap gap-4 items-center">{children}</div>
  </div>
);

const Code = ({ children }: { children: string }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
    <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>tsx</div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

export function ButtonLinkPage() {
  return (
    <ComponentShell
      title="Link Button"
      description="A button that appears as underlined text. Used for inline navigation, supplemental actions, and directional cues — optionally paired with a leading or trailing icon."
      tabs={['Examples', 'Code', 'Usage']}
    >
      {(activeTab: string) => {
        if (activeTab === 'Code') return (
          <section className="mb-16">
            <Code>{`import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ExternalLink, Download } from 'lucide-react';

{/* Default */}
<Button variant="link">Learn more</Button>

{/* Trailing icon — forward navigation or action */}
<Button variant="link" className="gap-1.5">
  Continue <ArrowRight size={14} />
</Button>
<Button variant="link" className="gap-1.5">
  Download file <Download size={14} />
</Button>
<Button variant="link" className="gap-1.5">
  Open in new tab <ExternalLink size={13} />
</Button>

{/* Leading icon — back or additive */}
<Button variant="link" className="gap-1.5">
  <ArrowLeft size={14} /> Go back
</Button>

{/* Inline in body text */}
<Button variant="link" className="h-auto p-0 text-sm">
  Terms of Service
</Button>

{/* As a real anchor */}
<Button variant="link" asChild>
  <a href="/docs" target="_blank">Read the docs</a>
</Button>`}</Code>
          </section>
        );

        if (activeTab === 'Usage') return (
          <section className="mb-16">
            <div className="space-y-3">
              {[
                { rule: 'Use for low-priority or supplemental actions', desc: 'Link buttons draw less attention than filled or outlined variants. Use them for secondary paths, not primary CTAs.' },
                { rule: 'Distinguish from navigation links', desc: 'If the action navigates to a new page or resource, use asChild with a real <a> element for correct semantics.' },
                { rule: 'Use trailing icons for forward actions', desc: 'Arrows pointing right (→), download, and external-link icons should trail the label — they indicate what happens after clicking.' },
                { rule: 'Use leading icons for back or additive actions', desc: 'Back arrows and plus icons naturally lead the label. Mixing positions in the same UI creates visual inconsistency.' },
                { rule: 'Match icon size to button size', desc: 'Use size={12} with size="sm", size={14} with default, size={16} with size="lg" for balanced proportions.' },
                { rule: 'One icon per button', desc: 'Do not use both a leading and trailing icon on the same button. If you need both, reconsider the interaction.' },
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
        );

        return (
          <>
            <section className="mb-16">
              <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                The link variant sits at the bottom of the button hierarchy. It uses <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>variant="link"</code> and renders with no background or border — only an underline on hover. Pair with a leading or trailing icon to reinforce the direction or outcome of the action.
              </p>
            </section>

            <section className="mb-16">
              <div className="space-y-4">
                <Demo label="Default">
                  <Button variant="link">Learn more</Button>
                  <Button variant="link">View all</Button>
                  <Button variant="link">Read the docs</Button>
                </Demo>

                <Demo label="Trailing icon — direction or action">
                  <Button variant="link" className="gap-1.5">Continue <ArrowRight size={14} /></Button>
                  <Button variant="link" className="gap-1.5">Download file <Download size={14} /></Button>
                  <Button variant="link" className="gap-1.5">Open in new tab <ExternalLink size={13} /></Button>
                </Demo>

                <Demo label="Leading icon — back or additive">
                  <Button variant="link" className="gap-1.5"><ArrowLeft size={14} /> Go back</Button>
                  <Button variant="link" className="gap-1.5"><Plus size={14} /> Add item</Button>
                </Demo>

                <Demo label="In context with body text">
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    By continuing, you agree to our{' '}
                    <Button variant="link" className="h-auto p-0 text-sm">Terms of Service</Button>
                    {' '}and{' '}
                    <Button variant="link" className="h-auto p-0 text-sm">Privacy Policy</Button>.
                  </p>
                </Demo>

                <Demo label="Disabled">
                  <Button variant="link" disabled>Unavailable link</Button>
                </Demo>
              </div>
            </section>
          </>
        );
      }}
    </ComponentShell>
  );
}
