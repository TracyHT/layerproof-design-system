import { FoundationShell } from '../components/FoundationShell';
import { Section, Panel, Grid, LinkCard, Stat } from '../components/docs';

const tocItems = [
  { id: 'at-a-glance', label: 'At a glance', level: 1 as const },
  { id: 'visual',      label: 'Visual foundations', level: 1 as const },
  { id: 'system',      label: 'Tokens and guidance', level: 1 as const },
];

export function FoundationsPage() {
  return (
    <FoundationShell
      tag={[]}
      title="Foundations"
      description="The shared decisions behind every LayerProof screen. The system is intentionally neutral — gray, white and black carry the structure; pink punctuates attention, selection and primary brand moments."
      tocItems={tocItems}
    >
      <Section id="at-a-glance" title="At a glance" desc="Synced from the Figma UI kit.">
        <Panel>
          <Grid cols={4}>
            <Stat value="113" label="Semantic colours" text="Light and Dark" accent />
            <Stat value="80" label="Primitive colours" text="7 scales" />
            <Stat value="23" label="Text styles" text="Mona Sans · Montserrat" />
            <Stat value="39" label="Shadow styles" text="5 families" />
          </Grid>
        </Panel>
      </Section>

      <Section id="visual" title="Visual foundations">
        <Panel>
          <Grid cols={2}>
            <LinkCard to="/foundations/color" title="Color" text="Neutral by default, pink for emphasis, status colours for meaning." />
            <LinkCard to="/foundations/typography" title="Typography" text="Display, heading, subheading, body and label styles." />
            <LinkCard to="/foundations/spacing" title="Spacing" text="A 4px-based scale with Compact and Spacious modes." />
            <LinkCard to="/foundations/grid" title="Grid" text="12 columns and the breakpoints they respond to." />
            <LinkCard to="/foundations/elevation" title="Elevation" text="Seven shadow levels, neutral and tinted." />
            <LinkCard to="/foundations/iconography" title="Iconography" text="Phosphor icons, sizes and weights." />
            <LinkCard to="/foundations/logos" title="Logos" text="Lockup, symbol and clear space." />
            <LinkCard to="/foundations/illustrations" title="Illustrations" text="Coming soon." />
          </Grid>
        </Panel>
      </Section>

      <Section id="system" title="Tokens and guidance">
        <Panel>
          <Grid cols={2}>
            <LinkCard to="/foundations/tokens" title="Semantic tokens" text="Every role-based token with light and dark values." />
            <LinkCard to="/foundations/primitives" title="Primitives" text="The raw scales semantic tokens resolve to." />
            <LinkCard to="/foundations/tokens/explained" title="Design tokens explained" text="How tokens are named and why we use them." />
            <LinkCard to="/foundations/content" title="Content" text="Writing for the interface. Coming soon." />
          </Grid>
        </Panel>
      </Section>
    </FoundationShell>
  );
}
