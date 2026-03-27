import { TypographySection } from '../../components/TypographySection';
import { FoundationShell } from '../../components/FoundationShell';

export function TypographyPage() {
  return (
    <FoundationShell
      title="Typography"
      description="Three typefaces form the LayerProof type system — Anton for impact, DM Sans for brand identity, and Roboto for readability."
      tocItems={[
        { id: 'font-families', label: 'Font Families', level: 1 as const },
        { id: 'type-scale',    label: 'Type Scale',    level: 1 as const },
      ]}
    >
      <TypographySection />
    </FoundationShell>
  );
}
