import { FoundationShell } from '../components/FoundationShell';

const tocItems = [
  { id: 'overview', label: 'Overview', level: 1 },
  { id: 'page-structure', label: 'Page Structure', level: 1 },
  { id: 'container-widths', label: 'Container Widths', level: 1 },
  { id: 'breakpoints', label: 'Responsive Breakpoints', level: 1 },
  { id: 'z-index', label: 'Z-Index Scale', level: 1 },
];

export function LayoutPage() {
  return (
    <FoundationShell
      tag="Layout"
      title="Layout Guidelines"
      description="Consistent layouts create familiarity and trust. Our layout system ensures every design feels cohesive while allowing for creative expression."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-lg text-[var(--color-text-secondary)]">
          The LayerProof layout system is built on a responsive grid with defined breakpoints, container widths, and z-index layers that keep interfaces predictable across all screen sizes.
        </p>
      </section>

      <section id="page-structure" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Page Structure</h2>
        <div className="bg-[var(--color-surface)] p-8 rounded-lg border border-[var(--color-border)]">
          <div className="space-y-4">
            <div className="h-16 bg-[var(--brand-primary)] opacity-20 rounded flex items-center justify-center text-[var(--color-text-secondary)]">
              Header
            </div>
            <div className="flex gap-4">
              <div className="w-64 h-96 bg-[var(--brand-primary)] opacity-10 rounded flex items-center justify-center text-[var(--color-text-secondary)]">
                Sidebar
              </div>
              <div className="flex-1 h-96 bg-[var(--brand-primary)] opacity-20 rounded flex items-center justify-center text-[var(--color-text-secondary)]">
                Main Content
              </div>
            </div>
            <div className="h-32 bg-[var(--brand-primary)] opacity-10 rounded flex items-center justify-center text-[var(--color-text-secondary)]">
              Footer
            </div>
          </div>
        </div>
      </section>

      <section id="container-widths" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Container Widths</h2>
        <div className="space-y-6">
          {[
            { name: 'Full Width', value: '100%', desc: 'Edge-to-edge content like hero images' },
            { name: 'Wide', value: '1400px', desc: 'Dashboard layouts and data tables' },
            { name: 'Default', value: '1200px', desc: 'Standard page content' },
            { name: 'Narrow', value: '800px', desc: 'Long-form reading content' },
          ].map((container) => (
            <div key={container.name} className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[var(--color-text-primary)]">{container.name}</h3>
                <span className="text-sm font-mono text-[var(--color-text-tertiary)]">{container.value}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{container.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="breakpoints" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Responsive Breakpoints</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Mobile', value: '< 640px', icon: '📱' },
            { name: 'Tablet', value: '640px - 1024px', icon: '📱' },
            { name: 'Desktop', value: '1024px - 1536px', icon: '💻' },
            { name: 'Wide', value: '> 1536px', icon: '🖥️' },
          ].map((breakpoint) => (
            <div key={breakpoint.name} className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{breakpoint.icon}</span>
                <h3 className="font-semibold text-[var(--color-text-primary)]">{breakpoint.name}</h3>
              </div>
              <p className="text-sm font-mono text-[var(--color-text-tertiary)]">{breakpoint.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="z-index" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Z-Index Scale</h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          Maintain a consistent layering system to prevent z-index conflicts.
        </p>
        <div className="space-y-3">
          {[
            { level: 'Base', value: '0', usage: 'Normal content flow' },
            { level: 'Dropdown', value: '10', usage: 'Dropdown menus and popovers' },
            { level: 'Sticky', value: '20', usage: 'Sticky headers and sidebars' },
            { level: 'Overlay', value: '30', usage: 'Modal overlays' },
            { level: 'Modal', value: '40', usage: 'Modal content' },
            { level: 'Toast', value: '50', usage: 'Toast notifications' },
          ].map((layer) => (
            <div key={layer.level} className="flex items-center gap-4 bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-border)]">
              <div className="w-24 font-semibold text-[var(--color-text-primary)]">{layer.level}</div>
              <div className="w-16 font-mono text-sm text-[var(--color-text-tertiary)]">{layer.value}</div>
              <div className="flex-1 text-sm text-[var(--color-text-secondary)]">{layer.usage}</div>
            </div>
          ))}
        </div>
      </section>
    </FoundationShell>
  );
}
