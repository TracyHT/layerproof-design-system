import { ArrowRight, Download, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { FoundationShell } from '../../components/FoundationShell';

const tocItems = [
  { id: 'overview',  label: 'Overview',      level: 1 as const },
  { id: 'variants',  label: 'Variants',       level: 1 as const },
  { id: 'sizes',     label: 'Sizes',          level: 1 as const },
  { id: 'states',    label: 'States',         level: 1 as const },
  { id: 'api',       label: 'API Reference',  level: 1 as const },
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

export function ButtonPage() {
  return (
    <FoundationShell
      tag="Components"
      title="Button"
      description="Triggers an action or event such as submitting a form, opening a dialog, or navigating to a new page."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          The Button component is built on Radix UI primitives using class-variance-authority for variant management. It supports <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>asChild</code> for rendering as any element (e.g. a router Link).
        </p>
        <Code>{`import { Button } from '@/components/ui/button';

<Button>Click me</Button>
<Button variant="outline" size="lg">Large outline</Button>
<Button asChild><a href="/page">Link button</a></Button>`}</Code>
      </section>

      <section id="variants" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Variants</h2>
        <div className="space-y-4 mb-6">
          <Demo label="Default — primary action">
            <Button>Default</Button>
          </Demo>
          <Demo label="Secondary — supporting action">
            <Button variant="secondary">Secondary</Button>
          </Demo>
          <Demo label="Outline — low emphasis">
            <Button variant="outline">Outline</Button>
          </Demo>
          <Demo label="Ghost — minimal chrome">
            <Button variant="ghost">Ghost</Button>
          </Demo>
          <Demo label="Destructive — irreversible action">
            <Button variant="destructive">Destructive</Button>
          </Demo>
          <Demo label="Link — inline contextual action">
            <Button variant="link">Link</Button>
          </Demo>
        </div>
        <Code>{`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}</Code>
      </section>

      <section id="sizes" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Sizes</h2>
        <div className="space-y-4 mb-6">
          <Demo label="Small (sm)">
            <Button size="sm">Small</Button>
            <Button size="sm" variant="outline">Outline</Button>
          </Demo>
          <Demo label="Default">
            <Button size="default">Default</Button>
            <Button size="default" variant="outline">Outline</Button>
          </Demo>
          <Demo label="Large (lg)">
            <Button size="lg">Large</Button>
            <Button size="lg" variant="outline">Outline</Button>
          </Demo>
          <Demo label="Icon — square, equal padding">
            <Button size="icon"><Plus size={16} /></Button>
            <Button size="icon" variant="outline"><Download size={16} /></Button>
            <Button size="icon" variant="ghost"><ArrowRight size={16} /></Button>
          </Demo>
        </div>
        <Code>{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>`}</Code>
      </section>

      <section id="states" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>States</h2>
        <div className="space-y-4 mb-6">
          <Demo label="With icons">
            <Button><Plus size={16} /> New item</Button>
            <Button variant="outline">Download <Download size={16} /></Button>
            <Button variant="secondary">Continue <ArrowRight size={16} /></Button>
          </Demo>
          <Demo label="Disabled">
            <Button disabled>Default</Button>
            <Button disabled variant="outline">Outline</Button>
            <Button disabled variant="secondary">Secondary</Button>
            <Button disabled variant="destructive">Destructive</Button>
          </Demo>
        </div>
        <Code>{`{/* With icons */}
<Button><Plus /> New item</Button>
<Button variant="outline">Download <Download /></Button>

{/* Disabled */}
<Button disabled>Cannot click</Button>`}</Code>
      </section>

      <section id="api" className="mb-16">
        <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>API Reference</h2>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['variant', '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', '"default"', 'Visual style of the button'],
                ['size', '"sm" | "default" | "lg" | "icon"', '"default"', 'Size of the button'],
                ['asChild', 'boolean', 'false', 'Merges props onto child element via Radix Slot'],
                ['disabled', 'boolean', 'false', 'Prevents interaction and applies reduced opacity'],
              ].map(([prop, type, def, desc], i) => (
                <tr key={prop} style={{ borderBottom: i < 3 ? '1px solid var(--color-border)' : undefined, background: i % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-primary)' }}>{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--brand-secondary)' }}>{type}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{def}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </FoundationShell>
  );
}
