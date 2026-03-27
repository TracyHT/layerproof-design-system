import { ColorsSection } from '../../components/ColorsSection';
import { FoundationShell } from '../../components/FoundationShell';

export function ColorPage() {
  return (
    <FoundationShell
      title="Color"
      description="The LayerProof color system. Black and white drive all primary UI; yellow and pink are accent-only."
      tocItems={[
        { id: 'core-palette',       label: 'Core Palette',       level: 1 as const },
        { id: 'core-pairings',      label: 'Core Pairings',      level: 1 as const },
        { id: 'secondary-palette',  label: 'Secondary Palette',  level: 1 as const },
        { id: 'secondary-pairings', label: 'Secondary Pairings', level: 1 as const },
      ]}
    >
      <ColorsSection />
    </FoundationShell>
  );
}
