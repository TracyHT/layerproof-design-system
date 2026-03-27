import { TypographySection } from '../../components/TypographySection';
import { FoundationShell } from '../../components/FoundationShell';

export function TypographyPage() {
  return (
    <FoundationShell
      title="Typography"
      description="Three typefaces form the LayerProof type system — Anton for impact, DM Sans for brand identity, and Roboto for readability."
      tocItems={[
        { id: 'applying-typography', label: 'Applying typography',    level: 1 as const },
        { id: 'typefaces-scale',     label: 'App typefaces and scale', level: 1 as const },
      ]}
    >
      <TypographySection />
    </FoundationShell>
  );
}
