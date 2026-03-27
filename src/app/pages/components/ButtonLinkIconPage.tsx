import { ArrowRight, ArrowLeft, Download, ExternalLink, Plus, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { FoundationShell } from '../../components/FoundationShell';

const tocItems = [
  { id: 'overview',   label: 'Overview',    level: 1 as const },
  { id: 'examples',   label: 'Examples',    level: 1 as const },
  { id: 'guidelines', label: 'Guidelines',  level: 1 as const },
];

const Demo = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
    <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>{label}</p>
    <div className="flex flex-wrap gap-3 items-center">{children}</div>
  </div>
);

const Code = ({ children }: { children: string }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
    <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>tsx</div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

export function ButtonLinkIconPage() {
  return (
    <FoundationShell
      tag="Components"
      title="Link Icon Button"
      description="A link-style button that pairs an icon with a text label. Provides clear affordance for directional or external actions."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Combine <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>variant="link"</code> with a leading or trailing icon to give users a directional cue. The icon should reinforce the action — arrows for navigation, external-link for new tabs, download for file actions.
        </p>
        <Code>{`{/* Trailing icon — forward navigation */}
<Button variant="link" className="gap-1.5">
  Continue <ArrowRight size={14} />
</Button>

{/* Leading icon — back navigation */}
<Button variant="link" className="gap-1.5">
  <ArrowLeft size={14} /> Go back
</Button>`}</Code>
      </section>

      <section id="examples" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Examples</h2>
        <div className="space-y-4 mb-6">
          <Demo label="Trailing icon — direction / action">
            <Button variant="link" className="gap-1.5">Continue <ArrowRight size={14} /></Button>
            <Button variant="link" className="gap-1.5">Download file <Download size={14} /></Button>
            <Button variant="link" className="gap-1.5">Open in new tab <ExternalLink size={13} /></Button>
          </Demo>
          <Demo label="Leading icon">
            <Button variant="link" className="gap-1.5"><ArrowLeft size={14} /> Go back</Button>
            <Button variant="link" className="gap-1.5"><Plus size={14} /> Add item</Button>
          </Demo>
          <Demo label="With other button variants">
            <Button className="gap-2">Get started <ArrowRight size={14} /></Button>
            <Button variant="outline" className="gap-2">Download <Download size={14} /></Button>
            <Button variant="secondary" className="gap-2">Explore <ChevronRight size={14} /></Button>
          </Demo>
          <Demo label="Sizes">
            <Button size="sm" variant="outline" className="gap-1.5">Small <ArrowRight size={12} /></Button>
            <Button variant="outline" className="gap-2">Default <ArrowRight size={14} /></Button>
            <Button size="lg" variant="outline" className="gap-2">Large <ArrowRight size={16} /></Button>
          </Demo>
        </div>
        <Code>{`{/* Trailing */}
<Button variant="link" className="gap-1.5">
  Continue <ArrowRight size={14} />
</Button>

{/* Leading */}
<Button variant="link" className="gap-1.5">
  <ArrowLeft size={14} /> Go back
</Button>

{/* Filled with icon */}
<Button className="gap-2">
  Get started <ArrowRight size={14} />
</Button>`}</Code>
      </section>

      <section id="guidelines" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Guidelines</h2>
        <div className="space-y-3">
          {[
            { rule: 'Use trailing icons for forward actions', desc: 'Arrows pointing right (→), download, external-link icons should trail the label. They indicate what happens after clicking.' },
            { rule: 'Use leading icons for back or additive actions', desc: 'Back arrows and plus icons naturally lead the label. Mixing positions in one UI creates visual inconsistency.' },
            { rule: 'Match icon weight to button size', desc: 'Use size={12} icons with size="sm", size={16} with default, size={18} with size="lg" for balanced proportions.' },
            { rule: 'One icon per button', desc: 'Do not use both a leading and trailing icon on the same button. If you need both, reconsider the interaction design.' },
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
