import { FoundationShell, ComingSoonBody } from '../../components/FoundationShell';

export function AccessibilityPage() {
  return (
    <FoundationShell title="Accessibility" description="Guidelines and resources for accessibility in the LayerProof design system.">
      <ComingSoonBody items={['Overview', 'Guidelines', 'Examples', 'Resources']} />
    </FoundationShell>
  );
}
