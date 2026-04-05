import { FoundationShell } from '../../components/FoundationShell';
import { primitiveSections } from '../../data/tokens';
import { AllTokensTab, buildTocItems } from '../../components/TokenTable';

export function PrimitivesPage() {
  return (
    <FoundationShell
      title="Primitive Tokens"
      description="Raw design primitives — the base color scales, radius steps, type scale, and spacing grid that semantic tokens reference."
      tocItems={buildTocItems(primitiveSections)}
    >
      <AllTokensTab sects={primitiveSections} />
    </FoundationShell>
  );
}
