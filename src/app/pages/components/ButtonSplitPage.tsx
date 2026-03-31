import { useState } from 'react';
import { ChevronDown, Download, Plus, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { FoundationShell } from '../../components/FoundationShell';

const tocItems = [
  { id: 'overview',  label: 'Overview',    level: 1 as const },
  { id: 'examples',  label: 'Examples',    level: 1 as const },
  { id: 'anatomy',   label: 'Anatomy',     level: 1 as const },
  { id: 'guidelines',label: 'Guidelines',  level: 1 as const },
];

const Code = ({ children }: { children: string }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
    <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>tsx</div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

function SplitButton({ label, icon: Icon, variant = 'default' }: { label: string; icon: React.ElementType; variant?: 'default' | 'accent' }) {
  const [open, setOpen] = useState(false);
  const dividerColor = variant === 'accent' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
  return (
    <div className="relative inline-flex">
      <Button variant={variant} className="rounded-r-none border-r-0 gap-2" style={{ borderRight: `1px solid ${dividerColor}` }}>
        <Icon size={15} /> {label}
      </Button>
      <Button
        variant={variant}
        className="rounded-l-none px-2"
        aria-label="More options"
        onClick={() => setOpen(v => !v)}
      >
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 150ms' }} />
      </Button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 rounded-lg overflow-hidden z-10 min-w-[160px]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
        >
          {['Option A', 'Option B', 'Option C'].map((opt) => (
            <button
              key={opt}
              onClick={() => setOpen(false)}
              className="w-full text-left px-4 py-2 text-sm transition-colors"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ButtonSplitPage() {
  return (
    <FoundationShell
      tag="Components"
      title="Split Button"
      description="A combined button with a primary action and a dropdown trigger for additional related actions."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Split buttons pair a primary action (left segment) with a chevron trigger (right segment) that reveals a dropdown of alternative or related actions. Use when one action is primary but alternatives need to remain accessible without cluttering the UI.
        </p>
        <Code>{`<div className="inline-flex">
  {/* Primary action */}
  <Button className="rounded-r-none gap-2">
    <Download size={15} /> Download
  </Button>
  {/* Dropdown trigger */}
  <Button className="rounded-l-none px-2" aria-label="More options">
    <ChevronDown size={14} />
  </Button>
</div>`}</Code>
      </section>

      <section id="examples" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Examples</h2>
        <div className="space-y-4 mb-6">
          <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Default — interactive, click the chevron</p>
            <div className="flex flex-wrap gap-6 items-center">
              <SplitButton label="Download" icon={Download} />
              <SplitButton label="New item" icon={Plus} />
              <SplitButton label="Send" icon={Send} />
            </div>
          </div>
          <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Accent — primary brand CTA with options</p>
            <div className="flex flex-wrap gap-6 items-center">
              <SplitButton label="Create" icon={Plus} variant="accent" />
              <SplitButton label="Publish" icon={Send} variant="accent" />
            </div>
          </div>
        </div>
      </section>

      <section id="anatomy" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Anatomy</h2>
        <div className="rounded-xl p-6 space-y-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {[
            { part: 'Primary segment', desc: 'Executes the most common action. Uses rounded-r-none to connect with the trigger segment.' },
            { part: 'Divider', desc: 'A subtle internal border separates the two segments, created with border-right and a low-opacity white.' },
            { part: 'Trigger segment', desc: 'Opens the dropdown. Uses rounded-l-none and reduced padding (px-2) to feel like part of the button.' },
            { part: 'Dropdown menu', desc: 'Positioned below the full button width. Contains alternative actions as a flat list.' },
          ].map(({ part, desc }) => (
            <div key={part} className="flex gap-4">
              <span className="text-xs font-mono font-semibold shrink-0 pt-0.5" style={{ color: 'var(--brand-primary)', minWidth: 140 }}>{part}</span>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="guidelines" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Guidelines</h2>
        <div className="space-y-3">
          {[
            { rule: 'Primary action must be clear and safe', desc: 'The left segment fires immediately on click. Never place a destructive or irreversible action as the primary.' },
            { rule: 'Limit dropdown to 3–5 items', desc: 'If you need more options, consider a full menu or a different UI pattern entirely.' },
            { rule: 'Keep actions related', desc: 'All options in the dropdown should be variations of the primary action, not unrelated controls.' },
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
