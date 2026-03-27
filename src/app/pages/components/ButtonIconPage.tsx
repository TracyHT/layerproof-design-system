import { Plus, Download, Search, Trash2, Settings, ArrowRight, X, Check } from 'lucide-react';
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

export function ButtonIconPage() {
  return (
    <FoundationShell
      tag="Components"
      title="Icon Button"
      description="A square button containing only an icon. Used for compact toolbars, action menus, and space-constrained UI."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Icon buttons use <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>size="icon"</code> on the Button component, which applies equal padding on all sides to create a square hit area. Always pair with an accessible <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>aria-label</code>.
        </p>
        <Code>{`<Button size="icon" aria-label="Add new item">
  <Plus />
</Button>`}</Code>
      </section>

      <section id="examples" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Examples</h2>
        <div className="space-y-4 mb-6">
          <Demo label="All variants">
            <Button size="icon" aria-label="Add"><Plus size={16} /></Button>
            <Button size="icon" variant="outline" aria-label="Download"><Download size={16} /></Button>
            <Button size="icon" variant="secondary" aria-label="Search"><Search size={16} /></Button>
            <Button size="icon" variant="ghost" aria-label="Settings"><Settings size={16} /></Button>
            <Button size="icon" variant="destructive" aria-label="Delete"><Trash2 size={16} /></Button>
          </Demo>
          <Demo label="Sizes — sm / default / lg">
            <Button size="sm" className="size-7 p-0" aria-label="Close"><X size={14} /></Button>
            <Button size="icon" aria-label="Confirm"><Check size={16} /></Button>
            <Button size="icon" className="size-11" aria-label="Next"><ArrowRight size={18} /></Button>
          </Demo>
          <Demo label="Disabled">
            <Button size="icon" disabled aria-label="Add"><Plus size={16} /></Button>
            <Button size="icon" variant="outline" disabled aria-label="Download"><Download size={16} /></Button>
            <Button size="icon" variant="ghost" disabled aria-label="Settings"><Settings size={16} /></Button>
          </Demo>
        </div>
        <Code>{`{/* Variants */}
<Button size="icon" aria-label="Add"><Plus /></Button>
<Button size="icon" variant="outline" aria-label="Download"><Download /></Button>
<Button size="icon" variant="ghost" aria-label="Settings"><Settings /></Button>
<Button size="icon" variant="destructive" aria-label="Delete"><Trash2 /></Button>

{/* Disabled */}
<Button size="icon" disabled aria-label="Add"><Plus /></Button>`}</Code>
      </section>

      <section id="guidelines" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Guidelines</h2>
        <div className="space-y-3">
          {[
            { rule: 'Always use aria-label', desc: 'Icon buttons have no visible text. Screen readers rely on aria-label to announce the action.' },
            { rule: 'Minimum 44×44px touch target', desc: 'The default size="icon" is 36px. Add padding or use size="lg" equivalent for touch interfaces.' },
            { rule: 'Use tooltips for discoverability', desc: 'Wrap icon buttons in a Tooltip so sighted users can discover the action on hover.' },
            { rule: 'Reserve for known iconography', desc: 'Only use icons that are universally understood (close, search, add). Avoid ambiguous icons without labels.' },
          ].map(({ rule, desc }) => (
            <div key={rule} className="flex gap-4 rounded-xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <span className="text-sm font-semibold shrink-0 mt-0.5" style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-body)' }}>→</span>
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
