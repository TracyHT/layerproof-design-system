import { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, List, Grid } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { FoundationShell } from '../../components/FoundationShell';

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

// Segmented control — single-select
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

// Toolbar — multi-select toggle
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
    <FoundationShell
      tag="Components"
      title="Button Group"
      description="A set of related buttons arranged as a cohesive unit. Used for segmented controls, toolbars, and mutually-exclusive or toggleable choices."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Button groups are composed of multiple Button components sharing a border. Remove individual radii and use a wrapper with a single outer radius. Two common patterns: <strong style={{ color: 'var(--color-text-primary)' }}>segmented controls</strong> (single-select) and <strong style={{ color: 'var(--color-text-primary)' }}>toggle toolbars</strong> (multi-select).
        </p>
        <Code>{`{/* Segmented control */}
<div className="inline-flex rounded-lg overflow-hidden border border-[var(--color-border)]">
  <button className="...">Day</button>
  <button className="...">Week</button>
  <button className="...">Month</button>
</div>`}</Code>
      </section>

      <section id="examples" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Examples</h2>
        <div className="space-y-4 mb-6">
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
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Action group — using Button component</p>
            <div className="inline-flex">
              <Button variant="outline" className="rounded-r-none border-r-0">Edit</Button>
              <Button variant="outline" className="rounded-none border-r-0">Duplicate</Button>
              <Button variant="outline" className="rounded-l-none">Delete</Button>
            </div>
          </div>
        </div>
        <Code>{`{/* Action group with Button */}
<div className="inline-flex">
  <Button variant="outline" className="rounded-r-none border-r-0">Edit</Button>
  <Button variant="outline" className="rounded-none border-r-0">Duplicate</Button>
  <Button variant="outline" className="rounded-l-none">Delete</Button>
</div>`}</Code>
      </section>

      <section id="guidelines" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Guidelines</h2>
        <div className="space-y-3">
          {[
            { rule: 'Keep groups to 2–5 items', desc: 'More than 5 options in a button group becomes unwieldy. Consider a select dropdown for longer lists.' },
            { rule: 'All items must be the same size', desc: 'Mixing sizes within a group creates visual misalignment. Use consistent size= and padding values.' },
            { rule: 'Use aria-pressed for toggle groups', desc: 'Multi-select toolbar items should have aria-pressed="true/false" so assistive technology can announce state.' },
            { rule: 'Segment vs. radio — choose by action type', desc: 'Segmented controls switch a view or setting. Radios choose from options. Use the right semantic pattern.' },
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
