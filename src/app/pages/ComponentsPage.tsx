import { FoundationShell } from '../components/FoundationShell';
import { ComponentsSection } from '../components/ComponentsSection';

const tocItems = [
  { id: 'overview', label: 'Overview', level: 1 },
  { id: 'library', label: 'Component Library', level: 1 },
  { id: 'guidelines', label: 'Guidelines', level: 1 },
];

export function ComponentsPage() {
  return (
    <FoundationShell
      tag="Components"
      title="UI Components"
      description="A comprehensive library of reusable UI components designed for consistency and accessibility."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Building Blocks</h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-6">
              Our component library provides pre-built, tested UI elements that maintain consistency across all your products.
            </p>
            <div className="space-y-3">
              {['Fully responsive', 'Accessible', 'Themeable'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[var(--brand-primary)] bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-[var(--brand-primary)] text-sm">✓</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[var(--color-surface)] rounded-2xl p-8 flex items-center justify-center min-h-[300px] border border-[var(--color-border)]">
            <div className="text-center">
              <div className="text-6xl mb-4">🧩</div>
              <p className="text-[var(--color-text-primary)] font-medium">12+ Components</p>
              <p className="text-[var(--color-text-tertiary)] text-sm">Ready to use</p>
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="mb-16">
        <ComponentsSection />
      </section>

      <section id="guidelines" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Usage Guidelines</h2>
        <div className="space-y-8">
          <div className="bg-[var(--color-surface)] p-8 rounded-lg border border-[var(--color-border)]">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Accessibility Requirements</h3>
            <ul className="space-y-3 text-[var(--color-text-secondary)]">
              <li className="flex gap-3">
                <span className="text-[var(--brand-primary)] flex-shrink-0">→</span>
                <span>Minimum touch target size of 44x44px</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--brand-primary)] flex-shrink-0">→</span>
                <span>Color contrast ratio of at least 4.5:1</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--brand-primary)] flex-shrink-0">→</span>
                <span>Keyboard navigable with visible focus states</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </FoundationShell>
  );
}
