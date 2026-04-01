import { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, List, Grid } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ComponentShell } from '../../components/ComponentShell';

const Code = ({ children }: { children: string }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
    <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>tsx</div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

function SegmentedControl({ options }: { options: string[] }) {
  const [active, setActive] = useState(options[0]);
  return (
    <div className="inline-flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => setActive(opt)}
          className="px-4 py-2 text-sm font-medium transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            background: active === opt ? 'var(--color-text-primary)' : 'var(--color-surface)',
            color: active === opt ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
            borderRight: i < options.length - 1 ? '1px solid var(--color-border)' : undefined,
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function ToggleGroup({ items }: { items: { icon: React.ElementType; label: string }[] }) {
  const [active, setActive] = useState<Set<string>>(new Set());
  const toggle = (label: string) => setActive(prev => {
    const next = new Set(prev);
    next.has(label) ? next.delete(label) : next.add(label);
    return next;
  });
  return (
    <div className="inline-flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      {items.map(({ icon: Icon, label }, i) => (
        <button
          key={label}
          onClick={() => toggle(label)}
          aria-label={label}
          aria-pressed={active.has(label)}
          className="p-2.5 transition-colors"
          style={{
            background: active.has(label) ? 'var(--color-surface-hover)' : 'var(--color-surface)',
            color: active.has(label) ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            borderRight: i < items.length - 1 ? '1px solid var(--color-border)' : undefined,
          }}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  );
}

export function ButtonGroupPage() {
  return (
    <ComponentShell
      title="Button Group"
      description="A set of related buttons arranged as a cohesive unit. Used for segmented controls, toolbars, and mutually-exclusive or toggleable choices."
      tabs={['Examples', 'Code', 'Usage']}
    >
      {(activeTab: string) => {
        if (activeTab === 'Code') return (
          <section className="mb-16">
            <Code>{`import { Button } from '@/components/ui/button';

{/* Segmented control */}
<div className="inline-flex rounded-lg overflow-hidden border border-[var(--color-border)]">
  <button className="...">Day</button>
  <button className="...">Week</button>
  <button className="...">Month</button>
</div>

{/* Outline action group */}
<div className="inline-flex">
  <Button variant="outline" className="rounded-r-none border-r-0">Edit</Button>
  <Button variant="outline" className="rounded-none border-r-0">Duplicate</Button>
  <Button variant="outline" className="rounded-l-none">Delete</Button>
</div>

{/* Neutral filter group */}
<div className="inline-flex">
  <Button variant="neutral" className="rounded-r-none border-r-0">All</Button>
  <Button variant="neutral" className="rounded-none border-r-0">Active</Button>
  <Button variant="neutral" className="rounded-l-none">Archived</Button>
</div>`}</Code>
          </section>
        );

        if (activeTab === 'Usage') return (
          <section className="mb-16">
            <div className="space-y-3">
              {[
                { rule: 'Keep groups to 2–5 items', desc: 'More than 5 options in a button group becomes unwieldy. Consider a select dropdown for longer lists.' },
                { rule: 'All items must be the same size', desc: 'Mixing sizes within a group creates visual misalignment. Use consistent size= and padding values.' },
                { rule: 'Use aria-pressed for toggle groups', desc: 'Multi-select toolbar items should have aria-pressed="true/false" so assistive technology can announce state.' },
                { rule: 'Segment vs. radio — choose by action type', desc: 'Segmented controls switch a view or setting. Radios choose from options. Use the right semantic pattern.' },
                { rule: 'Use neutral for toolbar and filter groups', desc: 'The neutral variant (gray fill) is the natural choice for grouped controls in toolbars and filter bars.' },
                { rule: 'Never use accent inside a group', desc: 'The accent variant (yellow) is reserved for a single page-level CTA. Using it inside a button group competes visually and breaks the hierarchy.' },
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
                Button groups are composed of multiple Button components sharing a border. Remove individual radii and use a wrapper with a single outer radius. Two common patterns: <strong style={{ color: 'var(--color-text-primary)' }}>segmented controls</strong> (single-select) and <strong style={{ color: 'var(--color-text-primary)' }}>toggle toolbars</strong> (multi-select).
              </p>
            </section>

            <section className="mb-16">
              <div className="space-y-4">
                <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Segmented control — single select</p>
                  <div className="flex flex-wrap gap-4">
                    <SegmentedControl options={['Day', 'Week', 'Month']} />
                    <SegmentedControl options={['List', 'Grid', 'Card']} />
                  </div>
                </div>
                <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Text alignment — single select (icon)</p>
                  <ToggleGroup items={[
                    { icon: AlignLeft,   label: 'Align left' },
                    { icon: AlignCenter, label: 'Align center' },
                    { icon: AlignRight,  label: 'Align right' },
                  ]} />
                </div>
                <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Formatting toolbar — multi select</p>
                  <div className="flex gap-2">
                    <ToggleGroup items={[
                      { icon: Bold,      label: 'Bold' },
                      { icon: Italic,    label: 'Italic' },
                      { icon: Underline, label: 'Underline' },
                    ]} />
                    <ToggleGroup items={[
                      { icon: List, label: 'List' },
                      { icon: Grid, label: 'Grid' },
                    ]} />
                  </div>
                </div>
                <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Action group — outline variant</p>
                  <div className="inline-flex">
                    <Button variant="outline" className="rounded-r-none border-r-0">Edit</Button>
                    <Button variant="outline" className="rounded-none border-r-0">Duplicate</Button>
                    <Button variant="outline" className="rounded-l-none">Delete</Button>
                  </div>
                </div>
                <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Action group — neutral variant (toolbar / filter bar)</p>
                  <div className="inline-flex">
                    <Button variant="neutral" className="rounded-r-none border-r-0">All</Button>
                    <Button variant="neutral" className="rounded-none border-r-0">Active</Button>
                    <Button variant="neutral" className="rounded-l-none">Archived</Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      }}
    </ComponentShell>
  );
}
