import { FoundationShell } from '../../components/FoundationShell';
import { LogoSection } from '../../components/LogoSection';

const tocItems = [
  { id: 'our-logo', label: 'Our Logo', level: 1 },
  { id: 'symbol', label: 'Symbol', level: 1 },
  { id: 'clearspace', label: 'Clearspace', level: 1 },
];

export function LogosPage() {
  return (
    <FoundationShell title="Logos" description="Guidelines and resources for the LayerProof logo." tocItems={tocItems}>
      <LogoSection />
    </FoundationShell>
  );
}
