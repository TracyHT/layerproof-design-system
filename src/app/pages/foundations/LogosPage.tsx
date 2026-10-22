import { FoundationShell } from '../../components/FoundationShell';
import { LogoSection } from '../../components/LogoSection';

const tocItems = [
  { id: 'our-logo', label: 'Our logo', level: 1 as const },
  { id: 'symbol', label: 'Symbol', level: 1 as const },
  { id: 'clearspace', label: 'Clear space and size', level: 1 as const },
];

export function LogosPage() {
  return (
    <FoundationShell title="Logos" description="The LayerProof logo, symbol and the rules for using them." tocItems={tocItems}>
      <LogoSection />
    </FoundationShell>
  );
}
