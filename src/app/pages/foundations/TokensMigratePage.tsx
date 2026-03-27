import { FoundationShell, ComingSoonBody } from '../../components/FoundationShell';

export function TokensMigratePage() {
  return (
    <FoundationShell tag="Foundations / Tokens" title="Migrate to tokens" description="Learn how to work with LayerProof design tokens.">
      <ComingSoonBody items={['Introduction', 'Getting started', 'Examples', 'Reference']} />
    </FoundationShell>
  );
}
