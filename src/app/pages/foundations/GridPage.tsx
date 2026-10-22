import { FoundationShell } from '../../components/FoundationShell';
import { Section, Panel, Rows } from '../../components/docs';

export function GridPage() {
  return (
    <FoundationShell
      title="Grid"
      description="A 12-column responsive grid with 16px gutters gives structure across every breakpoint."
      badge="Beta"
      tocItems={[{ id: 'grid-cols', label: '12-column grid', level: 1 as const }, { id: 'breakpoints', label: 'Breakpoints', level: 1 as const }]}
    >
      <Section id="grid-cols" title="12-column grid" desc="Columns flex; gutters stay fixed at 16px (--space-10).">
        <Panel>
          <div className="grid grid-cols-12" style={{ gap: 8 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="type-label-xs text-center" style={{ padding: '28px 0', borderRadius: 8, background: 'var(--accent-background-subtle)', color: 'var(--accent-foreground-default)' }}>{i + 1}</div>
            ))}
          </div>
        </Panel>
      </Section>
      <Section id="breakpoints" title="Breakpoints" desc="Design mobile first, then let layouts widen at each breakpoint.">
        <Rows
          cols="80px 120px minmax(0, 1fr)"
          head={['Name', 'Min width', 'Typical device']}
          rows={[
            [<code>sm</code>, '640px', 'Mobile landscape'],
            [<code>md</code>, '768px', 'Tablet'],
            [<code>lg</code>, '1024px', 'Desktop'],
            [<code>xl</code>, '1280px', 'Large desktop'],
          ]}
        />
      </Section>
    </FoundationShell>
  );
}
