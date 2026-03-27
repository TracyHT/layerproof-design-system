import { FoundationShell } from '../../components/FoundationShell';
import { Button } from '../../components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const tocItems = [
  { id: 'overview',   label: 'Overview',    level: 1 as const },
  { id: 'reference',  label: 'Reference',   level: 1 as const },
  { id: 'migration',  label: 'Migration',   level: 1 as const },
];

const Code = ({ children }: { children: string }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
    <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>tsx / css</div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

export function ButtonLegacyPage() {
  return (
    <FoundationShell
      tag="Components"
      title="Button (Legacy)"
      description="The original brand-btn class-based button system. Supported for existing usage but superseded by the Button component."
      badge="Caution"
      tocItems={tocItems}
    >
      {/* Warning banner */}
      <div className="rounded-xl p-5 mb-10 flex gap-4 items-start" style={{ background: 'var(--pink-500)18', border: '1px solid var(--pink-500)44' }}>
        <span className="text-lg shrink-0">⚠️</span>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>This is a legacy pattern</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            The <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface)' }}>brand-btn</code> class system is defined in <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface)' }}>brand-variables.css</code>. New work should use the <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface)' }}>{'<Button>'}</code> component from <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface)' }}>ui/button</code> instead.
          </p>
        </div>
      </div>

      <section id="overview" className="mb-16">
        <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          The legacy button system uses CSS utility classes directly on a <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>{`<button>`}</code> element. It applies brand tokens from <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>brand-variables.css</code> and lacks built-in variant management or accessibility helpers.
        </p>
        <div className="rounded-xl p-6 flex flex-wrap gap-3" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <button className="brand-btn brand-btn-primary">Primary (legacy)</button>
          <button className="brand-btn brand-btn-primary opacity-50 cursor-not-allowed" disabled>Disabled (legacy)</button>
        </div>
      </section>

      <section id="reference" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Class Reference</h2>
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
                {['Class', 'Description'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['.brand-btn', 'Base class. Sets font-family, padding, border-radius, and transition.'],
                ['.brand-btn-primary', 'White background, black text. Works in both light and dark mode.'],
              ].map(([cls, desc], i) => (
                <tr key={cls} style={{ borderBottom: i < 1 ? '1px solid var(--color-border)' : undefined, background: i % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--brand-primary)' }}>{cls}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Code>{`{/* Legacy usage */}
<button className="brand-btn brand-btn-primary">
  Submit
</button>

/* Defined in brand-variables.css */
.brand-btn {
  font-family: var(--font-body);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  font-weight: 500;
}
.brand-btn-primary {
  background-color: #ffffff;
  color: #000000;
}`}</Code>
      </section>

      <section id="migration" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Migration Guide</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Replace <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>brand-btn brand-btn-primary</code> with the <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>Button</code> component. The equivalent variant is <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>default</code> (dark bg, white text) or pair with the brand-btn classes via className for the white-on-black style.
        </p>
        <Code>{`{/* Before (legacy) */}
<button className="brand-btn brand-btn-primary">
  Submit
</button>

{/* After (current) */}
import { Button } from '@/components/ui/button';

<Button>Submit</Button>

{/* After — preserving white/black brand style */}
<Button className="brand-btn brand-btn-primary">Submit</Button>`}</Code>

        <div className="mt-6 p-5 rounded-xl flex items-center justify-between gap-4"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Ready to migrate?</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>See all variants and sizes in the Button overview page.</p>
          </div>
          <Button asChild size="sm" className="shrink-0 gap-1.5">
            <Link to="/components/button">Button docs <ArrowRight size={13} /></Link>
          </Button>
        </div>
      </section>
    </FoundationShell>
  );
}
