import { FoundationShell } from '../components/FoundationShell';
import { LogoSection } from '../components/LogoSection';
import { VoiceSection } from '../components/VoiceSection';
import { Section, Panel, Grid, Card } from '../components/docs';

const tocItems = [
  { id: 'mission',    label: 'Mission',          level: 1 as const },
  { id: 'spirit',     label: 'Brand spirit',     level: 1 as const },
  { id: 'our-logo',   label: 'Logo',             level: 1 as const },
  { id: 'symbol',     label: 'Symbol',           level: 2 as const },
  { id: 'clearspace', label: 'Clear space',      level: 2 as const },
  { id: 'voice',      label: 'Voice and tone',   level: 1 as const },
];

export function BrandPage() {
  return (
    <FoundationShell
      tag={[]}
      title="Brand identity"
      description="What LayerProof stands for, how it looks, and how it sounds."
      tocItems={tocItems}
    >
      <Section id="mission">
        <div className="lp-gradient-panel" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}brand-gradient.jpg)`, borderRadius: 'var(--radius-4xl)', padding: 20 }}>
          <div className="lp-card" style={{ padding: 28 }}>
            <p className="lp-card__meta" style={{ marginTop: 0 }}>Our mission</p>
            <p className="type-h5" style={{ marginTop: 6, maxWidth: 620 }}>
              Make professional, on-brand creative accessible to every business — no designer or agency required.
            </p>
          </div>
        </div>
      </Section>

      <Section id="spirit" title="Brand spirit" desc="Two pairs of traits that guide every word and visual.">
        <Panel>
          <Grid cols={2}>
            <Card title="Warm & supportive" text="We make creative work feel possible for any business owner. Encourage, explain plainly, never talk down." />
            <Card title="Confident & crafted" text="Professional results without the agency. Precise, considered, never flashy for its own sake." />
          </Grid>
        </Panel>
      </Section>

      <LogoSection />

      <VoiceSection />
    </FoundationShell>
  );
}
