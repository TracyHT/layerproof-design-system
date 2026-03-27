import { FoundationShell, ComingSoonBody } from '../../components/FoundationShell';

export function ContentPage() {
  return (
    <FoundationShell title="Content" description="Guidelines and resources for content in the LayerProof design system.">
      <ComingSoonBody items={['Overview', 'Guidelines', 'Examples', 'Resources']} />
    </FoundationShell>
  );
}
