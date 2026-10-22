import { FoundationShell } from '../components/FoundationShell';
import { Section, Panel, Grid, LinkCard, DoDont } from '../components/docs';
import { FIGMA_URL } from '../layouts/RootLayout';

const tocItems = [
  { id: 'downloads', label: 'Files', level: 1 as const },
  { id: 'links', label: 'Links', level: 1 as const },
  { id: 'usage', label: 'Usage rules', level: 1 as const },
];

const base = import.meta.env.BASE_URL;

export function ResourcesPage() {
  return (
    <FoundationShell
      tag={[]}
      title="Resources"
      description="Source files and approved assets for working with the LayerProof brand."
      tocItems={tocItems}
    >
      <Section id="downloads" title="Files">
        <Panel>
          <Grid cols={2}>
            <LinkCard href={FIGMA_URL} title="LayerProof — UI Kit" text="Components, variables, text and effect styles." meta="Figma" />
            <LinkCard href={`${base}symbol.png`} title="Logo symbol" text="The layered symbol as a transparent PNG." meta="PNG" />
            <LinkCard href={`${base}brand-gradient.jpg`} title="Brand gradient" text="The soft pink-and-peach backdrop from the UI kit cover." meta="JPG" />
            <LinkCard to="/foundations/iconography" title="Icons" text="We use Phosphor — no custom icon files needed." meta="@phosphor-icons/react" />
          </Grid>
        </Panel>
      </Section>

      <Section id="links" title="Links">
        <Panel>
          <Grid cols={2}>
            <LinkCard href="https://github.com/TracyHT/layerproof-design-system" title="GitHub repository" text="Source for this site and the token files." meta="github.com/TracyHT/layerproof-design-system" />
            <LinkCard href="https://layerproof.app" title="LayerProof" text="The product these foundations are for." meta="layerproof.app" />
          </Grid>
        </Panel>
      </Section>

      <Section id="usage" title="Usage rules" desc="Brand assets are for LayerProof team members and approved partners.">
        <DoDont
          dos={['Use the latest files from the Figma kit', 'Keep clear space around the logo', 'Use approved colour versions only']}
          donts={['Edit, redraw or recolour the logo', 'Use files from before the October 2026 rebrand', 'Bring back yellow as an accent']}
        />
      </Section>
    </FoundationShell>
  );
}
