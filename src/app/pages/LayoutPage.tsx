import { FoundationShell } from '../components/FoundationShell';
import { Section, Panel, Rows, Grid, Card } from '../components/docs';

const tocItems = [
  { id: 'page-structure', label: 'Page structure', level: 1 as const },
  { id: 'container-widths', label: 'Container widths', level: 1 as const },
  { id: 'breakpoints', label: 'Breakpoints', level: 1 as const },
  { id: 'z-index', label: 'Z-index scale', level: 1 as const },
];

const Block = ({ label, style }: { label: string; style?: React.CSSProperties }) => (
  <div className="type-label-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', color: 'var(--foreground-secondary)', background: 'var(--background-surface-raised)', ...style }}>
    {label}
  </div>
);

export function LayoutPage() {
  return (
    <FoundationShell
      tag={[]}
      title="Layout"
      description="Breakpoints, container widths and layers that keep LayerProof screens predictable at every size."
      tocItems={tocItems}
    >
      <Section id="page-structure" title="Page structure" desc="The app shell: a header, the sidebar rail and a canvas for the work.">
        <Panel>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '180px 1fr', gridTemplateRows: '48px 260px' }}>
            <Block label="Sidebar" style={{ gridRow: 'span 2', background: 'var(--background-muted)' }} />
            <Block label="Header" />
            <Block label="Canvas" style={{ border: '1px dashed var(--accent-border-default)', background: 'var(--accent-background-faint)', color: 'var(--accent-foreground-default)' }} />
          </div>
        </Panel>
      </Section>

      <Section id="container-widths" title="Container widths">
        <Rows
          cols="140px 100px minmax(0, 1fr)"
          head={['Name', 'Max width', 'Use for']}
          rows={[
            [<strong>Full width</strong>, '100%', 'Edge-to-edge canvases and hero imagery'],
            [<strong>Wide</strong>, '1400px', 'Dashboards and data tables'],
            [<strong>Default</strong>, '1200px', 'Standard pages'],
            [<strong>Narrow</strong>, '800px', 'Long-form reading'],
          ]}
        />
      </Section>

      <Section id="breakpoints" title="Breakpoints">
        <Panel>
          <Grid cols={4}>
            <Card title="Mobile" meta="< 640px" />
            <Card title="Tablet" meta="640 – 1024px" />
            <Card title="Desktop" meta="1024 – 1536px" />
            <Card title="Wide" meta="> 1536px" />
          </Grid>
        </Panel>
      </Section>

      <Section id="z-index" title="Z-index scale" desc="Use these layers instead of arbitrary values so overlays never fight.">
        <Rows
          cols="120px 60px minmax(0, 1fr)"
          head={['Layer', 'Value', 'Use for']}
          rows={[
            [<strong>Base</strong>, <code>0</code>, 'Normal content flow'],
            [<strong>Dropdown</strong>, <code>10</code>, 'Menus and popovers'],
            [<strong>Sticky</strong>, <code>20</code>, 'Sticky headers and rails'],
            [<strong>Overlay</strong>, <code>30</code>, 'Modal scrims'],
            [<strong>Modal</strong>, <code>40</code>, 'Modal content'],
            [<strong>Toast</strong>, <code>50</code>, 'Notifications'],
          ]}
        />
      </Section>
    </FoundationShell>
  );
}
