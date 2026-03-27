import { Check, X, Download, Search } from 'lucide-react';

export function ComponentsSection() {
  return (
    <section className="py-16">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Component Library</h2>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Reusable UI components that maintain consistency across all products and platforms.
        </p>
      </div>

      {/* Buttons */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">Buttons</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <h4 className="text-sm font-semibold text-[var(--color-text-tertiary)] mb-4 uppercase tracking-wide">Primary</h4>
            <div className="space-y-4">
              <button className="w-full brand-btn brand-btn-primary">Primary Button</button>
              <button className="w-full brand-btn brand-btn-primary opacity-50 cursor-not-allowed">Disabled</button>
            </div>
          </div>
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <h4 className="text-sm font-semibold text-[var(--color-text-tertiary)] mb-4 uppercase tracking-wide">Secondary</h4>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-lg font-medium border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-all">
                Secondary Button
              </button>
              <button className="w-full px-4 py-2 bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-lg font-medium border border-[var(--color-border)] opacity-50 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <h4 className="text-sm font-semibold text-[var(--color-text-tertiary)] mb-4 uppercase tracking-wide">Text</h4>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-[var(--brand-primary)] font-medium hover:bg-[var(--color-surface)] rounded-lg transition-all">
                Text Button
              </button>
              <button className="w-full px-4 py-2 text-[var(--brand-primary)] font-medium opacity-50 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">Input Fields</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <h4 className="text-sm font-semibold text-[var(--color-text-tertiary)] mb-4 uppercase tracking-wide">Text Input</h4>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-[var(--color-text-primary)]"
            />
          </div>
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <h4 className="text-sm font-semibold text-[var(--color-text-tertiary)] mb-4 uppercase tracking-wide">Search Input</h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-[var(--color-text-primary)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">Cards</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)] hover:border-[var(--brand-primary)] hover:shadow-lg transition-all">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Card Title</h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Card content with description text that explains the purpose.
            </p>
            <button className="text-[var(--brand-primary)] text-sm font-medium">Learn more →</button>
          </div>
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)] hover:border-[var(--brand-primary)] hover:shadow-lg transition-all">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Card Title</h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Card content with description text that explains the purpose.
            </p>
            <button className="text-[var(--brand-primary)] text-sm font-medium">Learn more →</button>
          </div>
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)] hover:border-[var(--brand-primary)] hover:shadow-lg transition-all">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Card Title</h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Card content with description text that explains the purpose.
            </p>
            <button className="text-[var(--brand-primary)] text-sm font-medium">Learn more →</button>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">Badges</h3>
        <div className="flex flex-wrap gap-4 bg-[var(--color-surface)] p-8 rounded-lg border border-[var(--color-border)]">
          <span className="px-3 py-1 bg-[var(--brand-primary)] text-white rounded-full text-sm font-medium">Primary</span>
          <span className="px-3 py-1 bg-[var(--color-success)] text-white rounded-full text-sm font-medium">Success</span>
          <span className="px-3 py-1 bg-[var(--color-warning)] text-white rounded-full text-sm font-medium">Warning</span>
          <span className="px-3 py-1 bg-[var(--color-error)] text-white rounded-full text-sm font-medium">Error</span>
          <span className="px-3 py-1 bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] rounded-full text-sm font-medium border border-[var(--color-border)]">Neutral</span>
        </div>
      </div>
    </section>
  );
}