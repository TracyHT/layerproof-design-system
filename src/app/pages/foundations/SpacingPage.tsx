import { FoundationShell } from '../../components/FoundationShell';
import { Section, Rows, Callout, CodeBlock, Segmented } from '../../components/docs';
import { useState } from 'react';

const SCALE: [number, number, number][] = [
  [2, 1, 2], [3, 2, 4], [4, 4, 6], [5, 6, 8], [6, 8, 10], [7, 10, 12], [8, 12, 16], [9, 14, 18], [10, 16, 20],
  [11, 20, 24], [12, 24, 28], [13, 28, 32], [14, 32, 36], [15, 36, 40], [16, 40, 48], [17, 48, 56], [18, 56, 64],
  [19, 64, 72], [20, 72, 80], [21, 80, 88], [23, 96, 104], [26, 128, 144],
];

const tocItems = [
  { id: 'spacing-scale', label: 'Spacing scale', level: 1 as const },
  { id: 'spacing-density', label: 'Density modes', level: 1 as const },
];

export function SpacingPage() {
  const [mode, setMode] = useState<'Compact' | 'Spacious'>('Compact');
  return (
    <FoundationShell
      title="Spacing"
      description="Consistent spacing creates rhythm and hierarchy. The scale is built on a 4px base and comes in two densities, straight from the Figma Spacing collection."
      tocItems={tocItems}
    >
      <Section
        id="spacing-scale"
        title="Spacing scale"
        desc="Use --space-N for padding and gaps. The bars below show the value at the selected density."
        aside={<Segmented options={['Compact', 'Spacious'] as const} value={mode} onChange={setMode} />}
      >
        <Rows
          cols="110px 120px minmax(0, 1fr)"
          head={['Token', mode, 'Preview']}
          rows={SCALE.map(([n, c, s]) => {
            const px = mode === 'Compact' ? c : s;
            return [
              <code>--space-{n}</code>,
              <span>{px}px <span style={{ color: 'var(--foreground-tertiary)' }}>· {px / 16}rem</span></span>,
              <div style={{ width: Math.min(px, 420), height: 20, borderRadius: 4, background: 'var(--accent-background-selected)', border: '1px solid var(--accent-border-default)' }} />,
            ];
          })}
        />
      </Section>

      <Section id="spacing-density" title="Density modes" desc="Compact is the default. Spacious adds breathing room for marketing pages and onboarding.">
        <CodeBlock lang="HTML" code={`<!-- Compact (default) -->\n<div class="panel">…</div>\n\n<!-- Spacious: every --space-N inside grows one step -->\n<div class="panel" data-density="spacious">…</div>`} />
        <div style={{ marginTop: 12 }}>
          <Callout tone="neutral">The named shorthands (<code>--spacing-sm</code> … <code>--spacing-4xl</code>) are site-level aliases and don't change with density.</Callout>
        </div>
      </Section>
    </FoundationShell>
  );
}
