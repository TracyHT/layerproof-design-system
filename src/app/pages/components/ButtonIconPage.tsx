import { Plus, Download, Search, Trash2, Settings, ArrowRight, X, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ComponentShell } from '../../components/ComponentShell';

const Demo = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl p-6 flex flex-col gap-4" style={{ border: '1px solid var(--border-subtle)', background: 'var(--background-surface)' }}>
    <p className="type-label-sm" style={{ color: 'var(--foreground-tertiary)', fontFamily: 'var(--font-body)' }}>{label}</p>
    <div className="flex flex-wrap gap-3 items-center">{children}</div>
  </div>
);

const Code = ({ children }: { children: string }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
    <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--background-muted)', color: 'var(--foreground-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>tsx</div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--background-surface)', color: 'var(--foreground-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

export function ButtonIconPage() {
  return (
    <ComponentShell
      parent="Button"
      title="Icon button"
      description="A square button containing only an icon. Used for compact toolbars, action menus, and space-constrained UI."
      tabs={['Examples', 'Code', 'Usage']}
    >
      {(activeTab: string) => {
        if (activeTab === 'Code') return (
          <section className="mb-16">
            <Code>{`import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

<Button size="icon" aria-label="Add new item">
  <Plus />
</Button>

{/* Variants */}
<Button size="icon" aria-label="Add"><Plus /></Button>
<Button size="icon" variant="outline" aria-label="Download"><Download /></Button>
<Button size="icon" variant="ghost" aria-label="Settings"><Settings /></Button>
<Button size="icon" variant="destructive" aria-label="Delete"><Trash2 /></Button>

{/* Disabled */}
<Button size="icon" disabled aria-label="Add"><Plus /></Button>`}</Code>
          </section>
        );

        if (activeTab === 'Usage') return (
          <section className="mb-16">
            <div className="space-y-3">
              {[
                { rule: 'Always use aria-label', desc: 'Icon buttons have no visible text. Screen readers rely on aria-label to announce the action.' },
                { rule: 'Minimum 44×44px touch target', desc: 'The default size="icon" is 36px. Add padding or use size="lg" equivalent for touch interfaces.' },
                { rule: 'Use tooltips for discoverability', desc: 'Wrap icon buttons in a Tooltip so sighted users can discover the action on hover.' },
                { rule: 'Reserve for known iconography', desc: 'Only use icons that are universally understood (close, search, add). Avoid ambiguous icons without labels.' },
                { rule: 'Use accent for a single bookmark/star CTA', desc: 'The accent variant is appropriate for one high-emphasis icon action per view. Do not use multiple accent icon buttons in the same toolbar.' },
                { rule: 'Use neutral for toolbar controls', desc: 'The neutral variant (gray fill) is the natural choice for icon buttons in toolbars and filter bars.' },
              ].map(({ rule, desc }) => (
                <div key={rule} className="flex gap-4 rounded-xl p-4" style={{ background: 'var(--background-surface)', border: '1px solid var(--border-subtle)' }}>
                  <span className="shrink-0" aria-hidden style={{ width: 6, height: 6, borderRadius: 9999, background: 'var(--accent-background-default)', marginTop: 8 }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground-primary)', fontFamily: 'var(--font-body)' }}>{rule}</p>
                    <p className="text-sm" style={{ color: 'var(--foreground-secondary)', fontFamily: 'var(--font-body)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

        return (
          <>
            <section className="mb-16">
              <p className="text-base mb-6" style={{ color: 'var(--foreground-secondary)', fontFamily: 'var(--font-body)' }}>
                Icon buttons use <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--background-surface)', border: '1px solid var(--border-subtle)' }}>size="icon"</code> on the Button component, which applies equal padding on all sides to create a square hit area. Always pair with an accessible <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--background-surface)', border: '1px solid var(--border-subtle)' }}>aria-label</code>.
              </p>
            </section>

            <section className="mb-16">
              <div className="space-y-4">
                <Demo label="All variants">
                  <Button size="icon" aria-label="Add"><Plus size={16} /></Button>
                  <Button size="icon" variant="accent" aria-label="Bookmark"><Check size={16} /></Button>
                  <Button size="icon" variant="neutral" aria-label="Settings"><Settings size={16} /></Button>
                  <Button size="icon" variant="outline" aria-label="Download"><Download size={16} /></Button>
                  <Button size="icon" variant="secondary" aria-label="Search"><Search size={16} /></Button>
                  <Button size="icon" variant="ghost" aria-label="More"><Settings size={16} /></Button>
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
            </section>
          </>
        );
      }}
    </ComponentShell>
  );
}
