import { TypographySection } from '../../components/TypographySection';
import { FoundationShell } from '../../components/FoundationShell';

export function TypographyPage() {
  return (
    <FoundationShell
      title="Typography"
      description="Mona Sans for display and headings, Montserrat for body, subheadings and labels, and Courier Prime for code — one token set per Figma text style."
      tocItems={[
        { id: 'applying-typography', label: 'Applying typography',    level: 1 as const },
        { id: 'typefaces-scale',     label: 'App typefaces and scale', level: 1 as const },
      ]}
    >
      <TypographySection />
    </FoundationShell>
  );
}
