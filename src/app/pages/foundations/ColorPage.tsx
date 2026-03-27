import { ColorsSection } from '../../components/ColorsSection';
import { FoundationShell } from '../../components/FoundationShell';

export function ColorPage() {
  return (
    <FoundationShell
      title="Color"
      description="The LayerProof color system. Black and white drive all primary UI; yellow and pink are accent-only."
      tocItems={[
        { id: 'color-accents',  label: 'Accents',               level: 1 as const },
        { id: 'color-swatches', label: 'Color picker swatches', level: 1 as const },
        { id: 'color-dataviz',  label: 'Data Visualization',    level: 1 as const },
        { id: 'color-palette',  label: 'Color palette',         level: 1 as const },
      ]}
    >
      <ColorsSection />
    </FoundationShell>
  );
}
