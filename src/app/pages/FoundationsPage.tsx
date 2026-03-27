import { useEffect } from 'react';
import { ColorsSection } from '../components/ColorsSection';
import { TypographySection } from '../components/TypographySection';
import { useToc } from '../context/TocContext';

const tocItems = [
  { id: 'introduction', label: 'Introduction', level: 1 },
  { id: 'colors', label: 'Color', level: 1 },
  { id: 'core-palette', label: 'Core Palette', level: 2 },
  { id: 'core-pairings', label: 'Core Pairings', level: 2 },
  { id: 'secondary-palette', label: 'Secondary Palette', level: 2 },
  { id: 'secondary-pairings', label: 'Secondary Pairings', level: 2 },
  { id: 'typography', label: 'Typography', level: 1 },
  { id: 'grid-system', label: 'Grid System', level: 1 },
  { id: 'spacing', label: 'Spacing', level: 1 },
] as const;

export function FoundationsPage() {
  const { setItems } = useToc();

  useEffect(() => {
    setItems([...tocItems]);
    return () => setItems([]);
  }, [setItems]);

  return (
    <div>
      {/* Hero Section */}
      <section id="introduction" className="mb-20">
        <p className="text-sm uppercase tracking-wider text-[var(--brand-primary)] mb-4">Architectural Core</p>
        <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
          Defining the visual language of authority.
        </h1>
        <div className="w-16 h-1 bg-[var(--brand-primary)] mb-8"></div>
        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
          The Editorial Architect is built on asymmetric precision. Our colors and typography aren't just decorative—they are the skeletal structure of our brand's narrative.
        </p>
      </section>

      {/* Colors Section */}
      <section id="colors" className="mb-20">
        <ColorsSection />
      </section>

      {/* Typography Section */}
      <section id="typography" className="mb-20">
        <TypographySection />
      </section>

      {/* Grid System Section */}
      <section id="grid-system" className="mb-20">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Grid System</h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          Our 12-column grid system provides structure and flexibility for all layouts, ensuring consistency across all touchpoints.
        </p>
        <div className="bg-[var(--color-surface)] p-8 rounded-lg border border-[var(--color-border)]">
          <div className="grid grid-cols-12 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-20 bg-[var(--brand-primary)] opacity-20 rounded"></div>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-tertiary)] mt-4 text-center">
            12-column responsive grid with 1rem gutters
          </p>
        </div>
      </section>

      {/* Spacing Section */}
      <section id="spacing" className="mb-20">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Spacing</h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          Consistent spacing creates rhythm and hierarchy. Our spacing scale is based on a 4px base unit.
        </p>
        <div className="space-y-4">
          {[
            { name: 'XS', value: '4px', var: '--spacing-xs' },
            { name: 'SM', value: '8px', var: '--spacing-sm' },
            { name: 'MD', value: '16px', var: '--spacing-md' },
            { name: 'LG', value: '24px', var: '--spacing-lg' },
            { name: 'XL', value: '32px', var: '--spacing-xl' },
            { name: '2XL', value: '48px', var: '--spacing-2xl' },
            { name: '3XL', value: '64px', var: '--spacing-3xl' },
          ].map((spacing) => (
            <div key={spacing.name} className="flex items-center gap-4 bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-border)]">
              <div className="w-20 text-sm font-mono text-[var(--color-text-secondary)]">{spacing.name}</div>
              <div className="w-24 text-sm text-[var(--color-text-tertiary)]">{spacing.value}</div>
              <div className="flex-1">
                <div style={{ width: spacing.value }} className="h-8 bg-[var(--brand-primary)] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
