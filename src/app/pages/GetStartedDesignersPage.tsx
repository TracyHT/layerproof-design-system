import { FoundationShell } from '../components/FoundationShell';
import { Section, Panel, Grid, Card, LinkCard, Chip, Prose, Rows, InlineCode } from '../components/docs';
import { FIGMA_URL } from '../layouts/RootLayout';

const tocItems = [
  { id: 'gs-design-figma',  label: 'Figma UI kit',     level: 1 as const },
  { id: 'gs-design-tokens', label: 'Variables & styles', level: 1 as const },
  { id: 'gs-design-start',  label: 'Start with foundations', level: 1 as const },
];

export function GetStartedDesignersPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="For designers"
      description="Set up the LayerProof UI kit in Figma, use its variables and text styles, and design with the same foundations the product is built on."
      tocItems={tocItems}
    >
      <Section id="gs-design-figma" title="Figma UI kit" desc="One library holds every component, variable collection and style. Enable it in your team's libraries and work from its instances.">
        <Panel>
          <Grid cols={2}>
            <LinkCard href={FIGMA_URL} title="LayerProof — UI Kit" text="Components, variables, text and effect styles, maintained by Spartan Design." meta="Figma library" />
            <Card title="What's inside" text="27 component pages — buttons, inputs, navigation, cards, feedback — plus custom LayerProof patterns like the prompt box and editor." />
          </Grid>
        </Panel>
      </Section>

      <Section id="gs-design-tokens" title="Variables & styles" desc="Bind fills, strokes, text and effects to the library instead of picking raw values. These collections are the source of truth for this site.">
        <Rows
          cols="minmax(0, 1.1fr) minmax(0, 2fr) auto"
          head={['Collection', 'Use it for', 'Modes']}
          rows={[
            [<strong>Semantic Color V2</strong>, 'All UI colour — backgrounds, text, borders, accent, status', <Chip>Light · Dark</Chip>],
            [<strong>Color</strong>, 'Primitive scales only. Don\'t bind these in product UI', <Chip>Light</Chip>],
            [<strong>Typography</strong>, 'Font family, size, line height, tracking behind the text styles', <Chip>1 mode</Chip>],
            [<strong>Spacing</strong>, 'Padding, gaps and the named radius scale', <Chip>Compact · Spacious</Chip>],
            [<strong>Brand Theme</strong>, 'Deprecated aliases kept for older files — migrate to V2', <Chip tone="warning">Legacy</Chip>],
          ]}
        />
        <Prose style={{ marginTop: 16 }}>
          <p>Every Figma variable maps to a CSS variable by swapping <InlineCode>/</InlineCode> for <InlineCode>-</InlineCode>: <InlineCode>background/surface</InlineCode> is <InlineCode>--background-surface</InlineCode> in code.</p>
        </Prose>
      </Section>

      <Section id="gs-design-start" title="Start with foundations" desc="Read these before designing a new screen.">
        <Panel>
          <Grid cols={2}>
            <LinkCard to="/foundations/color" title="Color" text="Neutral by default; pink for primary actions, focus and selection." />
            <LinkCard to="/foundations/typography" title="Typography" text="The 23 text styles and when to use each." />
            <LinkCard to="/foundations/spacing" title="Spacing" text="The 4px-based scale and density modes." />
            <LinkCard to="/brand" title="Brand" text="Logo, mission and voice." />
          </Grid>
        </Panel>
      </Section>
    </FoundationShell>
  );
}
