import { FoundationShell } from '../../components/FoundationShell';
import { Section, Panel, Grid, LinkCard } from '../../components/docs';

function Strip({ stops }: { stops: string[] }) {
  return (
    <div style={{ display: 'flex', height: 44, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      {stops.map((s) => <div key={s} style={{ flex: 1, background: `var(${s})` }} />)}
    </div>
  );
}

export function ColorPage() {
  return (
    <FoundationShell
      title="Color"
      description="Neutrals drive the interface, pink #FF589B is the single brand accent, and status colours carry meaning only. Roughly 90% neutral, 10% accent."
    >
      <Section>
        <Panel>
          <Grid cols={3}>
            <LinkCard to="/foundations/color/accents" title="Accents" text="The pink scale, accent tokens, pairings and usage."
              preview={<Strip stops={['--pink-50', '--pink-200', '--pink-500', '--pink-700', '--pink-900']} />} />
            <LinkCard to="/foundations/color/palette" title="Color palette" text="Every primitive scale: gray, pink, red, green, orange, cyan and yellow."
              preview={<Strip stops={['--gray-100', '--gray-400', '--gray-900', '--green-600', '--orange-500', '--cyan-600']} />} />
            <LinkCard to="/foundations/color/dataviz" title="Data visualization" text="A categorical palette for charts and dense data."
              preview={<Strip stops={['--pink-500', '--yellow-500', '--cyan-600', '--green-600', '--orange-500']} />} />
          </Grid>
        </Panel>
      </Section>
      <Section title="Semantic tokens" desc="Build UI with role-based tokens, never primitives. Each has a light and a dark value.">
        <Panel>
          <Grid cols={2}>
            <LinkCard to="/foundations/tokens" title="All colour tokens" text="Background, foreground, border, accent, action and status." />
            <LinkCard to="/foundations/tokens/explained" title="How tokens are named" text="Figma path → CSS variable, and when to use which." />
          </Grid>
        </Panel>
      </Section>
    </FoundationShell>
  );
}
