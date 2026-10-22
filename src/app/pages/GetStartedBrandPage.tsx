import { FoundationShell } from '../components/FoundationShell';
import { Section, Panel, Grid, Card, LinkCard } from '../components/docs';

const tocItems = [
  { id: 'gs-brand-spirit', label: 'Brand spirit', level: 1 as const },
  { id: 'gs-brand-logo',   label: 'Logo',         level: 1 as const },
  { id: 'gs-brand-assets', label: 'Assets',       level: 1 as const },
];

export function GetStartedBrandPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="For brand teams"
      description="How LayerProof sounds and looks, the logo rules, and where to find approved assets."
      tocItems={tocItems}
    >
      <Section id="gs-brand-spirit" title="Brand spirit" desc="Every word and visual should feel like both of these at once.">
        <Panel>
          <Grid cols={2}>
            <Card title="Warm & supportive" text="We make creative work feel possible for any business owner. Encourage, explain plainly, never talk down." />
            <Card title="Confident & crafted" text="Professional results without the agency. Be precise, show the craft, skip the hype." />
          </Grid>
        </Panel>
      </Section>

      <Section id="gs-brand-logo" title="Logo" desc="Always use the approved files. Never recreate, stretch or recolour the logo.">
        <Panel>
          <Grid cols={2}>
            <LinkCard to="/foundations/logos" title="Logo guidelines" text="Lockups, symbol, colour versions and clear space." />
            <LinkCard to="/brand" title="Brand overview" text="Mission, spirit and voice in one place." />
          </Grid>
        </Panel>
      </Section>

      <Section id="gs-brand-assets" title="Assets" desc="Logo files, the Figma kit and other approved material.">
        <Panel>
          <Grid cols={2}>
            <LinkCard to="/resources" title="Resources" text="Downloads and links to the source files." />
            <LinkCard to="/foundations/color/accents" title="Using pink" text="Where the brand accent belongs, and where it doesn't." />
          </Grid>
        </Panel>
      </Section>
    </FoundationShell>
  );
}
